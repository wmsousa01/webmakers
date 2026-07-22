// Validation gate — the guard before anything can be approved/published.
// Three layers: technical (dims/size, dep-free), policy (trademark/text lint),
// brand (Gemini vision check that copy fidelity + look match the brief).

import fs from "node:fs";
import { FORMATS, POLICY, BRAND } from "./brand.mjs";
import { analyzeImage } from "./gemini.mjs";

/** Read PNG width/height from the IHDR header (bytes 16..24). Dep-free. */
export function pngSize(filePath) {
  const buf = fs.readFileSync(filePath);
  const sig = buf.slice(0, 8).toString("hex");
  if (sig !== "89504e470d0a1a0a") return null; // not a PNG
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

/** Largura/altura de um JPEG, varrendo os marcadores SOFn. Dep-free.
 *  Necessário porque os modelos "pro" de imagem devolvem JPEG, não PNG — sem
 *  isto a checagem de aspecto era silenciosamente pulada em toda peça. */
export function jpegSize(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.readUInt16BE(0) !== 0xffd8) return null; // não é JPEG
  let off = 2;
  while (off + 9 < buf.length) {
    if (buf[off] !== 0xff) {
      off++;
      continue;
    }
    const marker = buf[off + 1];
    // SOFn carregam as dimensões; SOF4/SOF8/SOFC não são frames de imagem.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { h: buf.readUInt16BE(off + 5), w: buf.readUInt16BE(off + 7) };
    }
    off += 2 + buf.readUInt16BE(off + 2); // pula para o próximo segmento
  }
  return null;
}

/** Dimensões independente do formato entregue pelo modelo. */
export function imageSize(filePath) {
  return pngSize(filePath) || jpegSize(filePath);
}

/** Technical checks that need no network. */
export function technicalChecks(brief, filePath) {
  const spec = FORMATS[brief.format];
  const problems = [];
  const stat = fs.statSync(filePath);
  const sizeMB = stat.size / (1024 * 1024);
  if (sizeMB > 30) problems.push(`arquivo grande (${sizeMB.toFixed(1)}MB > 30MB)`);

  const dims = imageSize(filePath);
  let aspectOk = true;
  if (dims) {
    const want = spec.w / spec.h;
    const got = dims.w / dims.h;
    aspectOk = Math.abs(want - got) / want < 0.04; // 4% — Nano Banana quantiza o aspecto (ex.: 4:5 sai 896x1152)
    if (!aspectOk) {
      problems.push(
        `aspecto ${dims.w}x${dims.h} (${got.toFixed(2)}) ≠ alvo ${spec.aspect} (${want.toFixed(2)}) — normalizar p/ ${spec.w}x${spec.h}`
      );
    }
  } else {
    problems.push("não foi possível ler dimensões (formato não reconhecido) — pulei checagem de aspecto");
  }
  return { dims, sizeMB: Number(sizeMB.toFixed(2)), aspectOk, problems };
}

