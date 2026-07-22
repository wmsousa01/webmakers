// Instagram organic publishing — dep-free Instagram Graph API client.
// Publishes to the project's IG business account (config/distribution.config.json) via
// public image URLs (IG pulls the image; it never accepts raw bytes). Single image or carousel.
//
// Token: IG_ACCESS_TOKEN (falls back to META_ACCESS_TOKEN) — needs instagram_content_publish
// + instagram_basic on the system user. IDs in config/distribution.config.json.

import { getEnv } from "./env.mjs";
import { cfg } from "./meta.mjs";

function token() {
  return getEnv("IG_ACCESS_TOKEN") || getEnv("META_ACCESS_TOKEN", { required: true });
}
function ig() {
  const c = cfg();
  if (!c.instagram?.ig_user_id) throw new Error("distribution.config.json sem instagram.ig_user_id.");
  return { id: c.instagram.ig_user_id, base: `https://graph.facebook.com/${c.meta.graph_version}` };
}

async function post(pathPart, form) {
  const { base } = ig();
  const body = new URLSearchParams(form);
  body.set("access_token", token());
  const res = await fetch(`${base}/${pathPart}`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const j = await res.json();
  if (j.error) throw new Error(`IG ${j.error.code}: ${j.error.message}`);
  return j;
}

async function get(pathPart, params = {}) {
  const { base } = ig();
  const q = new URLSearchParams(params);
  q.set("access_token", token());
  const res = await fetch(`${base}/${pathPart}?${q}`);
  const j = await res.json();
  if (j.error) throw new Error(`IG ${j.error.code}: ${j.error.message}`);
  return j;
}

/** A single-image post container (or a carousel item if isCarouselItem). Returns container id. */
export async function createImageContainer(imageUrl, { caption = null, isCarouselItem = false } = {}) {
  const { id } = ig();
  const form = { image_url: imageUrl };
  if (isCarouselItem) form.is_carousel_item = "true";
  if (caption) form.caption = caption;
  return (await post(`${id}/media`, form)).id;
}

/** A Reel container from a public video URL. Returns container id (processes async). */
export async function createReelContainer(videoUrl, caption, { shareToFeed = true } = {}) {
  const { id } = ig();
  return (await post(`${id}/media`, {
    media_type: "REELS",
    video_url: videoUrl,
    caption,
    share_to_feed: String(shareToFeed),
  })).id;
}

/** A carousel parent container from child item ids + caption. Returns container id. */
export async function createCarouselContainer(childIds, caption) {
  const { id } = ig();
  return (await post(`${id}/media`, { media_type: "CAROUSEL", children: childIds.join(","), caption })).id;
}

/** Poll a container until it's FINISHED (images are usually instant). */
export async function waitReady(containerId, { tries = 10, delayMs = 2000 } = {}) {
  for (let i = 0; i < tries; i++) {
    const s = await get(containerId, { fields: "status_code,status" });
    if (s.status_code === "FINISHED") return true;
    if (s.status_code === "ERROR") throw new Error(`Container ${containerId} ERROR: ${s.status || ""}`);
    await new Promise((r) => setTimeout(r, delayMs));
  }
  throw new Error(`Container ${containerId} não ficou pronto a tempo.`);
}

/** Publish a finished container. Returns the published media id. */
export async function publishContainer(creationId) {
  const { id } = ig();
  return (await post(`${id}/media_publish`, { creation_id: creationId })).id;
}
