// Meta (Facebook/Instagram) Ads distribution — dep-free Graph API client.
// Uploads an approved static as an ad image, builds an ad creative with UTM, and creates
// the ad PAUSED in a chosen ad set. Nothing goes live: ads are created status=PAUSED so the
// human still flips them on in Ads Manager (the gate philosophy extends to spend).
//
// Token: META_ACCESS_TOKEN (system-user token with ads_management on the ad account).
// IDs: config/distribution.config.json (not secret).

import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT, DIST_CONFIG_PATH, getEnv } from "./env.mjs";

export function cfg() {
  if (!fs.existsSync(DIST_CONFIG_PATH)) throw new Error(`Faltando ${path.relative(REPO_ROOT, DIST_CONFIG_PATH)}.`);
  return JSON.parse(fs.readFileSync(DIST_CONFIG_PATH, "utf8"));
}

function token() {
  return getEnv("META_ACCESS_TOKEN", { required: true });
}

function base() {
  const c = cfg();
  return `https://graph.facebook.com/${c.meta.graph_version}`;
}

async function graph(pathPart, { method = "GET", form = null } = {}) {
  const url = `${base()}/${pathPart}`;
  const opts = { method };
  const body = new URLSearchParams(form || {});
  body.set("access_token", token());
  if (method === "GET") {
    const res = await fetch(`${url}?${body.toString()}`);
    return handle(res);
  }
  opts.headers = { "content-type": "application/x-www-form-urlencoded" };
  opts.body = body.toString();
  const res = await fetch(url, opts);
  return handle(res);
}

async function handle(res) {
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Meta resposta não-JSON: ${text.slice(0, 300)}`);
  }
  if (json.error) {
    const e = json.error;
    throw new Error(`Meta ${e.code}/${e.error_subcode || 0}: ${e.message}`);
  }
  return json;
}

/** List ad sets (id + name + campaign) so the caller can pick a target. */
export async function listAdSets() {
  const c = cfg();
  const out = await graph(`${c.meta.ad_account_id}/adsets`, {
    form: { fields: "id,name,effective_status,campaign{name}", limit: "100" },
  });
  return out.data || [];
}

/** Upload an image to the ad account's image library → returns image_hash. */
export async function uploadAdImage(filePath) {
  const c = cfg();
  const bytes = fs.readFileSync(filePath).toString("base64");
  const out = await graph(`${c.meta.ad_account_id}/adimages`, {
    method: "POST",
    form: { bytes },
  });
  // Response: { images: { <name>: { hash, url } } }
  const first = Object.values(out.images || {})[0];
  if (!first?.hash) throw new Error(`Upload de imagem falhou: ${JSON.stringify(out).slice(0, 200)}`);
  return first.hash;
}

/** Build the landing URL with per-creative UTM (utm_content = brief.slug). */
export function buildLink(brief) {
  const c = cfg();
  const u = c.utm;
  const qs = new URLSearchParams({
    utm_source: u.source,
    utm_medium: u.medium,
    utm_campaign: u.campaign,
    utm_content: brief.slug,
  });
  return `${c.landing_url}/?${qs.toString()}`;
}

/** Create an ad creative (single-image link ad). Returns creative id. */
export async function createCreative({ name, message, headline, description, link, imageHash, cta }) {
  const c = cfg();
  const spec = {
    page_id: c.meta.page_id,
    link_data: {
      image_hash: imageHash,
      message,
      link,
      name: headline,
      description,
      call_to_action: { type: cta, value: { link } },
    },
  };
  const out = await graph(`${c.meta.ad_account_id}/adcreatives`, {
    method: "POST",
    form: { name, object_story_spec: JSON.stringify(spec) },
  });
  return out.id;
}

/** Flip an existing ad's status (ACTIVE to go live, PAUSED to stop). */
export async function setAdStatus(adId, status) {
  await graph(`${adId}`, { method: "POST", form: { status } });
  return adId;
}

/** Create the ad in an ad set, PAUSED. Returns ad id. */
export async function createAd({ name, adsetId, creativeId }) {
  const c = cfg();
  const out = await graph(`${c.meta.ad_account_id}/ads`, {
    method: "POST",
    form: {
      name,
      adset_id: adsetId,
      creative: JSON.stringify({ creative_id: creativeId }),
      status: "PAUSED",
    },
  });
  return out.id;
}
