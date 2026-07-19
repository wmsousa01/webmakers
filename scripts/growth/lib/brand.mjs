// Brand system for the creative factory (project-agnostic).
// SOURCE OF TRUTH = config/brand/tokens.json (edit there, not here).
// Reference images in config/brand/reference/ are fed to EVERY generation so
// output stays anchored to the real brand look, not just a text description.

import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT, CONFIG_DIR, BRAND_DIR, BRAND_TOKENS_PATH } from "./env.mjs";

export { BRAND_DIR };

function loadTokens() {
  if (!fs.existsSync(BRAND_TOKENS_PATH)) {
    throw new Error(
      `Faltando ${path.relative(REPO_ROOT, BRAND_TOKENS_PATH)}. É a fonte da verdade da marca — crie-o antes de gerar.`
    );
  }
  return JSON.parse(fs.readFileSync(BRAND_TOKENS_PATH, "utf8"));
}

const T = loadTokens();

export const BRAND = {
  name: T.name,
  site: T.site,
  descriptor: T.descriptor,
  bg: T.colors.bg,
  bgStyle: T.colors.bg_style || "premium",
  gradient: T.gradient,
  colors: T.colors,
  typography: `${T.typography.family} — ${T.typography.weights}; ${T.typography.notes}`,
  motif: T.motif,
  tone: T.voice.tone,
  language: T.voice.language,
  bigIdea: T.voice.big_idea,
  tagline: T.voice.tagline,
  pitch: T.voice.pitch,
  copyRule: T.voice.copy_rule,
  offer: T.voice.offer,
  pillars: T.pillars,
  dont: T.dont || [],
};

// Ad-policy guardrails caught the hard way (see marketing-analytics memory).
export const POLICY = {
  googleProhibitedInText: ["tiktok", "reels", "shorts", "youtube", "instagram"],
  metaMaxHeadlineChars: 40,
  // "Copy curta" — acima disto o Nao Banana começa a errar (palavra duplicada, acento).
  // Renderização confiável exige texto curto; use estes tetos ao autorar briefs.
  copyMaxChars: { headline: 34, subhead: 48, cta: 40, card: 40 },
};

export const FORMATS = {
  "static-1x1": { w: 1080, h: 1080, aspect: "1:1", where: "statics" },
  "static-4x5": { w: 1080, h: 1350, aspect: "4:5", where: "statics" },
  "carrossel-4x5": { w: 1080, h: 1350, aspect: "4:5", where: "carrossel" },
  "reel-9x16": { w: 1080, h: 1920, aspect: "9:16", where: "reels", video: true },
};

/** Raster brand references that anchor every generation (absolute paths that exist). */
export function brandReferenceImages() {
  return (T.references || [])
    .map((r) => path.join(CONFIG_DIR, r))
    .filter((p) => fs.existsSync(p));
}

/**
 * Shared brand preamble injected into every image-generation prompt.
 * Pairs with the reference images: "match the attached brand references".
 */
export function brandImagePreamble() {
  const hasRefs = brandReferenceImages().length > 0;
  return [
    `Você é diretor de arte da ${BRAND.name} (${BRAND.site}), ${BRAND.descriptor}.`,
    hasRefs
      ? `As imagens de referência anexadas são o PADRÃO da marca — replique fielmente paleta, logo, tipografia e o motivo visual proprietário.`
      : ``,
    `Sistema visual: fundo ${BRAND.bgStyle} ${BRAND.bg}; glow em gradiente ${BRAND.gradient.join(" → ")};`,
    `tipografia ${BRAND.typography}. Motivo proprietário: ${BRAND.motif}.`,
    `Logo: ${T.logo.mark}. Lockup: ${T.logo.lockup}.`,
    `Tom: ${BRAND.tone}. Todo texto em ${BRAND.language}, ortografia perfeita, altamente legível.`,
    BRAND.dont.length ? `NÃO: ${BRAND.dont.join("; ")}.` : ``,
    `Estética premium, limpa, muito espaço negativo — anúncio pronto para veicular, não um mockup.`,
  ]
    .filter(Boolean)
    .join(" ");
}
