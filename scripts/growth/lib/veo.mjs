// Veo 3.1 text-to-video (Gemini API) — dep-free. Long-running: submit → poll → download.
// Outputs 8s 9:16 720x1280 h264 clips with native audio. Same GOOGLE_AI_API_KEY as the rest.

import fs from "node:fs";
import { getEnv } from "./env.mjs";

const BASE = "https://generativelanguage.googleapis.com/v1beta";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Generate one scene and write the mp4 to `outPath`. Blocks until done (minutes).
 * model: veo-3.1-fast-generate-preview (default) | veo-3.1-generate-preview | ...-lite
 */
export async function generateScene(prompt, outPath, { aspectRatio = "9:16", model = "veo-3.1-fast-generate-preview" } = {}) {
  const key = getEnv("GOOGLE_AI_API_KEY", { required: true });

  const submit = await fetch(`${BASE}/models/${model}:predictLongRunning?key=${key}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ instances: [{ prompt }], parameters: { aspectRatio } }),
  });
  const sj = await submit.json();
  if (sj.error) throw new Error(`Veo submit: ${sj.error.message}`);
  const op = sj.name;
  if (!op) throw new Error(`Veo submit sem operation: ${JSON.stringify(sj).slice(0, 200)}`);

  for (let i = 0; i < 40; i++) {
    await sleep(15000);
    const p = await (await fetch(`${BASE}/${op}?key=${key}`)).json();
    if (p.error) throw new Error(`Veo op: ${p.error.message}`);
    if (!p.done) continue;
    const uri = p.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
    if (!uri) throw new Error(`Veo done mas sem uri: ${JSON.stringify(p).slice(0, 300)}`);
    const dl = await fetch(`${uri}&key=${key}`);
    if (!dl.ok) throw new Error(`Veo download: ${dl.status}`);
    fs.writeFileSync(outPath, Buffer.from(await dl.arrayBuffer()));
    return outPath;
  }
  throw new Error(`Veo timeout (${op})`);
}
