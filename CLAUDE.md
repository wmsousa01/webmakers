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
  AW-961364895** (conversão gtag já instalada em `_document.js`). O **Meta Pixel existe**
  no Business Manager (`1539611761512509`) mas **nunca disparou um evento** — não está
  instalado no site. Rodar Meta Ads antes de instalá-lo = gastar sem sinal de conversão.

## A Web Makers é a holding — como o portfólio vive no Jira

Todos os outros projetos em `Projetos/` são subprodutos ou serviços da Web Makers, e
o portfólio inteiro é gerenciado em **`wdesousa.atlassian.net`**. Estrutura em três
camadas (criada em 2026-08-06):

| Chave | Projeto | Papel |
|---|---|---|
| `WM` | Web Makers · Portfólio | **Camada de holding.** Um Epic por unidade de negócio, iniciativas dentro. Onde você *olha*, não onde trabalha. |
| `CTA` | Contenta AI | Entrega do SaaS (`Projetos/ai-video-editor`) |
| `FNX` | FENIXX Uniformes | Entrega do cliente (`Projetos/atende-ai`) |
| `FDC` | Fora da Caixa | Entrega do hub de conteúdo (`Projetos/pfc-landing`) |
| `WMS` | Web Makers · Site e Growth | Entrega **deste repo** |
| `OPS` | Back-office e Ferramentas | Central MEI, ferramentas, portfólio, infra — separado por **componente** |
| `LEAD` | Web Makers · Leads | **Já existia, integração viva.** Não mudar chave nem issuetype sem mexer no `.env`. |

Todos são **company-managed** (classic) com o mesmo esquema — Epic · História ·
Tarefa · Subtarefa · Bug e os mesmos status. É proposital: workflow compartilhado é o
que faz JQL e dashboard entre projetos agregarem sem tradução.

### A label `bu-*` é obrigatória — ela é a hierarquia

O plano é **Jira Software Free**, que **não tem Plans nem nível acima de Epic**, e cujas
regras de automação são **single-project com teto de 100 execuções/mês**. Não existe
rollup nativo entre projetos. O substituto é uma label de unidade em **toda** issue:

`bu-contenta` · `bu-fenixx` · `bu-fdc` · `bu-webmakers` · `bu-lead` · `bu-ops` · `bu-parked`

Com ela, `labels = bu-contenta AND statusCategory != Done` atravessa qualquer projeto.
**Issue sem `bu-*` é invisível para o portfólio** — some do dashboard, do rollup e do
review semanal. Ao criar issue por API ou script, a label vai junto.

Labels de estado que o dashboard usa: **`owner-action`** (trava numa console de terceiro
— Cloudflare, Vercel, Meta, Google Ads — e só você desbloqueia), **`bloqueado`** (trava em
terceiro), **`parado`** (pausado por decisão sua, com o motivo na descrição),
**`iniciativa`** e **`unidade`** (marcam as duas camadas dentro do `WM`).

### Onde olhar

- **Dashboard "Holding · Web Makers"** — `/jira/dashboards/10034`. Esquerda: o que decidir
  e o que está travado. Direita: uma caixa por unidade.
- **12 filtros salvos** com prefixo `Holding ·`, todos favoritados.
- **`node scripts/ops/jira-rollup.mjs`** — rollup por linha de comando (`resumo`,
  `unidade <nome>`, `travados`, `semana`, `jql "<jql>"`, todos com `--json`). Dep-free,
  lê `JIRA_*` do `.env` da raiz. É **consulta**, não automação: não gasta as 100
  execuções/mês. O `--json` existe para o `/painel` consumir.

### O developer token é declarado — e a declaração obriga

O token da Google Ads API não é só uma credencial: no **API Center da MCC** há um
formulário (`Detalhes do desenvolvedor`) com **tipo de empresa** e **uso pretendido**,
e os Termos exigem que o uso real corresponda ao declarado. Ele nasceu como
*"Anunciante · interna/gestão da própria conta"* — verdadeiro enquanto a Web Makers
só geria a própria conta, **falso a partir da primeira conta de cliente** na MCC.
Corrigido para *Agência/SEM* em 2026-09-04.

**Regra:** antes de vincular conta de terceiro à MCC, conferir se a declaração ainda
descreve o que você faz. E **não pedir "Acesso padrão"** por reflexo — Basic Access são
15k operações/dia (folgado para relatório diário + mutações), e Standard abre uma revisão
de conformidade desnecessária. Nível de acesso é sobre **volume**; a declaração é sobre
**natureza do uso** — campos independentes. Quando o console virar produto que o cliente
acessa, é uma terceira declaração (ferramenta de terceiros), aí sim provavelmente Standard.

### Armadilha já paga