/** Policy lint on the *copy* — no network. Catches the Google trademark gotcha. */
export function policyChecks(brief) {
  const problems = [];
  const allText = [
    brief.copy?.headline,
    brief.copy?.subhead,
    brief.copy?.cta,
    ...(brief.cards || []).flatMap((c) => [c.headline, c.body]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const wantsGoogleAds = (brief.destination?.ads || []).includes("google");
  if (wantsGoogleAds) {
    for (const term of POLICY.googleProhibitedInText) {
      if (allText.includes(term)) {
        problems.push(
          `copy contém "${term}" — PROIBIDO em texto de anúncio Google (marca registrada)`
        );
      }
    }
  }
  const headline = brief.copy?.headline || "";
  if ((brief.destination?.ads || []).includes("meta") && headline.length > POLICY.metaMaxHeadlineChars) {
    problems.push(
      `headline com ${headline.length} caracteres (>${POLICY.metaMaxHeadlineChars}) — Meta penaliza texto denso`
    );
  }
  return { problems };
}

/**
 * Pre-flight copy-length warnings ("copy curta"). No network — run before generating so
 * the author can shorten error-prone long copy before spending an image call.
 * Returns a list of human warnings (does not hard-fail).
 */
export function copyLengthWarnings(brief) {
  const max = POLICY.copyMaxChars;
  const warns = [];
  const check = (label, text, limit) => {
    if (text && text.length > limit) {
      warns.push(`${label} tem ${text.length} caracteres (>${limit}) — encurte p/ evitar erro de texto do modelo`);
    }
  };
  check("headline", brief.copy?.headline, max.headline);
  check("subhead", brief.copy?.subhead, max.subhead);
  check("cta", brief.copy?.cta, max.cta);
  (brief.cards || []).forEach((c, i) => {
    check(`card ${i + 1} headline`, c.headline, max.card);
    check(`card ${i + 1} body`, c.body, max.card);
  });
  return warns;
}

/**
 * Brand + copy-fidelity check via Gemini vision. Network-bound.
 * `intendedTexts` = the exact strings this specific image should render (caller supplies,
 * so a carousel card is checked against its own copy, not the whole deck).
 */
export async function brandChecks(brief, filePath, intendedTexts) {
  const intended = (intendedTexts || []).filter(Boolean);
  const wantedCopy = intended.map((t) => `"${t}"`).join(", ");

  const instruction = [
    `Avalie este anúncio da marca ${BRAND.name}. Responda SOMENTE JSON com o schema:`,
    `{"text_in_image": string, "copy_matches": boolean, "legible": boolean, "on_brand": boolean, "spelling_ok": boolean, "issues": string[]}.`,
    `Estes são os textos PRETENDIDOS (todos corretos, é a referência): ${wantedCopy}.`,
    `Toda palavra dessa lista está CERTA por definição, inclusive nomes de marca e termos técnicos.`,
    `NÃO sugira sinônimos nem traduções: só marque erro se o texto NA IMAGEM DIVERGIR desta lista.`,
    `Um erro é: palavra escrita diferente da lista (ex.: "clipes"→"clips"), acento errado/faltando`,
    `(ex.: "grátis"→"grátís", "créditos"→"creditos"), palavra duplicada ("e e"), faltando ou cortada.`,
    `copy_matches=false e spelling_ok=false se houver qualquer erro desses; senão true.`,
    `Ignore texto decorativo/ilegível de elementos de fundo (mockups, blocos, ícones) — não é copy.`,
    `Ignore diferença de: pontuação final, ponto após número de passo ("1" = "1."), tipo de traço`,
    `(– = —), tipo de separador (· = • = -), quebra de linha, caixa e espaçamento — nada disso é erro.`,
    // Derivado de config/brand/tokens.json. Estava hardcoded como "fundo escuro,
    // gradiente roxo→azul→ciano" — identidade de OUTRO projeto, o oposto desta
    // marca (fundo claro). Toda peça correta era reprovada por isso.
    `on_brand: fundo ${BRAND.bgStyle} ${BRAND.bg}, gradiente ${BRAND.gradient.join(" → ")},`,
    `tipografia bold, estética premium e limpa. Fundo claro é CORRETO para esta marca.`,
    `Em "issues" liste só os erros reais como "esperado X, apareceu Y".`,
  ].join(" ");

  const result = await analyzeImage(filePath, instruction);
  const problems = [];
  if (result._parseError) {
    problems.push("não consegui interpretar a resposta de visão (revisar manualmente)");
  } else {
    if (result.copy_matches === false) problems.push("texto na imagem NÃO bate com a copy pretendida");
    if (result.legible === false) problems.push("texto pouco legível");
    if (result.spelling_ok === false) problems.push("erro de ortografia (pt-BR)");
    if (result.on_brand === false) problems.push("fora da identidade de marca");
    for (const i of result.issues || []) problems.push(String(i));
  }
  return { vision: result, problems };
}

/** Run all layers. `withVision=false` skips the network call (used in --dry-run). */
export async function runValidation(brief, filePath, { withVision = true, intendedTexts = [] } = {}) {
  const technical = technicalChecks(brief, filePath);
  const policy = policyChecks(brief);
  const brand = withVision
    ? await brandChecks(brief, filePath, intendedTexts)
    : { skipped: true, problems: [] };
  const problems = [...technical.problems, ...policy.problems, ...brand.problems];
  return {
    at: new Date().toISOString(),
    file: filePath,
    pass: problems.length === 0,
    problems,
    technical,
    policy,
    brand,
  };
}
