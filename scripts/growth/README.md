# Growth Kit — fábrica de conteúdo/ads (portátil)

Motor dep-free (Node, ESM) que gera criativos com IA (estáticos, carrossel, reels),
valida por visão, e publica no **Instagram orgânico** e em **anúncios Meta** — com
**gate humano** (ads sempre criados PAUSADOS). Config-driven: o mesmo motor roda em
qualquer projeto, mudando só `config/` + `briefs/`.

## Layout

```
scripts/growth/
  factory.mjs            # CLI (pipeline)
  lib/*.mjs              # motor (Gemini, Veo, ElevenLabs, Meta, IG, R2, ffmpeg)
  config/
    brand/tokens.json    # ★ marca (fonte da verdade — cores, voz, motivo, oferta)
    brand/reference/     # imagens de referência da marca (opcional)
    brand/logo/logo-lockup.png   # logo p/ overlay nos reels
    distribution.config.json     # IDs Meta/IG/Google + landing + utm
  briefs/*.json          # briefs de criativos
  out/                   # mídia gerada (gitignored)
```

Segredos: **`.env` na raiz do repo** (`GROWTH_ENV_FILE=/abs/path` sobrescreve).

## Setup (uma vez por projeto)

1. **`.env`** na raiz do repo com as chaves que for usar:
   - `GOOGLE_AI_API_KEY` — geração/validação de imagem (Gemini). **Obrigatória.**
   - `META_ACCESS_TOKEN` — token system-user com `ads_management` + `instagram_content_publish` (Meta ads + IG).
   - `IG_ACCESS_TOKEN` — opcional; cai pra `META_ACCESS_TOKEN` se ausente.
   - `ELEVENLABS_API_KEY` — narração dos reels.
   - `R2_ENDPOINT` / `R2_BUCKET` / `R2_PUBLIC_BASE` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` — host público p/ o IG puxar imagem/vídeo (publish-ig). `R2_KEY_PREFIX` opcional (default `growth`).
   - `GADS_CLIENT_ID` / `GADS_CLIENT_SECRET` / `GADS_REFRESH_TOKEN` — Google Ads (se for usar).
2. **`config/distribution.config.json`** — troque os placeholders `SET_*`:
   - `meta.ad_account_id` (`act_...`), `meta.business_id`, `meta.page_id`, `meta.pixel_id`.
   - `instagram.ig_user_id` (id da conta IG business ligada à página).
3. **`config/brand/tokens.json`** — ajuste marca/voz/oferta (já preenchido pra este projeto).
4. (opcional) `config/brand/logo/logo-lockup.png` + `config/brand/reference/*.png`.

## Comandos

```bash
node scripts/growth/factory.mjs list
node scripts/growth/factory.mjs brief <id> [static-1x1|static-4x5|carrossel-4x5]
node scripts/growth/factory.mjs generate <id> [--dry-run] [--card=N]
node scripts/growth/factory.mjs validate <id>
node scripts/growth/factory.mjs approve <id> [--force]
node scripts/growth/factory.mjs meta-adsets
node scripts/growth/factory.mjs publish <id> --to=<adset_id>   # cria ad PAUSADO
node scripts/growth/factory.mjs activate <id>
node scripts/growth/factory.mjs publish-ig <id>                # posta no IG orgânico
```

`--dry-run` roda offline (imprime prompts, sem chamar API nem criar nada).

## Painel de ops (`/painel`)

Dashboard interno da agência (Next, `pages/painel`): **leads** (Jira projeto VEN),
**pipeline de conteúdo** (os briefs deste kit) e **status dos canais** (Meta/IG/Google).
Protegido por Basic Auth (middleware). Env extra na Vercel:

- `PANEL_USER` / `PANEL_PASSWORD` — login do painel (Basic Auth). **Obrigatório** (fail-closed).
- `JIRA_BASE_URL` (ex.: `https://suaconta.atlassian.net`), `JIRA_EMAIL`, `JIRA_TOKEN` — leitura dos leads VEN. Sem isso, o painel abre mas a lista de leads fica vazia (degrada com aviso).

Sem DB novo: os leads já vivem no Jira (mesmo lugar que o chat do site cria). O painel só lê.

## Reusar em outro projeto

Copie `scripts/growth/` inteiro pro novo repo, apague `briefs/*` e `out/*`, e reescreva
`config/brand/tokens.json` + `config/distribution.config.json`. O motor não tem nada
específico de projeto — tudo vem de `config/` + `.env`.
