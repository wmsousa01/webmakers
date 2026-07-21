# Web Makers — CLAUDE.md

Durable context for any future session. Read this first.

## O que é a Web Makers

Agência de desenvolvimento web em **Mogi Guaçu-SP** que vende **sites, integrações e
automações** para micro e pequenas empresas locais. Oferta de topo de funil:
**"Diagnóstico digital grátis · sem compromisso"**. Site: `webmakers.dev.br`,
Instagram `@webmakersbr`, WhatsApp `5519989331908`.

Big idea da marca: *"Coloque seu negócio para trabalhar online."*

## Stack do site

- **Next.js 14 (pages router), JavaScript (sem TypeScript), Tailwind CSS.**
- Design system em `tailwind.config.js` (`brand.*` / `ink.*` / `surface.*`). Fontes
  **Plus Jakarta Sans** (títulos) + **Figtree** (corpo), auto-hospedadas via `next/font`.
- **Sem banco de dados e sem auth** no app.
- **Leads** vão para o **Jira, projeto `LEAD`** (issuetype `Tarefa`) na instância
  `wdesousa.atlassian.net`, criados por uma **API route do Next** (`pages/api/send-to-jira.js`)
  que lê o `.env`. O **chat de triagem** (`components/gpt/ChatGptChat.jsx`) posta em
  `/api/send-to-jira`. Projeto/issuetype são configuráveis por env
  (`JIRA_LEAD_PROJECT`/`JIRA_LEAD_ISSUETYPE`). A triagem (tipo/urgência/orçamento/segmento)
  vira **summary categorizado + labels** (`lead-site`, `servico-*`, `urgencia-*`,
  `orcamento-*`, `segmento-*`) **+ prioridade** (urgência→High/Medium/Low, com retry sem
  prioridade se o campo não estiver na tela). O backend Express no Railway (`server/jira.js`)
  virou **legado/redundante** — o caminho vivo é a API route.
- Analytics: **GA** (`NEXT_PUBLIC_GOOGLE_ANALYTICS`), **GTM-NPJRJJX6**, **Google Ads
  AW-961364895** (conversão gtag já instalada em `_document.js`). **Não há Meta Pixel.**

## Duas peças de growth engineering neste repo

### A) Growth Kit — `scripts/growth/`

Fábrica de conteúdo/ads **portátil, dep-free (Node/ESM puro, sem npm install) e
config-driven**. O motor não tem nada hardcoded do projeto — tudo vem de `config/` +
`briefs/`. Copiar o kit para outro repo e trocar só esses arquivos faz ele rodar lá.

Pipeline: **brief → generate → validate → approve → publish**. Estágios cobrem geração
de imagem (Gemini), vídeo (Veo), narração (ElevenLabs TTS), montagem (ffmpeg), Meta Ads
(Graph API), Instagram (Graph API), upload no Cloudflare R2 e validação por visão.

**Gate humano (regra inviolável):** anúncios são **sempre criados PAUSADOS**. Nada vai
ao ar sem ação manual (`activate`). Não automatize o `activate`.

Layout:
- `factory.mjs` — CLI da pipeline. `lib/*.mjs` — motor (gemini, veo, tts, assemble,
  meta, ig, r2, validate, brand, brief, env).
- `lib/env.mjs` — módulo central de caminhos: resolve `config/`, `briefs/`, `out/`
  relativos ao kit e lê segredos do **`.env` na raiz do repo** (override:
  `GROWTH_ENV_FILE=/abs/path`). Segredos nunca são impressos.
- `config/brand/tokens.json` — **fonte da verdade da marca** (cores, voz, motivo,
  oferta). Paleta: primário `#39B6EB`, navy `#0B3448`, fundo claro premium. `lib/brand.mjs`
  lê este arquivo; mantê-lo sincronizado com `tailwind.config.js`.
- `config/distribution.config.json` — IDs Meta/IG/Google + landing + utm. Campos `SET_*`
  são placeholders a preencher (ver Pendências).
- `briefs/*.json` — briefs de criativos. Dois seeds: `webmakers_site-48h` (static-4x5) e
  `webmakers_automacao-whatsapp` (carrossel-4x5).
- `out/` — mídia gerada, **gitignored**. `README.md` documenta setup e como copiar o kit.

