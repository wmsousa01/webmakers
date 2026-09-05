// Token de acesso a uma proposta: assinado, com validade, e SEM estado no
// servidor — o site não tem banco, e um link de negociação não justifica criar
// um. A validade viaja dentro do próprio token e a assinatura impede forjar.
//
// Formato:  <payload em base64url>.<HMAC-SHA256 em base64url>
// Payload:  { s: slug, e: expiração em epoch segundos, n: nonce }
//
// O nonce é o que torna cada link ÚNICO mesmo para o mesmo cliente e a mesma
// validade — dois envios geram URLs diferentes.
//
// Só usa Web Crypto e btoa/atob, que existem tanto no Edge (middleware) quanto
// no Node (script de geração). Nada de Buffer, que não existe no Edge.

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(str) {
  const pad = str.length % 4 ? "=".repeat(4 - (str.length % 4)) : "";
  const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

/** Comparação em tempo constante — evita distinguir assinatura por timing. */
function sameBytes(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Gera o token de uma proposta. `dias` conta a partir de agora. */
export async function assinar({ slug, dias = 15, secret }) {
  if (!slug) throw new Error("slug é obrigatório.");
  if (!secret) throw new Error("PROPOSTA_SECRET não definido.");
  const nonce = b64url(crypto.getRandomValues(new Uint8Array(9)));
  const exp = Math.floor(Date.now() / 1000) + Math.round(dias * 86400);
  const body = b64url(enc.encode(JSON.stringify({ s: slug, e: exp, n: nonce })));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(body)));
  return { token: `${body}.${b64url(sig)}`, exp };
}

/** Verifica assinatura, slug e validade.
 *  Devolve { ok: true, exp } ou { ok: false, motivo: "invalida" | "expirada" }. */
export async function verificar({ token, slug, secret }) {
  const invalida = { ok: false, motivo: "invalida" };
  if (!token || !secret) return invalida;

  const ponto = token.lastIndexOf(".");
  if (ponto < 1) return invalida;
  const body = token.slice(0, ponto);
  const assinatura = token.slice(ponto + 1);

  let esperada;
  try {
    esperada = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(body)));
  } catch {
    return invalida;
  }

  let recebida;
  try {
    recebida = fromB64url(assinatura);
  } catch {
    return invalida;
  }
  if (!sameBytes(esperada, recebida)) return invalida;

  // A assinatura confere: só a partir daqui o payload é confiável.
  let dados;
  try {
    dados = JSON.parse(dec.decode(fromB64url(body)));
  } catch {
    return invalida;
  }

  if (dados.s !== slug) return invalida;
  if (typeof dados.e !== "number") return invalida;
  if (dados.e * 1000 <= Date.now()) return { ok: false, motivo: "expirada", exp: dados.e };

  return { ok: true, exp: dados.e };
}
