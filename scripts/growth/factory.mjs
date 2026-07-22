#!/usr/bin/env node
// Growth Kit — portable AI content/ads factory (config-driven, standalone, dep-free ESM).
// Brand + distribution live in config/; briefs in briefs/; secrets in the repo-root .env.
// Stages: brief → generate → validate → approve → publish (organic/ads).
// The human gate stops at "approved" — ads are created PAUSED; nothing goes live unattended.
//
// Usage:
//   node scripts/growth/factory.mjs list
//   node scripts/growth/factory.mjs show <id>
//   node scripts/growth/factory.mjs brief <id> [format]      # scaffold a blank brief
//   node scripts/growth/factory.mjs author <id>              # LLM fills copy from concept (live)
//   node scripts/growth/factory.mjs generate <id> [--dry-run]
//   node scripts/growth/factory.mjs validate <id> [--dry-run]
//   node scripts/growth/factory.mjs approve <id> [--force]
//
// --dry-run prints the assembled prompts and runs offline (no GOOGLE_AI_API_KEY needed).

import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT, CONFIG_DIR, getEnv } from "./lib/env.mjs";
import { BRAND, BRAND_DIR, FORMATS, brandImagePreamble, brandReferenceImages } from "./lib/brand.mjs";
import {
  listBriefs,
  loadBrief,
  saveBrief,
  logBrief,
  setStatus,
  blankBrief,
  outputFile,
  outputDir,
} from "./lib/brief.mjs";
import { generateText, generateImage } from "./lib/gemini.mjs";
import { runValidation, copyLengthWarnings } from "./lib/validate.mjs";
import { listAdSets, uploadAdImage, createCreative, createAd, setAdStatus, buildLink, cfg } from "./lib/meta.mjs";
import { uploadPublic, creativeKey } from "./lib/r2.mjs";
import { createImageContainer, createCarouselContainer, createReelContainer, waitReady, publishContainer } from "./lib/ig.mjs";
import { generateScene } from "./lib/veo.mjs";
import { synth } from "./lib/tts.mjs";
import { assembleReel } from "./lib/assemble.mjs";

const rel = (p) => path.relative(REPO_ROOT, p).replace(/\\/g, "/");

const USAGE = `Growth Kit — fábrica de conteúdo/ads (config-driven, gate humano)
Stages: brief → generate → validate → approve → publish (orgânico/ads).

  node scripts/growth/factory.mjs list
  node scripts/growth/factory.mjs show <id>
  node scripts/growth/factory.mjs brief <id> [static-1x1|static-4x5|carrossel-4x5]
  node scripts/growth/factory.mjs author <id>       # LLM preenche a copy (live)
  node scripts/growth/factory.mjs generate <id> [--dry-run]
  node scripts/growth/factory.mjs validate <id> [--dry-run]
  node scripts/growth/factory.mjs approve <id> [--force]
  node scripts/growth/factory.mjs meta-adsets                 # lista ad sets (precisa META_ACCESS_TOKEN)
  node scripts/growth/factory.mjs publish <id> --to=<adset_id> [--dry-run]
  node scripts/growth/factory.mjs activate <id>
  node scripts/growth/factory.mjs publish-ig <id> [--dry-run]   # posta no Instagram (orgânico)
  node scripts/growth/factory.mjs gads-check                    # fumaça Google Ads (OAuth + dev token + MCC)
  node scripts/growth/factory.mjs gads-report [--customer=<id>] [--days=30]

--dry-run roda offline (imprime prompts/payloads, sem GOOGLE_AI_API_KEY / sem criar nada no Meta).`;

// ---------- prompt building ----------

