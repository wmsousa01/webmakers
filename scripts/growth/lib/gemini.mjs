// Dep-free Gemini REST client for the creative factory.
// Mirrors the pattern in autocutter-backend/src/workers/cutPlanner.ts (no SDK, global fetch).
// Three capabilities: text (brief authoring), image (Nano Banana), vision (validation).

import fs from "node:fs";
import { getEnv } from "./env.mjs";

const BASE = "https://generativelanguage.googleapis.com/v1beta";

// Candidate models, best first — we fall through on 404 (not enabled on the key).
// Os aliases "-latest" vêm primeiro de propósito: modelos com versão fixa vão
// sendo fechados para novas chaves ("no longer available to new users") e ainda
// assim continuam aparecendo no /models, então a lista fixa envelhece calada —
// foi o que quebrou a validação por visão (404 em toda a cadeia até 1.5-flash).
const TEXT_MODELS = [
  "gemini-flash-latest",
  "gemini-3.5-flash",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
];
// Os modelos "pro" de imagem vêm primeiro por dois motivos medidos nesta conta:
// o 2.5-flash-image entrega 896x1152 (abaixo do mínimo 1080x1350 do feed) e erra
// tipografia em pt-BR — gerou "Fale coth a Web Makers" e "Diagnóstco digital
// grátls". Como a peça é majoritariamente texto, tipografia é o critério.
const IMAGE_MODELS = [
  "gemini-3-pro-image",
  "nano-banana-pro-preview",
  "gemini-3.1-flash-image",
  "gemini-2.5-flash-image",
];

function key() {
  return getEnv("GOOGLE_AI_API_KEY", { required: true });
}

async function callModel(model, body) {
  const url = `${BASE}/models/${model}:generateContent?key=${key()}`;
  const opts = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };
  let res = await fetch(url, opts);
  if (res.status === 429) {
    console.warn("[gemini] 429 rate-limited — retrying in 8s");
    await new Promise((r) => setTimeout(r, 8000));
    res = await fetch(url, opts);
  }
  return res;
}

/** Try each candidate model, skipping ones that 404 (not available on this key). */
async function withFallback(models, body) {
  let lastErr = "";
  for (const model of models) {
    const res = await callModel(model, body);
    if (res.ok) return { model, json: await res.json() };
    const txt = await res.text().catch(() => "");
    if (res.status === 404) {
      lastErr = `404 ${model}`;
      continue; // model not enabled — try next
    }
    throw new Error(`Gemini ${model} falhou: ${res.status} ${txt.slice(0, 300)}`);
  }
  throw new Error(`Nenhum modelo disponível (${lastErr}). Verifique o GOOGLE_AI_API_KEY.`);
}

function fileToInlineData(pathStr) {
  const buf = fs.readFileSync(pathStr);
  const ext = pathStr.toLowerCase().split(".").pop();
  const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
  return { inlineData: { mimeType: mime, data: buf.toString("base64") } };
}

/** Plain text generation (brief authoring). Returns the text string. */
export async function generateText(prompt, { temperature = 0.9 } = {}) {
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature },
  };
  const { json } = await withFallback(TEXT_MODELS, body);
  const parts = json?.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text || "").join("").trim();
}

/**
 * Image generation (Nano Banana). Returns { model, buffer, mimeType }.
 * `referenceImages` = array of local file paths for style/logo consistency.
 */
export async function generateImage(
  prompt,
  { referenceImages = [], aspectRatio = null, imageSize = "2K" } = {}
) {
  const parts = [{ text: prompt }];
  for (const ref of referenceImages) {
    if (fs.existsSync(ref)) parts.push(fileToInlineData(ref));
  }
  const generationConfig = { responseModalities: ["IMAGE"] };
  // Nano Banana honors an explicit aspect ratio via imageConfig (deterministic dims).
  // imageSize é obrigatório para uso real: no default ("1K") o retorno é 928x1152,
  // abaixo do mínimo 1080x1350 do feed. "2K" dá 1856x2304.
  if (aspectRatio || imageSize) {
    generationConfig.imageConfig = {
      ...(aspectRatio ? { aspectRatio } : {}),
      ...(imageSize ? { imageSize } : {}),
    };
  }
  const body = {
    contents: [{ role: "user", parts }],
    generationConfig,
  };
  const { model, json } = await withFallback(IMAGE_MODELS, body);
  const outParts = json?.candidates?.[0]?.content?.parts || [];
  const img = outParts.find((p) => p.inlineData?.data);
  if (!img) {
    const textBack = outParts.map((p) => p.text || "").join(" ").slice(0, 200);
    throw new Error(`Modelo não retornou imagem. Resposta: ${textBack || "(vazia)"}`);
  }
  return {
    model,
    mimeType: img.inlineData.mimeType || "image/png",
    buffer: Buffer.from(img.inlineData.data, "base64"),
  };
}

/**
 * Vision analysis (validation). Sends an image + instruction, asks for JSON back.
 * Returns the parsed object (best-effort JSON extraction).
 */
export async function analyzeImage(imagePath, instruction) {
  const body = {
    contents: [
      { role: "user", parts: [{ text: instruction }, fileToInlineData(imagePath)] },
    ],
    generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
  };
  const { json } = await withFallback(TEXT_MODELS, body);
  const text = (json?.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || "")
    .join("")
    .trim();
  return parseJsonLoose(text);
}

function parseJsonLoose(text) {
  try {
    return JSON.parse(text);
  } catch {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch {
        /* fall through */
      }
    }
    return { _raw: text, _parseError: true };
  }
}
