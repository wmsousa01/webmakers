// The Brief — the contract that flows through every stage of the factory.
// One JSON per creative, versioned in scripts/marketing/briefs/. Maps 1:1 to the
// naming convention + utm_content in marketing/creatives/README.md.

import fs from "node:fs";
import path from "node:path";
import { BRIEFS_DIR, CREATIVES_DIR } from "./env.mjs";
import { FORMATS } from "./brand.mjs";

export const STATUSES = ["draft", "generated", "validated", "approved", "published"];

/** Full path of a brief file by id. */
export function briefPath(id) {
  return path.join(BRIEFS_DIR, `${id}.json`);
}

export function listBriefs() {
  if (!fs.existsSync(BRIEFS_DIR)) return [];
  return fs
    .readdirSync(BRIEFS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => loadBrief(f.replace(/\.json$/, "")));
}

export function loadBrief(id) {
  const p = briefPath(id);
  if (!fs.existsSync(p)) throw new Error(`Brief não encontrado: ${id} (${p})`);
  const b = JSON.parse(fs.readFileSync(p, "utf8"));
  validateShape(b);
  return b;
}

export function saveBrief(brief) {
  validateShape(brief);
  fs.mkdirSync(BRIEFS_DIR, { recursive: true });
  fs.writeFileSync(briefPath(brief.id), JSON.stringify(brief, null, 2) + "\n");
  return brief;
}

/** Append an audit entry and persist. */
export function logBrief(brief, event, detail = {}) {
  brief.history = brief.history || [];
  brief.history.push({ at: new Date().toISOString(), event, ...detail });
  return saveBrief(brief);
}

export function setStatus(brief, status, detail = {}) {
  if (!STATUSES.includes(status)) throw new Error(`Status inválido: ${status}`);
  brief.status = status;
  return logBrief(brief, `status:${status}`, detail);
}

/** Where the final media for this brief is written (git-ignored creatives tree). */
export function outputDir(brief) {
  const fmt = FORMATS[brief.format];
  if (!fmt) throw new Error(`Formato desconhecido: ${brief.format}`);
  return path.join(CREATIVES_DIR, fmt.where);
}

/**
 * Filename for output card N (1-based): <id>_<format>_v<N>.<ext>.
 * For carousels each card gets -c<idx>.
 */
export function outputFile(brief, { card = null, version = 1, ext = "png" } = {}) {
  const cardTag = card ? `-c${String(card).padStart(2, "0")}` : "";
  return path.join(
    outputDir(brief),
    `${brief.id}_${brief.format}${cardTag}_v${version}.${ext}`
  );
}

function validateShape(b) {
  const required = ["id", "slug", "format", "status"];
  for (const k of required) {
    if (!b[k]) throw new Error(`Brief inválido: campo obrigatório ausente "${k}"`);
  }
  if (!FORMATS[b.format]) {
    throw new Error(
      `Brief ${b.id}: format "${b.format}" desconhecido. Use um de: ${Object.keys(FORMATS).join(", ")}`
    );
  }
  if (!STATUSES.includes(b.status)) {
    throw new Error(`Brief ${b.id}: status "${b.status}" inválido.`);
  }
}

/** A blank brief skeleton for `factory brief <id>`. */
export function blankBrief(id, format = "static-1x1") {
  return {
    id,
    slug: id.replace(/[^a-z0-9]+/gi, "_").toLowerCase(), // = utm_content
    format,
    pillar: "prova",
    concept: "",
    copy: { headline: "", subhead: "", cta: "" },
    cards: [], // for carrossel-4x5: [{ headline, body }]
    art_direction: "",
    reference_images: [], // optional paths (e.g. marketing/creatives/statics/branding.png)
    destination: { organic: [], ads: [] },
    status: "draft",
    outputs: [],
    validation: null,
    history: [],
  };
}