/** Build the image-gen prompt for a static (card=null) or one carousel card. */
function buildImagePrompt(brief, card = null, { includeOffer = false } = {}) {
  const spec = FORMATS[brief.format];
  const copy = card
    ? { headline: card.headline, subhead: card.body, cta: null }
    : brief.copy || {};
  const lines = [
    brandImagePreamble(),
    `Formato: ${spec.aspect} (${spec.w}x${spec.h}px), anúncio de mídia paga/orgânica.`,
    `Conceito: ${brief.concept}.`,
  ];
  if (brief.art_direction) lines.push(`Direção de arte: ${brief.art_direction}.`);
  if (card && card.art) lines.push(`Direção ESPECÍFICA deste card (tem prioridade): ${card.art}.`);
  lines.push(
    `RENDERIZE APENAS estes textos, exatamente, em pt-BR (não invente nem adicione outras palavras):`,
    copy.headline ? `  • Headline (linha única, hero, sem quebrar a frase): "${copy.headline}"` : "",
    copy.subhead ? `  • Apoio (uma linha, menor): "${copy.subhead}"` : "",
    copy.cta ? `  • CTA (dentro de um botão): "${copy.cta}"` : "",
    includeOffer ? `  • Oferta (selo pequeno no rodapé): "${BRAND.offer}"` : "",
    `NÃO adicione NENHUM texto além dos itens acima — sem linha de ícones de features, sem rótulos,`,
    `sem legendas extras. Qualquer elemento do motivo visual é DECORATIVO: formas/blocos abstratos e`,
    `desfocados, SEM texto legível — nunca escreva palavras minúsculas nos elementos decorativos.`,
    `Regras: renderize cada texto UMA vez, exatamente como escrito — NÃO repita palavras`,
    `(ex.: nunca "e e"), não invente acentos, não corte nas bordas. Ortografia pt-BR conferida;`,
    `texto grande e nítido; sem lorem ipsum; sem marca d'água de stock; hierarquia headline > apoio > CTA.`
  );
  return lines.filter(Boolean).join("\n");
}

/** The unit(s) of work for a brief: one per static, one per carousel card. */
function units(brief) {
  if (brief.format === "carrossel-4x5") {
    const cards = brief.cards || [];
    if (!cards.length) throw new Error(`Brief ${brief.id}: carrossel sem "cards".`);
    // Offer badge only on the last card (the CTA card), not on every step.
    return cards.map((card, i) => ({ card, index: i + 1, includeOffer: i + 1 === cards.length }));
  }
  return [{ card: null, index: null, includeOffer: true }]; // statics always carry the offer
}

/** Exact strings a given output should render — for card-aware validation. */
function intendedTextsFor(brief, output) {
  if (output.card == null) {
    return [brief.copy?.headline, brief.copy?.subhead, brief.copy?.cta, BRAND.offer].filter(Boolean);
  }
  const cards = brief.cards || [];
  const card = cards[output.card - 1] || {};
  const isLast = output.card === cards.length;
  return [card.headline, card.body, isLast ? BRAND.offer : null].filter(Boolean);
}

// ---------- commands ----------

function cmdList() {
  const briefs = listBriefs();
  if (!briefs.length) return console.log("(nenhum brief em scripts/growth/briefs/)");
  console.log("STATUS       FORMAT          ID                       CONCEITO");
  for (const b of briefs) {
    console.log(
      `${b.status.padEnd(12)} ${b.format.padEnd(15)} ${b.id.padEnd(24)} ${(b.concept || "").slice(0, 40)}`
    );
  }
}

function cmdShow(id) {
  console.log(JSON.stringify(loadBrief(id), null, 2));
}

function cmdBrief(id, format = "static-1x1") {
  if (!FORMATS[format]) throw new Error(`Formato inválido. Use: ${Object.keys(FORMATS).join(", ")}`);
  const b = blankBrief(id, format);
  saveBrief(b);
  console.log(`✔ brief criado: ${rel(path.join(REPO_ROOT, "scripts/growth/briefs", id + ".json"))}`);
  console.log("  Edite concept/copy/art_direction e rode: generate " + id);
}