`/rest/api/3/search` foi **removido** pela Atlassian (410, CHANGE-2046). O caminho vivo é
**`/rest/api/3/search/jql`**, e o total vem de **`/rest/api/3/search/approximate-count`**.
Vale para `lib/panelData.js` e para o rollup.

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
  meta, ig, r2, gads, validate, brand, brief, env).
- `lib/gads.mjs` — Google Ads API (REST, dep-free): OAuth refresh→access token com cache,
  `listAccessibleCustomers()` e `search()` (GAQL) + `campaignPerformance()`. **Leitura E
  mutação:** `setCampaignStatus()` (ENABLED/PAUSED), `removeCampaign()`,
  `createConversionAction()`, `setConversionActionPrimary()` — todas aceitam
  **`validateOnly`** (dry-run da própria API). Basic Access aprovado
  (MCC `718-066-9384`, 15k ops/dia).
  **Versão da API:** `GADS_API_VERSION`, default **`v25`** (verificado 2026-09-04).
  O Google aposenta ~2 versões/ano e devolve um HTML 404 confuso. Para achar as vivas:
  `curl -s -o /dev/null -w "%{http_code}" https://googleads.googleapis.com/vNN/customers:listAccessibleCustomers`
  — **401 = viva, 404 = aposentada**. Em 2026-09-04: v22–v26 vivas, v20/v21 mortas, e a
  **v26 já removeu `listAccessibleCustomers`** ("Method not found"), então v25 é o teto útil.
- `lib/env.mjs` — módulo central de caminhos: resolve `config/`, `briefs/`, `out/`
  relativos ao kit e lê segredos do **`.env` na raiz do repo** (override:
  `GROWTH_ENV_FILE=/abs/path`). Segredos nunca são impressos.
- `config/brand/tokens.json` — **fonte da verdade da marca** (cores, voz, motivo,
  oferta). Paleta: primário `#39B6EB`, navy `#0B3448`, fundo claro premium. `lib/brand.mjs`
  lê este arquivo; mantê-lo sincronizado com `tailwind.config.js`.
- `config/distribution.config.json` — IDs Meta/IG/Google + landing + utm. **Preenchido e
  verificado ao vivo em 2026-09-04** (não há mais placeholder `SET_*`).
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
node scripts/growth/factory.mjs gads-check                     # fumaça Google Ads
node scripts/growth/factory.mjs gads-report [--customer=<id>] [--days=30]
node scripts/growth/factory.mjs gads-carteira [--days=30]      # carteira da MCC: todas as subcontas + entrega
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

- ~~Preencher os `SET_*`~~ **FEITO.** Estado verificado ao vivo em **2026-09-04**
  (`debug_token` + Graph + `gads-check`):
  - Token Meta é **SYSTEM_USER que não expira**, app `1722246592008193`, com
    `ads_management`, `ads_read`, `business_management`, `instagram_content_publish`,
    `instagram_basic`, `pages_manage_posts`, `leads_retrieval` e `whatsapp_business_*`
    — todos os escopos granulares em **`<todos>` os alvos**.
  - Conta `act_2264540911014666` "Web Makers": **BRL, ativa, Mastercard *4791**, gasto
    acumulado **R$ 0,00**, **nenhuma campanha criada**.
  - IG `@webmakersbr` **business e publicável**: 273 seguidores, 15 posts,
    `content_publishing_limit` responde **0/100 nas últimas 24h** → `publish-ig` pode ir
    ao ar hoje. (A nota "não há conta IG business" em `config/calendario-organico.json`
    está **defasada**.)
  - **Pixel nunca disparou** — ver analytics acima. É o bloqueio real do Meta Ads pago,
    não a config.
  - **Carteira (Google Ads):** ATUALIZADO 2026-09-04 — a MCC `7180669384` passou a
    gerenciar **3 subcontas**: `8798605455`, `8293939752` Canaã Pallets e `6412126974`
    Contenta AI. Para elas o `login-customer-id` é obrigatório e funciona. **Falta
    vincular a própria `4296394458` Web Makers** — via MCC ela responde 403. As 3 MCCs
    vazias (`8839546299`, `1243737537`, `2354713372`) seguem para fechar.
  - **A carteira inteira gastou R$ 0,00 em 30 dias** — nenhuma campanha entregando
    impressão, incluindo as ENABLED. Sem tráfego não há o que otimizar: a prioridade
    real é pôr no ar a spec `config/google-ads/pesquisa-local.json`, que nunca foi
    lançada. Conferir com `gads-carteira`.
  - **Carteira (Meta):** o BM tem **1 conta própria e 0 contas de cliente** (sem partner access).
    No Google Ads o token enxerga **8 contas** — incluindo `8293939752` Canaã Pallets e
    `6412126974` Contenta AI — mas **a MCC `7180669384` não gerencia nenhuma delas**
    (`customer_client` retorna só ela mesma). O acesso vem das permissões diretas do
    usuário OAuth, não da MCC: frágil e não escala para operação de agência.
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
