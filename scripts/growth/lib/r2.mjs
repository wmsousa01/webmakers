// Dep-free upload to Cloudflare R2 (S3-compatible) via AWS SigV4.
// Hosts a creative publicly so Instagram/Facebook can pull it by URL.
// Reads R2_* from the repo-root .env. Optional R2_KEY_PREFIX namespaces the keys
// (default "growth") so multiple projects can share a bucket without colliding.

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { getEnv } from "./env.mjs";

const sha256hex = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const hmac = (key, str) => crypto.createHmac("sha256", key).update(str).digest();

function contentType(file) {
  const ext = file.toLowerCase().split(".").pop();
  return ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : ext === "mp4" ? "video/mp4" : "image/jpeg";
}

/**
 * Upload a local file to R2 under `key`. Returns its public URL.
 * key example: "growth/webmakers_automacao-whatsapp/c01.png"
 */
export async function uploadPublic(localPath, key) {
  const endpoint = getEnv("R2_ENDPOINT", { required: true }); // https://<acct>.r2.cloudflarestorage.com
  const bucket = getEnv("R2_BUCKET", { required: true });
  const publicBase = getEnv("R2_PUBLIC_BASE", { required: true });
  const accessKey = getEnv("R2_ACCESS_KEY_ID", { required: true });
  const secretKey = getEnv("R2_SECRET_ACCESS_KEY", { required: true });
  const region = getEnv("R2_REGION") || "auto";
  const service = "s3";

  const host = new URL(endpoint).host;
  const body = fs.readFileSync(localPath);
  const payloadHash = sha256hex(body);
  const ct = contentType(localPath);

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, ""); // YYYYMMDDTHHMMSSZ
  const dateStamp = amzDate.slice(0, 8);
  const canonicalUri = `/${bucket}/${key.split("/").map(encodeURIComponent).join("/")}`;

  const canonicalHeaders =
    `content-type:${ct}\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = ["PUT", canonicalUri, "", canonicalHeaders, signedHeaders, payloadHash].join("\n");

  const scope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256hex(canonicalRequest)].join("\n");

  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, "aws4_request");
  const signature = crypto.createHmac("sha256", kSigning).update(stringToSign).digest("hex");

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(`${endpoint}${canonicalUri}`, {
    method: "PUT",
    headers: {
      "content-type": ct,
      "x-amz-date": amzDate,
      "x-amz-content-sha256": payloadHash,
      authorization,
    },
    body,
  });
  if (!res.ok) {
    throw new Error(`R2 upload falhou (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  return `${publicBase.replace(/\/$/, "")}/${key}`;
}

/** Convenience: upload a creative file, keyed by brief id + basename. */
export function creativeKey(briefId, localPath) {
  const prefix = (getEnv("R2_KEY_PREFIX") || "growth").replace(/\/+$/, "");
  return `${prefix}/${briefId}/${path.basename(localPath)}`;
}