async function cmdAuthor(id, { dryRun }) {
  const b = loadBrief(id);
  if (!b.concept) throw new Error(`Brief ${id} sem "concept" — preencha antes de autorar.`);
  const prompt = [
    `Você é copywriter da ${BRAND.name}. Marca: ${BRAND.bigIdea}. Tom: ${BRAND.tone}.`,
    `Régua de copy: ${BRAND.copyRule}. Oferta: ${BRAND.offer}. Idioma: pt-BR.`,
    `Conceito do criativo: "${b.concept}". Pilar: ${b.pillar}.`,
    `Gere JSON: {"headline": "...", "subhead": "...", "cta": "..."}.`,
    `headline curta e imperativa com número; subhead 1 frase; cta objetivo.`,
  ].join(" ");
  if (dryRun) {
    console.log("--- author prompt (dry-run) ---\n" + prompt);
    return;
  }
  const raw = await generateText(prompt);
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("LLM não retornou JSON de copy. Resposta: " + raw.slice(0, 200));
  const copy = JSON.parse(m[0]);
  b.copy = { ...b.copy, ...copy };
  logBrief(b, "author", { copy });
  console.log("✔ copy gerada:\n" + JSON.stringify(b.copy, null, 2));
}

async function cmdGenerate(id, { dryRun, card }) {
  const b = loadBrief(id);
  if (FORMATS[b.format].video) return generateVideoReel(b, { dryRun });
  for (const w of copyLengthWarnings(b)) console.log(`⚠ ${w}`);
  fs.mkdirSync(outputDir(b), { recursive: true });
  // --card=N re-rolls a single card, keeping the others (useful for carousels).
  const only = card ? Number(card) : null;
  const chosen = units(b).filter((u) => only == null || u.index === only);
  if (only != null && !chosen.length) throw new Error(`Brief ${id} não tem card ${only}.`);
  const outputs = only != null ? [...(b.outputs || [])] : [];
  for (const u of chosen) {
    const prompt = buildImagePrompt(b, u.card, { includeOffer: u.includeOffer });
    const dest = outputFile(b, { card: u.index });
    if (dryRun) {
      console.log(`\n=== ${rel(dest)} ===\n${prompt}`);
      continue;
    }
    console.log(`→ gerando ${rel(dest)} …`);
    const img = await generateImage(prompt, {
      referenceImages: refPaths(b),
      aspectRatio: FORMATS[b.format].aspect,
    });
    fs.writeFileSync(dest, img.buffer);
    console.log(`  ✔ ${rel(dest)} (${(img.buffer.length / 1024).toFixed(0)}KB, ${img.model})`);
    const entry = { file: rel(dest), model: img.model, card: u.index };
    const at = outputs.findIndex((o) => o.card === u.index);
    if (at >= 0) outputs[at] = entry;
    else outputs.push(entry);
  }
  if (!dryRun) {
    b.outputs = outputs;
    setStatus(b, "generated", { outputs, card: only });
    console.log(`\n✔ ${id} → generated (${only != null ? "card " + only : outputs.length + " arquivo(s)"}). Rode: validate ${id}`);
  }
}

