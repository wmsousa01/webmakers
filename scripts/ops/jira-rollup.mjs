#!/usr/bin/env node
// Rollup do portfólio da holding a partir do Jira. Node/ESM puro, sem npm install.
//
// POR QUE ISTO EXISTE
// O plano Free do Jira não tem Plans nem nível de hierarquia acima do Epic, e as
// regras de automação são single-project com teto de 100 execuções/mês. Então a
// consolidação entre projetos não pode ser feita por automação — é feita por
// CONSULTA, aqui, de graça e sem limite.
//
// A espinha dorsal é a label `bu-<unidade>`, obrigatória em toda issue de entrega.
// É ela que permite perguntar "como vai a Contenta AI" atravessando projetos.
//
// USO (rodar da raiz do repo)
//   node scripts/ops/jira-rollup.mjs resumo            # uma linha por unidade
//   node scripts/ops/jira-rollup.mjs unidade renan     # backlog aberto da unidade
//   node scripts/ops/jira-rollup.mjs travados          # owner-action + bloqueado
//   node scripts/ops/jira-rollup.mjs semana            # o que andou nos últimos 7 dias
//   node scripts/ops/jira-rollup.mjs jql "<jql livre>"
// Qualquer comando aceita --json (saída para consumo por lib/panelData.js).
//
// Segredos vêm do .env da raiz (JIRA_BASE_URL, JIRA_EMAIL, JIRA_TOKEN) e nunca
// são impressos.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // <repo>/scripts/ops
const REPO_ROOT = path.resolve(HERE, "..", "..");

// ── Unidades de negócio ──────────────────────────────────────────────────────
// A ordem aqui é a ordem do resumo. `entrega` é só informativo: a consulta é
// pela label, não pelo projeto — uma issue de OPS com bu-contenta conta para o
// Contenta AI, que é exatamente o comportamento desejado.
//
// Contenta AI (contentaai.atlassian.net) e Fora da Caixa (tarefaspfc.atlassian.net)
// têm Jira próprio e ficam fora deste rollup, que consulta só o wmsousa.atlassian.net.
// Leads nascem pela API do site sem label bu-*, por isso a unidade também conta o projeto.
const UNIDADES = [
  { bu: "bu-fenixx", nome: "FENIXX Uniformes", entrega: "FNX" },
  { bu: "bu-webmakers", nome: "Web Makers · site e growth", entrega: "WMS" },
  { bu: "bu-lead", nome: "Comercial · leads", entrega: "LEAD", escopo: "(labels = bu-lead OR project = LEAD)" },
  { bu: "bu-ops", nome: "Back-office", entrega: "OPS" },
  { bu: "bu-renan", nome: "Renan Teixeira", entrega: "RNT" },
  { bu: "bu-parked", nome: "P&D parado", entrega: "WM" },
];

const PROJETOS = ["WM", "FNX", "WMS", "OPS", "LEAD", "RNT"];
const ABERTO = "statusCategory != Done";
const escopoDe = (u) => u.escopo || `labels = ${u.bu}`;

// ── .env da raiz (mesmo formato que o Growth Kit lê) ─────────────────────────
function parseEnvFile(file) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else {
      val = val.replace(/\s+#.*$/, "").trim(); // comentário inline, padrão dotenv
      if (val.startsWith("#")) val = "";
    }
    out[key] = val;
  }
  return out;
}

const ENV_FILE = process.env.GROWTH_ENV_FILE || path.join(REPO_ROOT, ".env");
const FILE_ENV = parseEnvFile(ENV_FILE);
const env = (n) => process.env[n] || FILE_ENV[n] || "";

function credenciais() {
  const base = (env("JIRA_BASE_URL") || env("JIRA_URL")).replace(/\/+$/, "");
  const email = env("JIRA_EMAIL");
  const token = env("JIRA_TOKEN");
  const faltando = [
    !base && "JIRA_BASE_URL",
    !email && "JIRA_EMAIL",
    !token && "JIRA_TOKEN",
  ].filter(Boolean);
  if (faltando.length) {
    throw new Error(
      `Faltando ${faltando.join(", ")}. Defina no shell ou em ${path.relative(REPO_ROOT, ENV_FILE)}.`,
    );
  }
  return { base, auth: "Basic " + Buffer.from(`${email}:${token}`).toString("base64") };
}

// ── Jira ─────────────────────────────────────────────────────────────────────
// ATENÇÃO: /rest/api/3/search foi REMOVIDO pela Atlassian (410, CHANGE-2046).
// O caminho vivo é /rest/api/3/search/jql, e a contagem vem do approximate-count.
async function buscar(jql, { fields = ["summary", "status", "priority", "labels", "project", "updated"], max = 100 } = {}) {
  const { base, auth } = credenciais();
  const res = await fetch(`${base}/rest/api/3/search/jql`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ jql, fields, maxResults: max }),
  });
  if (!res.ok) throw new Error(`Jira ${res.status} em search/jql: ${(await res.text()).slice(0, 400)}`);
  return (await res.json()).issues || [];
}

async function contar(jql) {
  const { base, auth } = credenciais();
  const res = await fetch(`${base}/rest/api/3/search/approximate-count`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ jql }),
  });
  if (!res.ok) throw new Error(`Jira ${res.status} em approximate-count: ${(await res.text()).slice(0, 400)}`);
  return (await res.json()).count ?? 0;
}

// ── Formatação ───────────────────────────────────────────────────────────────
const pad = (s, n) => String(s ?? "").padEnd(n).slice(0, n);
const num = (v, n) => String(v ?? 0).padStart(n);

