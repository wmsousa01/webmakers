// ElevenLabs text-to-speech — dep-free. PT-BR via multilingual model. Writes an mp3.

import fs from "node:fs";
import { getEnv } from "./env.mjs";

/**
 * Synthesize `text` with `voiceId` to `outPath` (mp3).
 * model_id eleven_multilingual_v2 speaks pt-BR with any voice.
 */
export async function synth(text, outPath, { voiceId, model = "eleven_multilingual_v2" } = {}) {
  const key = getEnv("ELEVENLABS_API_KEY", { required: true });
  if (!voiceId) throw new Error("tts.synth: voiceId obrigatório.");
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "xi-api-key": key, "content-type": "application/json", accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: model,
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 200)}`);
  fs.writeFileSync(outPath, Buffer.from(await res.arrayBuffer()));
  return outPath;
}
