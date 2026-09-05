#!/usr/bin/env node
// Gera o link de uma proposta: URL única, assinada e com validade.
//
//   node scripts/proposta/link.mjs renan-camargo
//   node scripts/proposta/link.mjs renan-camargo --dias=30
//   node scripts/proposta/link.mjs renan-camargo --base=http://localhost:3000
//
// Cada execução devolve uma URL DIFERENTE (o token carrega um nonce), então dá
// para enviar um link por conversa. Todos valem até a data de expiração; passou
// disso, a página se fecha sozinha sem ninguém precisar lembrar de nada.
//
// Segredo: PROPOSTA_SECRET no .env da raiz (ou no shell). O MESMO valor precisa
// estar na Vercel, senão o link gerado aqui não abre em produção.
//
// Dep-free: só Node, sem npm install.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assinar } from "../../lib/propostaToken.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const BASE_PADRAO = "https://webmakers.dev.br";
const DIAS_PADRAO = 15; // igual à validade impressa na proposta

/** Lê o .env da raiz sem dependência. Não imprime valor nenhum. */
function lerEnv(nome) {
  if (process.env[nome]) return process.env[nome];
  const arquivo = path.join(REPO_ROOT, ".env");
  if (!fs.existsSync(arquivo)) return "";
  for (const linha of fs.readFileSync(arquivo, "utf8").split(/\r?\n/)) {
    const l = linha.trim();
    if (!l || l.startsWith("#")) continue;
    const i = l.indexOf("=");
    if (i < 0 || l.slice(0, i).trim() !== nome) continue;
    let v = l.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      return v.slice(1, -1);
    }
    v = v.replace(/\s+#.*$/, "").trim();
    return v.startsWith("#") ? "" : v;
  }
  return "";
}

function existeProposta(slug) {
  const dir = path.join(REPO_ROOT, "pages", "proposta");
  return [".jsx", ".js"].some((ext) => fs.existsSync(path.join(dir, slug + ext)));
}

async function main() {
  const args = process.argv.slice(2);
  const flags = {};
  const soltos = [];
  for (const a of args) {
    const m = /^--([^=]+)(?:=(.*))?$/.exec(a);
    if (m) flags[m[1]] = m[2] ?? "true";
    else soltos.push(a);
  }

  const slug = soltos[0];
  if (!slug || flags.help) {
    console.log("Uso: node scripts/proposta/link.mjs <slug> [--dias=15] [--base=https://...]");
    console.log("Ex.: node scripts/proposta/link.mjs renan-camargo --dias=15");
    process.exit(slug ? 0 : 1);
  }

  if (slug !== "acesso" && !existeProposta(slug)) {
    console.error(`✗ Não existe pages/proposta/${slug}.jsx — confira o slug.`);
    process.exit(1);
  }

  const secret = lerEnv("PROPOSTA_SECRET");
  if (!secret) {
    console.error("✗ Faltando PROPOSTA_SECRET (no .env da raiz ou no shell).");
    console.error("  Gere um: node -e \"console.log(crypto.randomUUID()+crypto.randomUUID())\"");
    console.error("  E use o MESMO valor na Vercel, senão o link não abre em produção.");
    process.exit(1);
  }

  const dias = Number(flags.dias ?? DIAS_PADRAO);
  if (!Number.isFinite(dias) || dias <= 0) {
    console.error("✗ --dias precisa ser um número positivo.");
    process.exit(1);
  }

  const base = (flags.base || BASE_PADRAO).replace(/\/+$/, "");
  const { token, exp } = await assinar({ slug, dias, secret });
  const expiraEm = new Date(exp * 1000);

  console.log("");
  console.log(`${base}/proposta/${slug}?t=${token}`);
  console.log("");
  console.log(`  cliente ..... ${slug}`);
  console.log(`  validade .... ${dias} dia(s)`);
  console.log(
    `  expira ...... ${expiraEm.toLocaleString("pt-BR", { dateStyle: "long", timeStyle: "short" })}`,
  );
  console.log("");
  console.log("  Cada execução gera um link diferente; todos valem até a data acima.");
  console.log("  Para invalidar TUDO antes do prazo, troque o PROPOSTA_SECRET na Vercel.");
}

main().catch((e) => {
  console.error("✗ " + e.message);
  process.exit(1);
});
