// Dep-free config + .env loader for the Growth Kit (portable content/ads factory).
// Everything project-specific resolves from conventional locations, so the kit can be
// copied into any repo and driven purely by config/ + briefs/ + the repo-root .env.
//
// Layout (relative to this kit at <repo>/scripts/growth/):
//   config/brand/tokens.json           brand system (source of truth)
//   config/brand/reference/*           brand reference images (optional)
//   config/brand/logo/logo-lockup.png  logo for video overlays
//   config/distribution.config.json    Meta/IG/Google IDs + landing + utm
//   briefs/*.json                      creative briefs
//   out/                               generated media (gitignored)
// Secrets: <repo>/.env  (override with GROWTH_ENV_FILE=/abs/path). Never printed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // <repo>/scripts/growth/lib
export const KIT_ROOT = path.resolve(HERE, ".."); // <repo>/scripts/growth
export const REPO_ROOT = path.resolve(HERE, "..", "..", ".."); // <repo>

export const CONFIG_DIR = path.join(KIT_ROOT, "config");
export const BRAND_DIR = path.join(CONFIG_DIR, "brand");
export const BRAND_TOKENS_PATH = path.join(BRAND_DIR, "tokens.json");
export const DIST_CONFIG_PATH = path.join(CONFIG_DIR, "distribution.config.json");
export const BRIEFS_DIR = path.join(KIT_ROOT, "briefs");
export const CREATIVES_DIR = path.join(KIT_ROOT, "out");

/** Parse a .env file into a plain object. Ignores comments/blank lines; strips quotes and CR. */
function parseEnvFile(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  const text = fs.readFileSync(file, "utf8");
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim().replace(/\r$/, "");
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const ENV_FILE = process.env.GROWTH_ENV_FILE || path.join(REPO_ROOT, ".env");
const FILE_ENV = parseEnvFile(ENV_FILE);

const KEY_HINTS = {
  GOOGLE_AI_API_KEY: "Necessária p/ gerar/validar imagem (Gemini). Pegue no Google AI Studio.",
  META_ACCESS_TOKEN: "Token de system-user com ads_management na conta de anúncios do projeto.",
  ELEVENLABS_API_KEY: "Necessária p/ narração dos reels (ElevenLabs).",
};

/** Look up a config value: process.env wins, then the repo-root .env. */
export function getEnv(name, { required = false } = {}) {
  const v = process.env[name] || FILE_ENV[name] || "";
  if (required && !v) {
    const hint = KEY_HINTS[name] ? " " + KEY_HINTS[name] : "";
    throw new Error(
      `Faltando ${name}. Defina no shell (export ${name}=...) ou em ${path.relative(REPO_ROOT, ENV_FILE)}.${hint}`,
    );
  }
  return v;
}