Comandos (rodar da raiz do repo):
```bash
node scripts/growth/factory.mjs list
node scripts/growth/factory.mjs brief <id> [static-1x1|static-4x5|carrossel-4x5]
node scripts/growth/factory.mjs generate <id> [--dry-run] [--card=N]
node scripts/growth/factory.mjs validate <id>
node scripts/growth/factory.mjs approve <id> [--force]
node scripts/growth/factory.mjs meta-adsets
node scripts/growth/factory.mjs publish <id> --to=<adset_id>   # cria ad PAUSADO
node scripts/growth/factory.mjs activate <id>                  # ação manual/gate humano
node scripts/growth/factory.mjs publish-ig <id>                # IG orgânico
```
`--dry-run` roda **offline** (imprime prompts branded, sem chamar API nem criar nada).
Para gerar imagens reais é preciso `GOOGLE_AI_API_KEY` no `.env` da raiz.

### B) Painel de ops — `/painel`

Dashboard interno da agência (`pages/painel/index.jsx`), **sem DB**:
- `lib/panelData.js` (server-only): `fetchLeads()` lê os leads do Jira (projeto
  `LEAD`, filtrando pela label `lead-site`) via `/rest/api/3/search/jql` — **o endpoint
  antigo `/rest/api/3/search` foi removido pela Atlassian (410, CHANGE-2046)**; o total
  vem do `/search/jql/../approximate-count`. `readContentPipeline()` lê os briefs do kit,
  `readAdsConfig()` lê a config de distribuição. **Tudo degrada graciosamente — nunca lança
  exceção.**
- `middleware.js` — Basic Auth em `/painel` (`PANEL_USER` / `PANEL_PASSWORD`),
  **fail-closed** (sem env, o painel fica trancado).
- `pages/_app.js` esconde Navbar/Footer/Chat/GA em `/painel` (superfície interna, sem
  chrome público).
- `next.config.js` usa `experimental.outputFileTracingIncludes` para empacotar
  `scripts/growth/briefs` + `config` e o `/painel` conseguir lê-los na Vercel.

## Variáveis de ambiente (Vercel + `.env` da raiz)

- Painel + leads: `PANEL_USER`, `PANEL_PASSWORD`, `JIRA_BASE_URL` (ou deriva de `JIRA_URL`),
  `JIRA_EMAIL`, `JIRA_TOKEN`, `JIRA_LEAD_PROJECT` (ex: `LEAD`), `JIRA_LEAD_ISSUETYPE`
  (default `Tarefa`). Estes três últimos também são usados pela API route de leads.
- Growth Kit: `GOOGLE_AI_API_KEY` (obrigatória p/ imagem), `META_ACCESS_TOKEN`,
  `IG_ACCESS_TOKEN` (cai p/ `META_ACCESS_TOKEN` se ausente), `ELEVENLABS_API_KEY` (reels),
  `R2_ENDPOINT`/`R2_BUCKET`/`R2_PUBLIC_BASE`/`R2_ACCESS_KEY_ID`/`R2_SECRET_ACCESS_KEY`
  (host público p/ publish-ig; `R2_KEY_PREFIX` opcional), `GADS_*` (Google Ads, opcional).

## Pendências para ir ao ar

- **Preencher os `SET_*`** em `scripts/growth/config/distribution.config.json`
  (`ad_account_id`, `business_id`, `page_id`, `pixel_id`, `ig_user_id`). Requer criar a
  **conta Meta Business + Instagram business** da Web Makers — hoje só existem GA e Google
  Ads; **não há Meta Pixel**.
- **Setar os env na Vercel** (lista acima): `PANEL_USER`, `PANEL_PASSWORD`, `JIRA_*`,
  `GOOGLE_AI_API_KEY`, `META_ACCESS_TOKEN`, `IG_ACCESS_TOKEN`, `R2_*`, `ELEVENLABS_API_KEY`.
- **Ver criativos reais:** por `GOOGLE_AI_API_KEY` no `.env` da raiz, rodar
  `node scripts/growth/factory.mjs generate webmakers_site-48h` e depois `validate`.
- **Reels** precisam de um asset de música em `config/brand/music/` + `ELEVENLABS_API_KEY`.

## Convenções

- **Copy sempre em PT-BR**, tom próximo/direto focado em ROI do dono do pequeno negócio,
  sem jargão. Benefício concreto + PME local.
- **Paleta:** azul-céu `#39B6EB` + navy `#0B3448` sobre **fundo claro** (tema light). Sem
  fundo escuro, sem serifada/fina, sem cara de template DIY.
- **Nunca commitar** `.env`, `node_modules`, `.next/` nem `scripts/growth/out/`.
- **Ads sempre criados PAUSADOS** — gate humano é obrigatório; ativação é manual.
- Marca é editada em `config/brand/tokens.json` (fonte da verdade), sincronizada com
  `tailwind.config.js`.
