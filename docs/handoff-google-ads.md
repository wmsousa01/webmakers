# Handoff — Campanha de Google Ads (Pesquisa)

### Para a equipe que cuida da conexão do Google Ads · Web Makers · jul/2026

> **TL;DR:** a estrutura da campanha está pronta e versionada em
> `scripts/growth/config/google-ads/pesquisa-local.json`. Não é preciso migrar
> de modo. Suba com **R$ 12/dia** e teto de CPC **R$ 9**, só os 2 grupos com
> demanda. Expectativa realista: **~11 cliques/mês** — Search local é rede de
> pesca barata, não a alavanca. Duas decisões dependem de vocês (geografia +
> conversões no painel). Detalhes abaixo.

---

## 1. Contexto obrigatório antes de montar

Leiam antes, senão vão repetir o erro da campanha antiga:

- **A demanda local é mínima.** O Planejador deu **110 buscas/mês** para as 19
  palavras nas 4 cidades. Isso é o teto — não adianta orçamento alto.
  Análise completa: `docs/analise-google-ads-planejador.md`.
- **A campanha antiga não estava quebrada.** Deu 35 impressões / R$ 0,20 em 30
  dias porque o lance (R$ 4) estava **abaixo do piso de mercado** (R$ 5–6,50) e a
  demanda é baixa. Corrigimos o teto para R$ 9.
- **O diferencial (automação/integração) tem busca local ZERO.** Não subir esse
  grupo — ele vai por orgânico/conteúdo, não por Search.

## 2. A conta

| | |
|---|---|
| Customer ID | `4296394458` (conta Web Makers) |
| MCC | `7180669384` (a conta **não** está vinculada à MCC — omitir login-customer-id) |
| Modo | Smart — **NÃO precisa migrar**. Campanha de Pesquisa cria/valida via API assim mesmo (confirmado com `validateOnly` 2x). O bloqueio do Smart era só **editar** a campanha Smart antiga |
| Campanha antiga | `24046143972` está REMOVED — ignorar |

## 3. O que montar — copiar de `pesquisa-local.json`

A spec tem tudo pronto e validado (`node scripts/growth/factory.mjs gads-spec`):

- **Campanha:** `WM | Pesquisa | Mogi Guaçu e região`, tipo SEARCH, **sem** rede
  de Display e **sem** parceiros de busca.
- **Orçamento:** R$ 12/dia. **Lance:** Maximizar cliques, teto de CPC R$ 9.
- **2 grupos apenas:** "Criação de site" (9 palavras) e "Loja virtual" (5). O
  grupo "Automação e integração" fica **fora** (`incluir_no_lancamento: false`).
- **Correspondência:** só frase e exata. Nada de ampla.
- **Anúncio responsivo:** 15 títulos + 4 descrições prontos na spec (todos dentro
  do limite de caractere — já validado).
- **Extensões:** 4 sitelinks, 6 frases de destaque, snippets, chamada. Na spec.
- **37 palavras negativas** (grátis / curso / emprego / DIY) — aplicar no nível
  da campanha. Na spec, seção `palavras_negativas`.
- **Geo:** presença física ("pessoas que estão ou frequentam"), **não** interesse.
  Idioma pt.

## 4. Duas decisões que são de vocês

1. **Geografia.** Default é hiperlocal (4 cidades, ~110 buscas/mês, preserva o
   argumento "agência local DDD 19"). Alternativa: incluir a RMC/Campinas
   (~3x volume, mas dilui o "local"). É decisão de marca — ver
   `decisao_pendente_expansao` na spec. Se expandir, subir o orçamento
   proporcionalmente.

2. **Conversões principais (no painel, NÃO via API).** Metas → Conversões →
   Resumo: deixar **`Lead do site (chat de triagem)`** (id `7694288790`) como
   **única principal** e rebaixar as 6 ações herdadas do Smart (Clicks to call,
   Local actions - Directions, Smart campaign *) para secundárias. A API **recusa**
   mutar essas ações (`Mutates are not allowed` — são gerenciadas pelo sistema).
   Não morde enquanto o lance for Maximizar cliques; vira **crítico** ao trocar
   para Maximizar conversões.

## 5. Checklist de lançamento

- [ ] Ler `docs/analise-google-ads-planejador.md` (expectativa de volume).
- [ ] Decidir a geografia (item 4.1).
- [ ] Montar campanha/grupos/anúncio/extensões a partir de `pesquisa-local.json`.
- [ ] Aplicar as 37 negativas no nível da campanha.
- [ ] Conferir geo em "presença física" (o default do Google é mais amplo).
- [ ] Corrigir as conversões principais no painel (item 4.2).
- [ ] Criar/vincular o Google Perfil de Empresa (habilita extensão de local + é o
      ativo que sustenta SEO local e prova social por avaliações).
- [ ] Subir. Acompanhar por ~2-3 semanas antes de mexer em lance.

## 6. Quando trocar para Maximizar conversões

Só após ~30 conversões acumuladas ou 3-4 semanas **E** com as conversões
principais já corrigidas no painel. Antes disso, Maximizar cliques com teto.

## 7. O que a medição do site já entrega (contexto)

O site foi corrigido: formulário, chat de triagem e cliques de WhatsApp **todos**
disparam conversão no Google Ads agora (antes só o chat disparava), com valor por
origem para permitir lance por valor no futuro. A ação de conversão
`Lead do site (chat de triagem)` já aceita valores variáveis. Ver
`lib/track.js` no repo.

## 8. Arquivos de referência no repo

- `scripts/growth/config/google-ads/pesquisa-local.json` — a spec (fonte da verdade)
- `docs/analise-google-ads-planejador.md` — por que os números são esses
- `docs/pesquisa-mercado-mogi-guacu.md` — pesquisa de mercado
- `scripts/growth/lib/gads.mjs` — cliente da API (OAuth, search/GAQL, validateOnly)
- Smoke test da API: `node scripts/growth/factory.mjs gads-check`
- Relatório: `node scripts/growth/factory.mjs gads-report --customer=4296394458`