/** Video reel: per scene Veo (b-roll) + ElevenLabs VO, then ffmpeg assembly. */
async function generateVideoReel(b, { dryRun }) {
  const scenes = b.scenes || [];
  if (!scenes.length) throw new Error(`Brief ${b.id}: reel sem "scenes".`);
  if (!b.voice_id) throw new Error(`Brief ${b.id}: falta "voice_id".`);
  const dest = outputFile(b, { ext: "mp4" });

  if (dryRun) {
    console.log(`Reel ${b.format} → ${rel(dest)} · ${scenes.length} cenas · voz ${b.voice_id} · trilha ${b.music}`);
    scenes.forEach((s, i) => {
      console.log(`\n[cena ${i + 1}] texto: ${(s.on_screen_text || "").replace(/\n/g, " / ")}${s.cta_text ? " + CTA " + s.cta_text : ""}`);
      console.log(`  VO: ${s.vo_text}`);
      console.log(`  Veo: ${s.visual_prompt.slice(0, 90)}…`);
    });
    return;
  }

  fs.mkdirSync(outputDir(b), { recursive: true });
  const work = path.join(outputDir(b), ".work", b.id);
  fs.mkdirSync(work, { recursive: true });
  const built = [];
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    const vid = path.join(work, `scene_${i}.mp4`);
    const vo = path.join(work, `vo_${i}.mp3`);
    if (fs.existsSync(vid)) {
      console.log(`→ cena ${i + 1}/${scenes.length}: reaproveitando Veo existente`);
    } else {
      console.log(`→ cena ${i + 1}/${scenes.length}: gerando Veo (pode levar ~1-2min) …`);
      await generateScene(s.visual_prompt, vid, { aspectRatio: "9:16" });
    }
    await synth(s.vo_text, vo, { voiceId: b.voice_id }); // VO é barato → sempre refaz (pega mudança de texto/pronúncia)
    built.push({ video: vid, vo, onScreenText: s.on_screen_text, ctaText: s.cta_text });
  }
  console.log(`→ montando o reel (ffmpeg) …`);
  const logo = path.join(BRAND_DIR, "logo/logo-lockup.png");
  assembleReel({
    scenes: built,
    musicPath: path.join(CONFIG_DIR, b.music),
    outPath: dest,
    workDir: path.join(work, "assemble"),
    logoPath: fs.existsSync(logo) ? logo : null,
  });
  b.outputs = [{ file: rel(dest), model: "veo-3.1-fast + elevenlabs + ffmpeg" }];
  setStatus(b, "generated", { outputs: b.outputs });
  console.log(`\n✔ ${b.id} → generated: ${rel(dest)}. Revise e rode: approve ${b.id}`);
}

async function cmdValidate(id, { dryRun, card }) {
  const b = loadBrief(id);
  if (!b.outputs?.length) throw new Error(`Brief ${id} sem outputs — rode generate primeiro.`);
  const only = card ? Number(card) : null;
  let allPass = true;
  const results = [];
  for (const o of (only != null ? b.outputs.filter((o) => o.card === only) : b.outputs)) {
    const abs = path.join(REPO_ROOT, o.file);
    if (!fs.existsSync(abs)) {
      console.log(`⚠ ${o.file} não existe (gere sem --dry-run).`);
      allPass = false;
      continue;
    }
    const r = await runValidation(b, abs, {
      withVision: !dryRun,
      intendedTexts: intendedTextsFor(b, o),
    });
    results.push({ file: o.file, pass: r.pass, problems: r.problems });
    console.log(`${r.pass ? "✔" : "✗"} ${o.file}${r.pass ? " — OK" : ""}`);
    for (const p of r.problems) console.log(`    · ${p}`);
    if (!r.pass) allPass = false;
  }
  if (dryRun) {
    console.log("\n(dry-run: checagem de marca por visão pulada)");
    return;
  }
  if (only != null) {
    console.log(`\n(card ${only}: ${allPass ? "OK" : "reprovou"} — status não alterado; rode validate sem --card p/ fechar)`);
    return;
  }
  b.validation = { at: new Date().toISOString(), pass: allPass, results };
  if (allPass) {
    setStatus(b, "validated", { results });
    console.log(`\n✔ ${id} → validated. Revise as imagens e rode: approve ${id}`);
  } else {
    logBrief(b, "validate:fail", { results });
    console.log(`\n✗ ${id} reprovou. Ajuste copy/art_direction e gere de novo (v+1).`);
  }
}

