// Google Ads API — dep-free REST client (OAuth2 refresh → access token → GAQL).
// Foco atual: LEITURA (relatórios via GoogleAdsService.search). Mutações de campanha
// só fazem sentido quando a conta estiver em MODO ESPECIALISTA — contas Smart/Express
// (ads.google.com/aw/express/) praticamente não são operáveis pela API.
//
// Credenciais (.env da raiz):
//   GADS_CLIENT_ID / GADS_CLIENT_SECRET / GADS_REFRESH_TOKEN  — OAuth2 (escopo adwords)
//   GADS_DEVELOPER_TOKEN     — MCC → Ferramentas → API Center (precisa de Basic Access)
//   GADS_LOGIN_CUSTOMER_ID   — ID da MCC, só dígitos (ex: 7180669384)
//   GADS_API_VERSION         — opcional; se o Google aposentar a versão, bump aqui.

import { getEnv } from "./env.mjs";

const API_VERSION = getEnv("GADS_API_VERSION") || "v21";
const ROOT = `https://googleads.googleapis.com/${API_VERSION}`;

/** IDs de conta vêm como 718-066-9384; a API quer só dígitos. */
export const normalizeId = (id) => String(id || "").replace(/\D/g, "");

// Cache do access token em memória (vale ~1h; renova com folga de 60s).
let cached = { token: null, expiresAt: 0 };

/** Troca o refresh token por um access token (com cache). */
export async function accessToken() {
  if (cached.token && Date.now() < cached.expiresAt) return cached.token;

  const body = new URLSearchParams({
    client_id: getEnv("GADS_CLIENT_ID", { required: true }),
    client_secret: getEnv("GADS_CLIENT_SECRET", { required: true }),
    refresh_token: getEnv("GADS_REFRESH_TOKEN", { required: true }),
    grant_type: "refresh_token",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const hint =
      json.error === "invalid_grant"
        ? " Refresh token inválido/expirado — se o app OAuth estiver em 'Testing', ele expira em 7 dias: publique o app e gere outro."
        : "";
    throw new Error(`OAuth ${res.status}: ${json.error_description || json.error || "falhou"}.${hint}`);
  }
  cached = { token: json.access_token, expiresAt: Date.now() + (json.expires_in - 60) * 1000 };
  return cached.token;
}

/** `loginCustomerId: null` omite o header — necessário para contas que você acessa
 *  diretamente (não vinculadas à MCC), onde mandar a MCC causa erro de permissão. */
async function headers({ loginCustomerId } = {}) {
  const h = {
    Authorization: `Bearer ${await accessToken()}`,
    "developer-token": getEnv("GADS_DEVELOPER_TOKEN", { required: true }),
    "Content-Type": "application/json",
  };
  const mcc = loginCustomerId === undefined ? getEnv("GADS_LOGIN_CUSTOMER_ID") : loginCustomerId;
  if (mcc) h["login-customer-id"] = normalizeId(mcc);
  return h;
}

/** Erros da Google Ads API vêm aninhados; extrai a mensagem útil. */
async function handle(res, what) {
  const text = await res.text();
  if (res.ok) return text ? JSON.parse(text) : {};
  let msg = text.slice(0, 400);
  try {
    const j = JSON.parse(text);
    const errs = j.error?.details?.[0]?.errors || [];
    if (errs.length) msg = errs.map((e) => e.message).join(" | ");
    else if (j.error?.message) msg = j.error.message;
  } catch {
    /* mantém o texto cru */
  }
  const hint =
    res.status === 404
      ? ` (a versão ${API_VERSION} pode ter sido aposentada — ajuste GADS_API_VERSION)`
      : "";
  throw new Error(`Google Ads ${res.status} em ${what}: ${msg}${hint}`);
}

/** Contas acessíveis pelo token. Melhor teste de fumaça da cadeia inteira. */
export async function listAccessibleCustomers() {
  const res = await fetch(`${ROOT}/customers:listAccessibleCustomers`, { headers: await headers() });
  const json = await handle(res, "listAccessibleCustomers");
  // Vem como ["customers/1234567890", …]
  return (json.resourceNames || []).map((r) => r.split("/")[1]);
}

/** Executa uma query GAQL numa conta. Pagina até o fim.
 *  Obs.: a API não aceita pageSize — o tamanho da página é fixo (10.000 linhas). */
export async function search(customerId, query, { loginCustomerId } = {}) {
  const explicit = loginCustomerId !== undefined;
  try {
    return await runSearch(customerId, query, loginCustomerId);
  } catch (e) {
    // Conta acessada diretamente (não vinculada à MCC): mandar login-customer-id
    // dispara erro de permissão. Refaz sem o header.
    if (!explicit && /permission|not permitted|authoriz/i.test(e.message)) {
      return await runSearch(customerId, query, null);
    }
    throw e;
  }
}

async function runSearch(customerId, query, loginCustomerId) {
  const id = normalizeId(customerId);
  const url = `${ROOT}/customers/${id}/googleAds:search`;
  const h = await headers({ loginCustomerId });
  const rows = [];
  let pageToken = null;

  do {
    const res = await fetch(url, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ query, ...(pageToken ? { pageToken } : {}) }),
    });
    const json = await handle(res, "search");
    rows.push(...(json.results || []));
    pageToken = json.nextPageToken || null;
  } while (pageToken);

  return rows;
}

