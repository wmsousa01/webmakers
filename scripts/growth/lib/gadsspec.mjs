// Validação da spec de campanha de Pesquisa contra os limites do Google Ads.
//
// Existe porque estourar limite de caractere só aparece na hora de colar no
// painel, um item por vez — o retrabalho é manual e chato. Aqui o erro aparece
// de uma vez, antes de abrir o navegador.
//
// Limites conforme a documentação do Google Ads (Responsive Search Ads e
// recursos/extensões). Contagem é por caractere, não por byte: acento conta 1.

import fs from "node:fs";
import path from "node:path";
import { CONFIG_DIR } from "./env.mjs";

// [limite, rótulo]
const LIMITES = {
  titulo: 30,
  descricao: 90,
  caminho: 15,
  sitelink_texto: 25,
  sitelink_descricao: 35,
  frase_destaque: 25,
  snippet_valor: 25,
  palavra_chave: 80,
};

const len = (s) => [...String(s)].length; // conta por code point, não por UTF-16

export function specPath(nome = "pesquisa-local") {
  return path.join(CONFIG_DIR, "google-ads", `${nome}.json`);
}

export function loadSpec(nome) {
  const p = specPath(nome);
  if (!fs.existsSync(p)) throw new Error(`Spec não encontrada: ${p}`);
  return { spec: JSON.parse(fs.readFileSync(p, "utf8")), file: p };
}

/** Retorna { erros: [], avisos: [], contagens: {} } — não lança. */
export function validateSpec(spec) {
  const erros = [];
  const avisos = [];

  const checa = (valor, tipo, onde) => {
    const max = LIMITES[tipo];
    const n = len(valor);
    if (n > max) {
      erros.push(`${onde}: ${n}/${max} caracteres — "${valor}"`);
    }
    return n;
  };

  const ad = spec.anuncio_responsivo || {};
  const titulos = ad.titulos || [];
  const descricoes = ad.descricoes || [];

  titulos.forEach((t, i) => checa(t, "titulo", `título ${i + 1}`));
  descricoes.forEach((d, i) => checa(d, "descricao", `descrição ${i + 1}`));
  (ad.caminho_exibicao || []).forEach((c, i) =>
    checa(c, "caminho", `caminho de exibição ${i + 1}`)
  );

  // Mínimos exigidos pelo Google para um anúncio responsivo válido.
  if (titulos.length < 3) erros.push(`títulos: ${titulos.length} (mínimo 3)`);
  if (descricoes.length < 2) erros.push(`descrições: ${descricoes.length} (mínimo 2)`);
  if (titulos.length < 15)
    avisos.push(`${titulos.length}/15 títulos — menos combinações para o Google testar`);
  if (descricoes.length < 4) avisos.push(`${descricoes.length}/4 descrições`);

  // Títulos duplicados desperdiçam slot: o Google não exibe o mesmo texto duas vezes.
  const vistos = new Set();
  titulos.forEach((t) => {
    const k = t.toLowerCase().trim();
    if (vistos.has(k)) avisos.push(`título repetido: "${t}"`);
    vistos.add(k);
  });

  const rec = spec.recursos || {};
  (rec.sitelinks || []).forEach((s, i) => {
    checa(s.texto, "sitelink_texto", `sitelink ${i + 1} (texto)`);
    if (s.descricao1) checa(s.descricao1, "sitelink_descricao", `sitelink ${i + 1} (desc 1)`);
    if (s.descricao2) checa(s.descricao2, "sitelink_descricao", `sitelink ${i + 1} (desc 2)`);
  });
  (rec.frases_destaque || []).forEach((f, i) =>
    checa(f, "frase_destaque", `frase de destaque ${i + 1}`)
  );
  (rec.snippets_estruturados?.valores || []).forEach((v, i) =>
    checa(v, "snippet_valor", `snippet ${i + 1}`)
  );
  if ((rec.snippets_estruturados?.valores || []).length < 3)
    avisos.push("snippets estruturados: o Google exige no mínimo 3 valores");

  let totalKw = 0;
  (spec.grupos || []).forEach((g) => {
    (g.palavras_chave || []).forEach((k) => {
      totalKw++;
      checa(k.texto, "palavra_chave", `palavra-chave [${g.nome}]`);
      if (String(k.texto).trim().split(/\s+/).length > 10)
        erros.push(`palavra-chave com mais de 10 palavras [${g.nome}]: "${k.texto}"`);
      if (k.correspondencia === "AMPLA")
        avisos.push(`correspondência ampla em "${k.texto}" — cara sem histórico de conversão`);
    });
  });

  (spec.grupos || []).forEach((g) => {
    if (!(g.palavras_chave || []).length) erros.push(`grupo "${g.nome}" sem palavras-chave`);
  });

  const negativas = Object.entries(spec.palavras_negativas || {})
    .filter(([k]) => !k.startsWith("_"))
    .flatMap(([, v]) => v);

  return {
    erros,
    avisos,
    contagens: {
      titulos: titulos.length,
      descricoes: descricoes.length,
      grupos: (spec.grupos || []).length,
      palavras_chave: totalKw,
      negativas: negativas.length,
      sitelinks: (rec.sitelinks || []).length,
      frases_destaque: (rec.frases_destaque || []).length,
      localizacoes: (spec.campanha?.localizacoes || []).length,
    },
  };
}