function cmdApprove(id, { force }) {
  const b = loadBrief(id);
  if (b.status !== "validated" && !force) {
    throw new Error(`Brief ${id} está "${b.status}", não "validated". Use --force para aprovar mesmo assim.`);
  }
  setStatus(b, "approved", { by: process.env.USER || process.env.USERNAME || "owner", force: !!force });
  console.log(`✔ ${id} → approved. Pronto para distribuição (etapa manual/próxima fatia).`);
  console.log("  Arquivos:");
  for (const o of b.outputs || []) console.log("   · " + o.file);
}

// ---------- distribution (Meta) ----------

/** Ad-level copy (primary text / headline / description / CTA), from brief.ad or derived. */
function adCopyFor(brief) {
  const ad = brief.ad || {};
  return {
    primary_text: ad.primary_text || `${brief.copy?.subhead || brief.concept} ${BRAND.offer}.`,
    headline: ad.headline || brief.copy?.headline || BRAND.tagline,
    description: ad.description || BRAND.offer,
    cta: ad.cta || cfg().meta.default_cta,
  };
}

/** Teste de fumaça do Google Ads: OAuth + developer token + MCC. */
async function cmdGadsCheck() {
  const { listAccessibleCustomers, normalizeId } = await import("./lib/gads.mjs");
  const mcc = normalizeId(getEnv("GADS_LOGIN_CUSTOMER_ID") || "");
  const ids = await listAccessibleCustomers();
  console.log(`✓ OAuth + developer token OK. MCC: ${mcc || "(não definida)"}`);
  if (!ids.length) return console.log("(nenhuma conta acessível por este token)");
  console.log("\nCONTAS ACESSÍVEIS");
  for (const id of ids) console.log(`  ${id}${id === mcc ? "  ← MCC" : ""}`);
  console.log("\nRelatório: node scripts/growth/factory.mjs gads-report --customer=<id>");
}

/** Desempenho por campanha nos últimos N dias. */
async function cmdGadsReport(opts) {
  const { campaignPerformance } = await import("./lib/gads.mjs");
  // Prioriza a conta configurada; a MCC não serve (métricas não existem em manager).
  const customer = opts.customer || cfg().google_ads?.customer_id;
  if (!customer) {
    throw new Error("Informe --customer=<id> ou defina google_ads.customer_id em distribution.config.json.");
  }
  const days = Number(opts.days || 30);
  const rows = await campaignPerformance(customer, { days });
  if (!rows.length) return console.log(`(sem dados nos últimos ${days} dias para ${customer})`);

  const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  console.log(`Desempenho — últimos ${days} dias (conta ${customer})\n`);
  console.log("CAMPANHA".padEnd(34) + "IMPR".padStart(9) + "CLIQUES".padStart(9) + "CUSTO".padStart(14) + "CONV".padStart(8));
  for (const r of rows) {
    console.log(
      String(r.name || "?").slice(0, 33).padEnd(34) +
        String(r.impressions).padStart(9) +
        String(r.clicks).padStart(9) +
        brl(r.cost).padStart(14) +
        String(r.conversions).padStart(8),
    );
  }
}

async function cmdMetaAdSets() {
  const sets = await listAdSets();
  if (!sets.length) return console.log("(nenhum ad set na conta)");
  console.log("AD SET ID           STATUS      CAMPANHA › AD SET");
  for (const s of sets) {
    console.log(`${String(s.id).padEnd(19)} ${String(s.effective_status).padEnd(11)} ${s.campaign?.name || "?"} › ${s.name}`);
  }
}

