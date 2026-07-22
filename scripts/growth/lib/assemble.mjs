// Reel assembly with ffmpeg — dep-free (shells to the ffmpeg on PATH).
// Per scene: Veo clip → 1080x1920 + burned on-screen text (deterministic, no model text
// lottery). Then concat video, lay VO per scene, duck a music bed under it, normalize to
// -14 LUFS, mux to a 9:16 H.264/AAC Reel.
//
// ffmpeg's filtergraph parser treats ":" as an option separator, so fontfile/textfile paths
// must not contain a Windows drive colon. We copy the font + write text files INTO workDir and
// run ffmpeg with cwd=workDir, referencing them by bare relative name (no colon, no escaping).

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const W = 1080, H = 1920, FPS = 30, SCENE = 8; // Veo clips are 8s
const FONT_SRC = process.env.MARKETING_FONT || "C:/Windows/Fonts/arialbd.ttf";

function ff(args, cwd) {
  try {
    execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], {
      stdio: ["ignore", "ignore", "pipe"],
      cwd,
    });
  } catch (e) {
    const err = e.stderr ? e.stderr.toString() : e.message;
    throw new Error(`ffmpeg falhou: ${err.slice(0, 500)}`);
  }
}

/** Duration (seconds) of a media file. */
function probeDur(file) {
  const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file]).toString().trim();
  return parseFloat(out) || 0;
}

const TAIL = 0.45; // small silence tail after each VO line — tighter than a fixed 8s scene

/**
 * @param scenes [{ video, vo, onScreenText, ctaText? }]  (video/vo = absolute local paths)
 * @param musicPath licensed bed
 * @param outPath   final reel mp4
 * @param workDir   scratch dir for intermediates
 */
export function assembleReel({ scenes, musicPath, outPath, workDir, logoPath = null }) {
  fs.mkdirSync(workDir, { recursive: true });
  fs.copyFileSync(FONT_SRC, path.join(workDir, "font.ttf")); // referenced as bare "font.ttf"
  musicPath = path.resolve(musicPath); // ffmpeg runs with cwd=workDir → inputs must be absolute
  const segs = [];
  const voSegs = [];
  let total = 0;

  scenes.forEach((s, i) => {
    // Scene length follows the VO (+ small tail) instead of a fixed 8s — kills dead air.
    const voDur = probeDur(path.resolve(s.vo));
    const dur = Math.min(SCENE, Math.max(2.5, +(voDur + TAIL).toFixed(2)));
    total += dur;

    // Render each line as its OWN drawtext (this ffmpeg build draws a literal "\n" from a
    // textfile as a tofu box). Split on \n, stack, center the block vertically.
    const drawBlock = (text, prefix, { fontsize, lineH, baseFrac, borderw }) => {
      const lines = String(text).split("\n");
      const offset0 = -((lines.length - 1) * lineH) / 2;
      return lines.map((line, j) => {
        fs.writeFileSync(path.join(workDir, `${prefix}_${i}_${j}.txt`), line);
        const off = Math.round(offset0 + j * lineH);
        const y = `h*${baseFrac}${off >= 0 ? "+" : ""}${off}`;
        return `drawtext=fontfile=font.ttf:textfile=${prefix}_${i}_${j}.txt:fontsize=${fontsize}:` +
          `fontcolor=white:borderw=${borderw}:bordercolor=black@0.65:x=(w-text_w)/2:y=${y}`;
      });
    };
    const draws = drawBlock(s.onScreenText || "", "text", { fontsize: 90, lineH: 106, baseFrac: 0.66, borderw: 4 });
    if (s.ctaText) draws.push(...drawBlock(s.ctaText, "cta", { fontsize: 52, lineH: 62, baseFrac: 0.80, borderw: 3 }));
    const vf =
      `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${FPS},` + draws.join(",");
    const seg = `seg_${i}.mp4`;
    ff(["-i", path.resolve(s.video), "-t", String(dur), "-vf", vf, "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", String(FPS), seg], workDir);
    segs.push(seg);

    const voa = `voa_${i}.m4a`;
    ff(["-i", path.resolve(s.vo), "-af", "apad", "-t", String(dur), "-ar", "44100", "-ac", "2", voa], workDir);
    voSegs.push(voa);
  });

  ff([
    ...segs.flatMap((s) => ["-i", s]),
    "-filter_complex", `${segs.map((_, i) => `[${i}:v]`).join("")}concat=n=${segs.length}:v=1:a=0[v]`,
    "-map", "[v]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "video.mp4",
  ], workDir);

  // Brand logo overlay: top-center, persistent through the whole reel.
  let videoTrack = "video.mp4";
  if (logoPath) {
    ff([
      "-i", "video.mp4", "-i", path.resolve(logoPath),
      "-filter_complex", `[1:v]scale=560:-1[lg];[0:v][lg]overlay=(W-w)/2:96[v]`,
      "-map", "[v]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "video_logo.mp4",
    ], workDir);
    videoTrack = "video_logo.mp4";
  }

  ff([
    ...voSegs.flatMap((s) => ["-i", s]),
    "-filter_complex", `${voSegs.map((_, i) => `[${i}:a]`).join("")}concat=n=${voSegs.length}:v=0:a=1[a]`,
    "-map", "[a]", "vo.m4a",
  ], workDir);

  ff([
    "-i", "vo.m4a", "-stream_loop", "-1", "-i", musicPath,
    "-filter_complex",
    `[1:a]volume=0.16[m];[0:a][m]amix=inputs=2:duration=first:dropout_transition=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]`,
    "-map", "[a]", "-t", String(total.toFixed(2)), "audio.m4a",
  ], workDir);

  ff(["-i", videoTrack, "-i", "audio.m4a", "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", path.resolve(outPath)], workDir);
  return outPath;
}