function linhaIssue(i) {
  const f = i.fields || {};
  const marca = (f.labels || []).includes("bloqueado")
    ? "!"
    : (f.labels || []).includes("owner-action")
      ? "*"
      : (f.labels || []).includes("parado")
        ? "~"
        : " ";
  return `  ${marca} ${pad(i.key, 8)} ${pad(f.priority?.name ?? "-", 8)} ${pad(f.status?.name ?? "-", 14)} ${f.summary ?? ""}`;
}

// ── Comandos ─────────────────────────────────────────────────────────────────
async function cmdResumo(json) {
  const linhas = [];
  for (const u of UNIDADES) {
    const base = escopoDe(u);
    const [aberto, alta, bloqueado, owner] = await Promise.all([
      contar(`${base} AND ${ABERTO}`),
      contar(`${base} AND ${ABERTO} AND priority in (Highest, High)`),
      contar(`${base} AND ${ABERTO} AND labels = bloqueado`),
      contar(`${base} AND ${ABERTO} AND labels = "owner-action"`),
    ]);
    linhas.push({ ...u, aberto, alta, bloqueado, owner });
  }
  const total = await contar(`project in (${PROJETOS.join(", ")}) AND ${ABERTO}`);

  if (json) return console.log(JSON.stringify({ unidades: linhas, total }, null, 2));

  console.log("");
  console.log(`  ${pad("UNIDADE", 30)} ${pad("ENTREGA", 8)} ${num("ABERTO", 6)} ${num("ALTA", 6)} ${num("BLOQ", 6)} ${num("VOCÊ", 6)}`);
  console.log("  " + "-".repeat(66));
  for (const l of linhas) {
    console.log(`  ${pad(l.nome, 30)} ${pad(l.entrega, 8)} ${num(l.aberto, 6)} ${num(l.alta, 6)} ${num(l.bloqueado, 6)} ${num(l.owner, 6)}`);
  }
  console.log("  " + "-".repeat(66));
  console.log(`  ${pad("TOTAL DA HOLDING", 30)} ${pad("", 8)} ${num(total, 6)}`);
  console.log("");
  console.log("  BLOQ = travado em terceiro · VOCÊ = só o dono pode fazer (console externa)");
  console.log("");
}

async function cmdUnidade(alvo, json) {
  const u = UNIDADES.find((x) => x.bu === alvo || x.bu === `bu-${alvo}` || x.nome.toLowerCase().includes(String(alvo).toLowerCase()));
  if (!u) {
    console.error(`Unidade desconhecida: ${alvo}`);
    console.error(`Conhecidas: ${UNIDADES.map((x) => x.bu.replace(/^bu-/, "")).join(", ")}`);
    process.exit(1);
  }
  const issues = await buscar(`${escopoDe(u)} AND ${ABERTO} ORDER BY priority DESC, updated DESC`);
  if (json) return console.log(JSON.stringify({ unidade: u, issues }, null, 2));
  console.log(`\n  ${u.nome}  ·  ${issues.length} em aberto  ·  label ${u.bu}\n`);
  issues.forEach((i) => console.log(linhaIssue(i)));
  console.log("");
}

async function cmdTravados(json) {
  const jql = `project in (${PROJETOS.join(", ")}) AND ${ABERTO} AND labels in ("owner-action", bloqueado) ORDER BY priority DESC, updated DESC`;
  const issues = await buscar(jql);
  if (json) return console.log(JSON.stringify({ issues }, null, 2));
  console.log(`\n  Travado em ação sua ou de terceiro  ·  ${issues.length} itens\n`);
  issues.forEach((i) => console.log(linhaIssue(i)));
  console.log("\n  * = só você pode fazer   ! = bloqueado em terceiro\n");
}

async function cmdSemana(json) {
  const jql = `project in (${PROJETOS.join(", ")}) AND updated >= -7d ORDER BY updated DESC`;
  const issues = await buscar(jql, { max: 50 });
  if (json) return console.log(JSON.stringify({ issues }, null, 2));
  console.log(`\n  Mexido nos últimos 7 dias  ·  ${issues.length} itens\n`);
  issues.forEach((i) => console.log(linhaIssue(i)));
  console.log("");
}

async function cmdJql(jql, json) {
  const issues = await buscar(jql);
  if (json) return console.log(JSON.stringify({ jql, issues }, null, 2));
  console.log(`\n  ${jql}  ·  ${issues.length} itens\n`);
  issues.forEach((i) => console.log(linhaIssue(i)));
  console.log("");
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const json = argv.includes("--json");
const args = argv.filter((a) => a !== "--json");
const cmd = args[0] || "resumo";

const USO = `
  jira-rollup — rollup do portfólio da holding a partir do Jira

    resumo                  uma linha por unidade de negócio (default)
    unidade <nome>          backlog aberto de uma unidade
                            (${UNIDADES.map((u) => u.bu.replace(/^bu-/, "")).join(", ")})
    travados                owner-action + bloqueado, em todas as unidades
    semana                  o que andou nos últimos 7 dias
    jql "<jql>"             consulta livre

  --json  em qualquer comando, devolve JSON em vez de tabela
`;

try {
  if (cmd === "resumo") await cmdResumo(json);
  else if (cmd === "unidade") await cmdUnidade(args[1], json);
  else if (cmd === "travados") await cmdTravados(json);
  else if (cmd === "semana") await cmdSemana(json);
  else if (cmd === "jql") await cmdJql(args.slice(1).join(" "), json);
  else {
    console.log(USO);
    process.exit(cmd === "help" || cmd === "--help" ? 0 : 1);
  }
} catch (e) {
  console.error(`\n  ERRO: ${e.message}\n`);
  process.exit(1);
}