async function cmdPublish(id, { dryRun, force, to }) {
  const b = loadBrief(id);
  if (!(b.destination?.ads || []).includes("meta")) {
    throw new Error(`Brief ${id}: destination.ads não inclui "meta".`);
  }
  if (b.status !== "approved" && !force) {
    throw new Error(`Brief ${id} está "${b.status}", não "approved". Aprove antes (ou --force).`);
  }
  if (!b.outputs?.length) throw new Error(`Brief ${id} sem outputs.`);
  if (!to) throw new Error(`Faltou --to=<adset_id>. Rode "meta-adsets" para listar os ad sets.`);

  const link = buildLink(b);
  const copy = adCopyFor(b);
  console.log(`Meta · ad set ${to} · link ${link}`);
  console.log(`  primary_text: ${copy.primary_text}`);
  console.log(`  headline: ${copy.headline} · description: ${copy.description} · cta: ${copy.cta}`);

  const published = [];
  for (const o of b.outputs) {
    const abs = path.join(REPO_ROOT, o.file);
    const name = `${b.id}${o.card ? "-c" + o.card : ""}`;
    if (!fs.existsSync(abs)) throw new Error(`Arquivo ausente: ${o.file}`);
    if (dryRun) {
      console.log(`  [dry-run] subiria ${o.file} como ad "${name}" (PAUSED)`);
      continue;
    }
    console.log(`→ ${o.file}: upload imagem …`);
    const imageHash = await uploadAdImage(abs);
    const creativeId = await createCreative({
      name,
      message: copy.primary_text,
      headline: copy.headline,
      description: copy.description,
      link,
      imageHash,
      cta: copy.cta,
    });
    const adId = await createAd({ name, adsetId: to, creativeId });
    console.log(`  ✔ ad ${adId} (PAUSED) · creative ${creativeId} · img ${imageHash}`);
    published.push({ file: o.file, adId, creativeId, imageHash, adsetId: to, link });
  }
  if (dryRun) return console.log("\n(dry-run: nada foi criado no Meta)");
  b.published_meta = published;
  setStatus(b, "published", { platform: "meta", adsetId: to, published });
  console.log(`\n✔ ${id} → published no Meta (ANÚNCIOS PAUSADOS). Ative no Ads Manager quando quiser.`);
}

// ---------- distribution (Instagram orgânico) ----------

/** IG caption from brief.caption or derived (hook + pitch + oferta + link + hashtags). */
function captionFor(b) {
  if (b.caption) return b.caption;
  const c = cfg();
  const hook =
    b.format === "carrossel-4x5" ? b.cards?.[0]?.headline || b.concept : b.copy?.headline || b.concept;
  return [
    hook,
    "",
    BRAND.pitch || BRAND.tagline || "",
    "",
    `${BRAND.offer} → ${c.landing_url.replace(/^https?:\/\//, "")}`,
    "",
    c.instagram?.hashtags || "",
  ].join("\n");
}

async function cmdPublishIg(id, { dryRun, force }) {
  const b = loadBrief(id);
  if (!(b.destination?.organic || []).includes("ig")) {
    throw new Error(`Brief ${id}: destination.organic não inclui "ig".`);
  }
  if (b.status !== "approved" && b.status !== "published" && !force) {
    throw new Error(`Brief ${id} está "${b.status}", não "approved" (ou use --force).`);
  }
  if (!b.outputs?.length) throw new Error(`Brief ${id} sem outputs.`);

  const caption = captionFor(b);
  const isVideo = FORMATS[b.format].video;
  const isCarousel = !isVideo && (b.format === "carrossel-4x5" || b.outputs.length > 1);
  const kind = isVideo ? "Reel (vídeo)" : isCarousel ? b.outputs.length + " cards (carrossel)" : "imagem única";
  console.log(`Instagram @${cfg().instagram?.username} · ${kind}`);
  console.log("--- legenda ---\n" + caption + "\n---------------");
  if (dryRun) return console.log("(dry-run: nada publicado; nada subiu ao R2)");

  console.log("→ subindo mídia ao R2 (URL pública p/ o IG puxar) …");
  const urls = [];
  for (const o of b.outputs) {
    const abs = path.join(REPO_ROOT, o.file);
    const url = await uploadPublic(abs, creativeKey(b.id, abs));
    console.log(`  ✔ ${url}`);
    urls.push(url);
  }

  let mediaId;
  if (isVideo) {
    console.log("→ criando container do Reel (processamento de vídeo pode levar ~1min) …");
    const cid = await createReelContainer(urls[0], caption, { shareToFeed: true });
    await waitReady(cid, { tries: 30, delayMs: 5000 });
    mediaId = await publishContainer(cid);
  } else if (isCarousel) {
    console.log("→ criando containers dos cards …");
    const childIds = [];
    for (const url of urls) {
      const cid = await createImageContainer(url, { isCarouselItem: true });
      await waitReady(cid);
      childIds.push(cid);
    }
    const parent = await createCarouselContainer(childIds, caption);
    await waitReady(parent);
    mediaId = await publishContainer(parent);
  } else {
    const cid = await createImageContainer(urls[0], { caption });
    await waitReady(cid);
    mediaId = await publishContainer(cid);
  }

  b.published_ig = { mediaId, urls, at: new Date().toISOString() };
  setStatus(b, "published", { platform: "instagram", mediaId });
  console.log(`\n✔ ${id} publicado no Instagram (@${cfg().instagram?.username}). media id ${mediaId}`);
}