/** POST de mutação, com o mesmo fallback de login-customer-id do search. */
async function mutate(pathPart, body, { loginCustomerId } = {}) {
  const explicit = loginCustomerId !== undefined;
  const run = async (lci) => {
    const res = await fetch(`${ROOT}/${pathPart}`, {
      method: "POST",
      headers: await headers({ loginCustomerId: lci }),
      body: JSON.stringify(body),
    });
    return handle(res, pathPart);
  };
  try {
    return await run(loginCustomerId);
  } catch (e) {
    if (!explicit && /permission|not permitted|authoriz/i.test(e.message)) return run(null);
    throw e;
  }
}

/** Liga/pausa uma campanha: ENABLED | PAUSED. Para remover use removeCampaign().
 *  `validateOnly: true` valida a operação sem aplicar (dry-run da própria API). */
export async function setCampaignStatus(customerId, campaignId, status, { validateOnly = false, loginCustomerId } = {}) {
  const allowed = ["ENABLED", "PAUSED"];
  if (!allowed.includes(status)) {
    throw new Error(`Status inválido: ${status}. Use ${allowed.join(" | ")} — 'REMOVED' só via removeCampaign().`);
  }
  const id = normalizeId(customerId);
  return mutate(
    `customers/${id}/campaigns:mutate`,
    {
      operations: [
        {
          update: { resourceName: `customers/${id}/campaigns/${campaignId}`, status },
          updateMask: "status",
        },
      ],
      validateOnly,
    },
    { loginCustomerId },
  );
}

/** ⚠️ Remove uma campanha PERMANENTEMENTE (configuração e histórico não voltam).
 *  A API não aceita `status: REMOVED` via update — remoção é uma operação `remove`. */
export async function removeCampaign(customerId, campaignId, { validateOnly = false, loginCustomerId } = {}) {
  const id = normalizeId(customerId);
  return mutate(
    `customers/${id}/campaigns:mutate`,
    {
      operations: [{ remove: `customers/${id}/campaigns/${campaignId}` }],
      validateOnly,
    },
    { loginCustomerId },
  );
}

/** Desempenho por campanha nos últimos N dias — o que o /painel precisa. */
export async function campaignPerformance(customerId, { days = 30 } = {}) {
  const rows = await search(
    customerId,
    `SELECT campaign.id, campaign.name, campaign.status,
            metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
     FROM campaign
     WHERE segments.date DURING LAST_${days}_DAYS
     ORDER BY metrics.impressions DESC`,
  );

  return rows.map((r) => ({
    id: r.campaign?.id,
    name: r.campaign?.name,
    status: r.campaign?.status,
    impressions: Number(r.metrics?.impressions || 0),
    clicks: Number(r.metrics?.clicks || 0),
    // A API devolve custo em micros (1 real = 1.000.000 micros).
    cost: Number(r.metrics?.costMicros || 0) / 1e6,
    conversions: Number(r.metrics?.conversions || 0),
  }));
}
