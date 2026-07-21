// Server-only data sources for the ops panel (/painel). Never imported by client code.
// Leads come from Jira (project VEN, issuetype Lead) — the same place the site's chat
// already sends them. Content pipeline is read from the Growth Kit briefs on disk.

import fs from "node:fs";
import path from "node:path";

/** Atlassian site base, e.g. https://xxx.atlassian.net. Derived from JIRA_URL if needed. */
function jiraBase() {
  const explicit = process.env.JIRA_BASE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const u = process.env.JIRA_URL || ""; // e.g. https://x.atlassian.net/rest/api/3/issue
  const m = u.match(/^(https?:\/\/[^/]+)/);
  return m ? m[1] : "";
}

function adfText(node) {
  if (!node || typeof node !== "object") return "";
  const out = [];
  const walk = (n) => {
    if (typeof n?.text === "string") out.push(n.text);
    (n?.content || []).forEach(walk);
  };
  walk(node);
  return out.join("\n");
}

function extractContact(description) {
  const t = adfText(description);
  const grab = (label) => (t.match(new RegExp(`${label}:\\s*(.+)`, "i")) || [])[1]?.trim() || "";
  const detalhe = grab("Detalhe") || grab("Interesse");
  return {
    nome: grab("Nome"),
    email: grab("Email"),
    telefone: grab("Telefone"),
    servico: grab("Tipo de serviço"),
    urgencia: grab("Urgência"),
    orcamento: grab("Orçamento"),
    segmento: grab("Segmento"),
    interesse: detalhe,
  };
}

/** Recent leads from Jira VEN. Never throws — returns { ok, leads, ... } for the UI. */
export async function fetchLeads({ limit = 30 } = {}) {
  const base = jiraBase();
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_TOKEN;
  if (!base || !email || !token) return { ok: false, reason: "jira-env-missing", leads: [], total: 0 };

  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const headers = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const project = process.env.JIRA_LEAD_PROJECT || "VEN";
  // Filtra pela label que o chat sempre anexa — separa leads de outras tarefas do projeto.
  const jql = `project = ${project} AND labels = "lead-site" ORDER BY created DESC`;
  try {
    // Endpoint novo: o antigo /rest/api/3/search foi removido (410) — ver Atlassian CHANGE-2046.
    const res = await fetch(`${base}/rest/api/3/search/jql`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        jql,
        maxResults: limit,
        fields: ["summary", "status", "created", "description", "priority", "labels"],
      }),
    });
    if (!res.ok) return { ok: false, reason: `jira-${res.status}`, leads: [], total: 0 };
    const data = await res.json();
    const leads = (data.issues || []).map((i) => ({
      key: i.key,
      summary: i.fields?.summary || "",
      status: i.fields?.status?.name || "—",
      priority: i.fields?.priority?.name || "",
      labels: i.fields?.labels || [],
      created: i.fields?.created || "",
      contact: extractContact(i.fields?.description),
    }));

    // O endpoint novo não retorna `total`; pega a contagem aproximada (fallback: itens carregados).
    let total = leads.length;
    try {
      const c = await fetch(`${base}/rest/api/3/search/approximate-count`, {
        method: "POST",
        headers,
        body: JSON.stringify({ jql }),
      });
      if (c.ok) {
        const cd = await c.json();
        if (typeof cd.count === "number") total = cd.count;
      }
    } catch {
      /* mantém o fallback */
    }

    return { ok: true, total, leads };
  } catch (e) {
    return { ok: false, reason: String(e?.message || e), leads: [], total: 0 };
  }
}

/** Growth Kit content pipeline (briefs + their status) read from disk. Never throws. */
export function readContentPipeline() {
  const dir = path.join(process.cwd(), "scripts", "growth", "briefs");
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    const items = files.map((f) => {
      const b = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        id: b.id,
        format: b.format,
        status: b.status,
        pillar: b.pillar || "",
        concept: b.concept || "",
        destination: b.destination || { organic: [], ads: [] },
        publishedIg: b.published_ig?.permalink || null,
      };
    });
    const order = { draft: 0, generated: 1, validated: 2, approved: 3, published: 4 };
    items.sort((a, b) => (order[a.status] ?? 0) - (order[b.status] ?? 0));
    return { ok: true, items };
  } catch (e) {
    return { ok: false, reason: String(e?.message || e), items: [] };
  }
}

/** Ads channel config snapshot (from the kit's distribution.config.json). Never throws. */
export function readAdsConfig() {
  const p = path.join(process.cwd(), "scripts", "growth", "config", "distribution.config.json");
  try {
    const c = JSON.parse(fs.readFileSync(p, "utf8"));
    const metaReady = !!c.meta && !String(c.meta.ad_account_id || "").startsWith("SET_");
    const igReady = !!c.instagram && !String(c.instagram.ig_user_id || "").startsWith("SET_");
    return {
      ok: true,
      googleAds: c.google_ads?.conversion_id || null,
      metaReady,
      igReady,
      igUsername: c.instagram?.username || null,
      landing: c.landing_url || null,
    };
  } catch (e) {
    return { ok: false, reason: String(e?.message || e) };
  }
}