async function cmdActivate(id, { dryRun }) {
  const b = loadBrief(id);
  const ads = b.published_meta || [];
  if (!ads.length) throw new Error(`Brief ${id} sem ads publicados no Meta (rode publish primeiro).`);
  for (const p of ads) {
    if (dryRun) {
      console.log(`  [dry-run] ativaria ad ${p.adId} (${p.file})`);
      continue;
    }
    await setAdStatus(p.adId, "ACTIVE");
    console.log(`  ✔ ad ${p.adId} → ACTIVE (${p.file})`);
  }
  if (dryRun) return;
  logBrief(b, "meta:activate", { ads: ads.map((a) => a.adId) });
  console.log(`\n✔ ${id}: ${ads.length} anúncio(s) ATIVADO(S). Entram em revisão do Meta e passam a rodar/gastar.`);
}

function refPaths(b) {
  // Brand references first (anchor every generation), then per-brief extras. Dedup.
  const perBrief = (b.reference_images || []).map((r) => path.join(REPO_ROOT, r));
  return [...new Set([...brandReferenceImages(), ...perBrief])];
}

// ---------- entry ----------

async function main() {
  const [, , cmd, ...argv] = process.argv;
  const flagVals = {};
  for (const a of argv) {
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      flagVals[k] = v === undefined ? true : v;
    }
  }
  // Flags podem vir em qualquer posição: o <id> é o 1º argumento que não é flag.
  const args = argv.filter((a) => !a.startsWith("--"));
  const id = args[0];
  const positional = args.slice(1);
  const opts = {
    dryRun: !!flagVals["dry-run"],
    force: !!flagVals.force,
    to: flagVals.to,
    card: flagVals.card,
    customer: flagVals.customer,
    days: flagVals.days,
  };

  switch (cmd) {
    case "list": return cmdList();
    case "show": return cmdShow(need(id));
    case "brief": return cmdBrief(need(id), positional[0]);
    case "author": return cmdAuthor(need(id), opts);
    case "generate": return cmdGenerate(need(id), opts);
    case "validate": return cmdValidate(need(id), opts);
    case "approve": return cmdApprove(need(id), opts);
    case "meta-adsets": return cmdMetaAdSets();
    case "gads-check": return cmdGadsCheck();
    case "gads-report": return cmdGadsReport(opts);
    case "publish": return cmdPublish(need(id), opts);
    case "activate": return cmdActivate(need(id), opts);
    case "publish-ig": return cmdPublishIg(need(id), opts);
    default:
      console.log(USAGE);
  }
}

function need(id) {
  if (!id) throw new Error("Faltou o <id> do brief.");
  return id;
}

main().catch((e) => {
  console.error("✗ " + e.message);
  process.exit(1);
});
