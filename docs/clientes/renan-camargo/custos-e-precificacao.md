# Benchmark de Custos e Proposta de Precificação — MVP Console de Campanhas

### Web Makers · Cliente piloto: Renan Camargo · Setembro de 2026

> **Data de apuração dos preços:** 4 de setembro de 2026. Todos os preços de API e infraestrutura
> foram consultados nas páginas oficiais dos fornecedores nesta data. Onde a fonte oficial diverge
> de agregadores de terceiros, a divergência está sinalizada e a análise de sensibilidade está incluída.
>
> **Câmbio:** cotação spot USD/BRL em 4/9/2026 ≈ **R$ 5,12**. Para custo de API a análise usa uma
> **taxa efetiva de R$ 5,45/USD** — spot + ~6,5% de IOF sobre compra internacional e spread do emissor
> do cartão. Esse adicional é uma **premissa a confirmar no extrato real do cartão**, não um número
> pesquisado. Se o cartão for de uma conta global sem IOF, use R$ 5,12 e os custos caem ~6%.

---

## 0. Sumário executivo

| Métrica | Valor |
|---|---|
| Custo de 1 criativo estático | **R$ 0,29** |
| Custo de 1 carrossel (4 cards) | **R$ 1,15** |
| Custo de 1 Reel de 24s (100% sintético, Veo 3.1 fast 1080p) | **R$ 18,82** |
| Custo de 1 Reel de 24s (com footage real do cliente) | **R$ 0,51** |
| Custo fixo de plataforma (rateado) | **R$ 218/mês** |
| Preço recomendado — plano intermediário | **R$ 2.490/mês** |

**As três conclusões que mudam a decisão:**

1. **Estático e carrossel são, para efeitos práticos, gratuitos.** Custam centavos. O único custo
   variável que importa é o **vídeo gerado pelo Veo** — ele representa de 65% a 92% do custo variável em
   todos os cenários. A precificação por plano deve ser estruturada em torno de **quantos Reels
   sintéticos**, não em torno de "quantidade de posts".
2. **O custo dominante da operação não é a IA — é a hora humana.** A automação elimina a hora do
   *designer*, não a hora do *gestor de tráfego*, que não é automatizável. Qualquer proposta que
   prometa margem de 90% porque "a IA faz tudo" está errada.
3. **Para o Renan especificamente, o Veo é o insumo errado na maioria das peças.** Ele vende
   apresentação musical ao vivo. O criativo de maior conversão é o vídeo real dele tocando — que
   custa R$ 0 de geração e só consome montagem. O Veo entra em vinhetas, aberturas e b-roll de
   ambientação. Isso **derruba o custo variável dele de R$ 108 para ~R$ 54/mês**, mas exige uma
   etapa de coleta de acervo que não existe no pipeline hoje.

---

## 1. O cliente: o que o Renan vende

Levantamento a partir de https://www.orenancamargo.com.br/ (consultado em 4/9/2026):

| Dimensão | Leitura |
|---|---|
| **Produto** | Apresentação musical ao vivo em eventos — serviço prestado pessoalmente |
| **Formatos** | (a) Voz & Violão — solo, duo ou trio; (b) Banda Flash'N Pop — retrô/EuroDance anos 90; (c) Banda ReMix — casamentos e corporativo |
| **Público** | Noivos, empresas (confraternização/evento corporativo), festas privadas (aniversário, 15 anos), bares e casas noturnas, festivais |
| **Preço público** | Nenhum. Orçamento sob consulta |
| **Conversão** | 100% via **WhatsApp**, com mensagem pré-preenchida. Não há formulário de captura nem checkout |
| **Base geográfica** | Região de Monte Sião/MG e entorno, com eventos no eixo MG/SP |

### Por que isso importa para custo e preço

- **Ticket alto e ciclo longo.** Uma banda completa para casamento no interior de SP/MG opera na
  casa dos milhares de reais por evento. **1 a 2 fechamentos por mês já pagam o fee de gestão inteiro
  com folga.** Isso sustenta um fee mais alto do que o de um comércio local de ticket baixo.
- **Sazonalidade pesada.** Temporada de casamentos e o pico de novembro/dezembro (confraternizações
  corporativas). A verba de mídia deveria ser sazonal, não linear — mais peso 3 a 5 meses antes dos
  picos, porque noiva pesquisa fornecedor com 6 a 12 meses de antecedência.
- **Conversão em WhatsApp, não em formulário.** Isso é o ponto mais delicado da configuração de
  rastreamento e está detalhado no item 6.5. Sem resolver isso, não há otimização possível.
- **O criativo natural é vídeo real.** Ninguém contrata banda por imagem gerada. Contrata por ver e
  ouvir a banda tocando. Isso muda o pipeline e barateia a operação.

---

## 2. Custo unitário de produção de criativo

### 2.1 Tabela de preços apurada (fontes oficiais, 4/9/2026)

| Recurso | Preço oficial | Unidade | Fonte |
|---|---|---|---|
| Gemini 2.5 Flash Image (Nano Banana) — output | **US$ 0,039** | por imagem | [ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing) |
| Gemini 2.5 Flash Image — input | US$ 0,30 | por 1M tokens (texto/imagem) | idem |
| Gemini 2.5 Flash (texto/visão) — input | US$ 0,30 | por 1M tokens (texto/imagem/vídeo) | idem |
| Gemini 2.5 Flash — input de áudio | US$ 1,00 | por 1M tokens | idem |
| Gemini 2.5 Flash — output | US$ 2,50 | por 1M tokens | idem |
| **Veo 3.1 Fast — 1080p** | **US$ 0,12** | **por segundo de vídeo, áudio incluído** | idem |
| Veo 3.1 Fast — 720p | US$ 0,10 | por segundo | idem |
| Veo 3.1 Standard — 720p/1080p | US$ 0,40 | por segundo | idem |
| Veo 3.1 Lite — 1080p | US$ 0,08 | por segundo | idem |
| ElevenLabs TTS multilingual v2/v3 | **US$ 0,10** | por 1.000 caracteres | [elevenlabs.io/pricing/api](https://elevenlabs.io/pricing/api) |
| ElevenLabs Flash/Turbo | US$ 0,05 | por 1.000 caracteres | idem |
| Meta Marketing API | **US$ 0** | gratuita | Basic Access aprovado, 15.000 ops/dia |
| Instagram Graph API | **US$ 0** | gratuita | token system-user |
| Google Ads API | **US$ 0** | gratuita | Basic Access aprovado |
| ffmpeg (montagem) | **US$ 0** | software local | — |

**⚠️ Divergência a registrar sobre o Veo.** A página oficial do Gemini API informa **US$ 0,12/s**
para Veo 3.1 Fast em 1080p. Agregadores de terceiros (veo3gen.app, aifreeapi.com) citam **US$ 0,15/s**
para o mesmo tier. Esta análise usa o número oficial. **Sensibilidade:** se o valor real for
US$ 0,15/s, o custo do Reel de 24s sobe de R$ 18,82 para **R$ 23,00** (+22%), e o cenário
intermediário sobe de R$ 108 para R$ 129/mês. Não muda nenhuma decisão de preço. **Ação:** validar
no primeiro extrato real do Google Cloud.

**⚠️ Ponto de atenção sobre créditos ElevenLabs.** O modelo de créditos consome **1 crédito por
caractere** no multilingual v2/v3 e **0,5 crédito por caractere** no Flash/Turbo. Créditos não
utilizados acumulam por no máximo 2 meses, com teto de 3× a cota mensal — **plano superdimensionado
é dinheiro queimado**. Para o volume do MVP, o plano **Starter (US$ 6/mês, 60.000 caracteres)** é
mais do que suficiente; a análise abaixo usa o preço marginal de US$ 0,10/1k para ser conservadora.

### 2.2 Premissas de consumo do pipeline

| Premissa | Valor | Justificativa |
|---|---|---|
| Tokens de input por geração de imagem | ~2.100 | prompt de brief (~800 tok) + 1 imagem de referência de marca (~1.300 tok) |
| Tokens da validação por visão | 2.100 in / 400 out | imagem gerada + checklist técnico/policy/fidelidade → veredito JSON |
| **Taxa de retentativa (imagem)** | **25%** | fator 1,25 aplicado. Nem toda peça passa na validação de primeira |
| **Taxa de retentativa (vídeo)** | **~17%** | provisão de 1 cena refeita a cada 2 Reels = +4s em média |
| Locução PT-BR | ~15,5 caracteres/segundo | ritmo de locução publicitária. 24s ≈ 372 chars → arredondado para **400** |
| Takes de locução | 2 | ajuste de entonação/pronúncia é comum. 800 chars por Reel |
| Montagem ffmpeg em Trigger.dev | 120s em small-1x | US$ 0,0000338/s + US$ 0,25/10.000 invocações |

> **Custo escondido nº 1:** o Veo **cobra por vídeo gerado com sucesso**, e a documentação oficial
> confirma que só não há cobrança quando a geração falha tecnicamente. **Uma cena que o validador
> reprova por fidelidade de marca já foi paga.** O refugo é custo real e está provisionado acima.

### 2.3 Custo de 1 criativo estático (1x1 ou 4x5)

```
Geração da imagem
  output ...................... 1 img × US$ 0,039              = US$ 0,039000
  input ....................... 2.100 tok × US$ 0,30/1M        = US$ 0,000630
Validação por visão (Gemini 2.5 Flash)
  input ....................... 2.100 tok × US$ 0,30/1M        = US$ 0,000630
  output ...................... 400 tok × US$ 2,50/1M          = US$ 0,001000
                                                        ------------------
  Subtotal por tentativa                                        US$ 0,041260
  × 1,25 (provisão de retentativa)                              US$ 0,051575
Brief/copy rateado (Gemini 2.5 Flash texto)                     US$ 0,001500
Hospedagem R2                                                   US$ 0,000000  (dentro do free tier)
Publicação Instagram Graph API                                  US$ 0,000000  (API gratuita)
                                                        ==================
  TOTAL                                                         US$ 0,053075
```

**→ R$ 0,29 por estático** (× R$ 5,45)

### 2.4 Custo de 1 carrossel de 4 cards

```
Geração das imagens
  output ...................... 4 img × US$ 0,039              = US$ 0,156000
  input ....................... 4 × 2.100 tok × US$ 0,30/1M    = US$ 0,002520
Validação por visão
  input ....................... 4 × 2.100 tok × US$ 0,30/1M    = US$ 0,002520
  output ...................... 4 × 400 tok × US$ 2,50/1M      = US$ 0,004000
                                                        ------------------
  Subtotal por tentativa                                        US$ 0,165040
  × 1,25 (provisão de retentativa)                              US$ 0,206300
Roteiro do carrossel (narrativa card a card)
  input ....................... 2.500 tok × US$ 0,30/1M        = US$ 0,000750
  output ...................... 1.800 tok × US$ 2,50/1M        = US$ 0,004500
                                                        ==================
  TOTAL                                                         US$ 0,211550
```

**→ R$ 1,15 por carrossel de 4 cards** (R$ 0,29 por card)

### 2.5 Custo de 1 Reel de ~24s (3 cenas de 8s)

```
Vídeo — Veo 3.1 Fast, 1080p, 9:16, áudio incluído
  3 cenas × 8s = 24s × US$ 0,12/s                              = US$ 2,880000
  provisão de refação (0,5 cena = 4s × US$ 0,12/s)             = US$ 0,480000
                                                        ------------------
  Subtotal vídeo                                                US$ 3,360000
Narração — ElevenLabs multilingual v3, PT-BR
  400 chars × 2 takes = 800 chars × US$ 0,10/1.000             = US$ 0,080000
Validação do vídeo montado — Gemini 2.5 Flash visão
  vídeo 24s × ~263 tok/s = 6.312 tok × US$ 0,30/1M             = US$ 0,001894
  áudio 24s × ~32 tok/s = 768 tok × US$ 1,00/1M                = US$ 0,000768
  output veredito 500 tok × US$ 2,50/1M                        = US$ 0,001250
                                                        ------------------
  Subtotal validação                                            US$ 0,003912
Roteiro e storyboard das 3 cenas
  input 3.000 tok × US$ 0,30/1M                                = US$ 0,000900
  output 2.200 tok × US$ 2,50/1M                               = US$ 0,005500
Montagem ffmpeg em Trigger.dev (small-1x, 120s)
  120s × US$ 0,0000338/s + invocação US$ 0,000025              = US$ 0,004081
Trilha, ducking, normalização -14 LUFS, texto queimado          US$ 0,000000  (ffmpeg local)
Hospedagem R2 (~15 MB)                                          US$ 0,000000  (free tier)
                                                        ==================
  TOTAL                                                         US$ 3,454393
```

**→ R$ 18,82 por Reel sintético de 24s**

### 2.6 Alavancas de otimização do custo do Reel

O Reel é o único item que move a agulha. Estas são as alavancas reais:

| Variante | Cálculo do vídeo | Custo total | vs. base |
|---|---|---|---|
| **Base — Veo 3.1 Fast 1080p, com refação** | 28s × US$ 0,12 | **R$ 18,82** | — |
| Veo 3.1 Fast 1080p, sem refação (1 take VO) | 24s × US$ 0,12 | R$ 15,99 | −15% |
| **Veo 3.1 Fast 720p** (o Instagram recomprime de qualquer jeito) | 28s × US$ 0,10 | **R$ 15,77** | **−16%** |
| Veo 3.1 Lite 1080p | 28s × US$ 0,08 | R$ 12,72 | −32% |
| Reel de 16s (2 cenas) em vez de 24s | 18s × US$ 0,12 | R$ 12,29 | −35% |
| Locução com Flash/Turbo em vez de v3 | — | R$ 18,60 | −1% |
| **Reel com footage real do cliente** (só VO + montagem) | US$ 0 | **R$ 0,51** | **−97%** |
| Veo 3.1 **Standard** 1080p (qualidade máxima) | 28s × US$ 0,40 | R$ 61,60 | +227% |

**Recomendação operacional:** padronizar em **Veo 3.1 Fast 720p** para peças orgânicas
(economia de 16% sem perda perceptível após a recompressão do Instagram) e reservar 1080p para
criativos de anúncio, onde a qualidade do primeiro frame afeta o CTR. **Nunca usar Veo Standard**
no MVP — 3,3× o custo por um ganho que o feed do Instagram apaga.

### 2.7 A variante que mais importa para o Renan: Reel com footage real

```
Vídeo ..................... acervo do cliente (show gravado)   = US$ 0,000000
Narração/legendagem ....... 800 chars × US$ 0,10/1.000         = US$ 0,080000
Validação do montado ...... (mesmo cálculo do item 2.5)        = US$ 0,003912
Roteiro de corte .......... 3.000 in + 2.200 out               = US$ 0,006400
Montagem ffmpeg ........... 120s em small-1x                   = US$ 0,004081
                                                        ==================
  TOTAL                                                         US$ 0,094393
```

**→ R$ 0,51 por Reel com footage real**

Isto é 37× mais barato que o Reel sintético. Para um músico, é também **o criativo de maior
conversão** — prova social em vídeo não se substitui por render. A implicação prática está na
seção 6, item 10: a coleta de acervo é uma etapa obrigatória do onboarding, não um "nice to have".

---

## 3. Custo mensal de infraestrutura

### 3.1 Preços apurados e gatilhos de upgrade (4/9/2026)

| Serviço | Free tier | O que força o upgrade | Plano pago |
|---|---|---|---|
| **Vercel** | Hobby: 1M edge requests, 100 GB transfer, 1M invocations, 4h Fluid CPU | ⚠️ **Uso comercial é proibido no Hobby.** O upgrade é obrigatório desde o dia 1, não por volume | **Pro US$ 20/mês por seat**, com US$ 20 de crédito mensal. Overage: US$ 0,15/GB de transfer acima de 1 TB; US$ 2/1M edge requests acima de 10M |
| **Neon** | 0,5 GB storage/projeto, 100 CU-hours/projeto, 5 GB egress | Qualquer um dos três limites. ⚠️ **Ao estourar, o compute é suspenso até o mês seguinte** — o console para no meio do mês | Launch (pay-as-you-go, sem mínimo): **US$ 0,106/CU-hora + US$ 0,35/GB-mês** de storage; egress US$ 0,10/GB acima de 500 GB |
| **Trigger.dev** | US$ 5 de créditos/mês, 20 runs concorrentes, **1 dia de retenção de log** | Os US$ 5 acabam; e 1 dia de log é inviável para debugar produção | **Hobby US$ 10/mês** (inclui US$ 10 de créditos, 50 concorrentes, 7 dias de log). Pro US$ 50/mês (200 concorrentes, 30 dias). Compute cobrado por segundo: small-1x US$ 0,0000338/s; large-2x US$ 0,00068/s. Invocação US$ 0,25/10.000 runs |
| **Cloudflare R2** | 10 GB storage, 1M Class A ops, 10M Class B ops, **egress ilimitado e gratuito** | ~10 GB de mídia acumulada (≈ 650 Reels de 15 MB) | US$ 0,015/GB-mês (Standard); Class A US$ 4,50/M; Class B US$ 0,36/M |
| **Clerk** | **50.000 MRU** (monthly retained users) | Praticamente nunca, no modelo de console de agência | Pro US$ 25/mês (US$ 20 anual). Add-on B2B/organizations US$ 100/mês |
| **Resend** | 3.000 e-mails/mês, **100/dia**, 3 domínios | O limite de 100/dia, se houver disparo em lote | Pro US$ 20/mês (50k e-mails). Overage US$ 0,90/1.000 |

### 3.2 Custo fixo de plataforma (rateado entre clientes)

| Item | USD/mês | BRL/mês | Nota |
|---|---|---|---|
| Vercel Pro (1 seat) | 20,00 | 109,00 | **Obrigatório** — Hobby não permite uso comercial |
| Trigger.dev Hobby | 10,00 | 54,50 | Free é inviável: 1 dia de retenção de log |
| Neon Launch (uso baixo estimado) | ~10,00 | 54,50 | ~60 CU-h + ~5 GB. Free suspenderia o console |
| Cloudflare R2 | 0,00 | 0,00 | Dentro do free tier até ~650 Reels acumulados |
| Clerk | 0,00 | 0,00 | Free até 50k MRU — folga enorme |
| Resend | 0,00 | 0,00 | Free até 3k e-mails/mês |
| **Total** | **~US$ 40** | **~R$ 218/mês** | |

**Rateio:** R$ 218 ÷ nº de clientes.
- 1 cliente (situação atual): **R$ 218/cliente**
- 5 clientes: **R$ 44/cliente**
- 10 clientes: **R$ 22/cliente**
- 20 clientes: **R$ 11/cliente** (mas aqui provavelmente já há Trigger.dev Pro e Neon maior → ~R$ 350 total → R$ 18/cliente)

**Este é o argumento econômico para escalar a base.** Com 1 cliente, a plataforma custa 2× o que
custa a API inteira. Com 5, vira ruído.

### 3.3 Custo marginal de infraestrutura por cliente

| Item | Estimativa/cliente/mês |
|---|---|
| R2 — armazenamento incremental (~1 GB de mídia/mês) | R$ 0,08 (e zero enquanto no free tier) |
| Neon — CU-hours dos jobs desse cliente | R$ 3 a 8 |
| Trigger.dev — compute de montagem (já contabilizado no custo por Reel) | — |
| Resend — e-mails transacionais (relatórios, aprovações) | R$ 0 |
| **Total marginal** | **R$ 5 a 12/cliente/mês** |

### 3.4 Custos escondidos — a lista honesta

1. **Vercel Hobby é proibido para uso comercial.** Não há como "começar de graça". US$ 20/mês é
   custo de entrada, não opcional.
2. **Neon Free suspende o compute ao estourar qualquer limite.** Não degrada — para. O console do
   cliente fica fora do ar até o dia 1 do mês seguinte. Inaceitável em produção.
3. **Trigger.dev Free retém log por 1 dia.** O job que falhou ontem à noite é indebugável hoje de
   manhã. O upgrade para Hobby é técnico, não de volume.
4. **O Veo cobra pelo refugo.** Cena reprovada na validação de fidelidade já foi paga. A provisão
   de 17% na análise é uma estimativa; se o prompt de marca for mal calibrado no início, a taxa
   real pode passar de 40% nos primeiros meses.
5. **Créditos ElevenLabs expiram em 2 meses** com teto de 3× a cota. Assinar Pro (US$ 99) para um
   volume de Starter (US$ 6) queima ~R$ 500/mês em crédito que evapora.
6. **IOF + spread do cartão internacional.** Todos os fornecedores cobram em USD. O adicional de
   ~6,5% aplicado aqui é premissa — confirmar no extrato.
7. **Cold start.** Serverless na Vercel + Neon com autosuspend: o primeiro request depois de
   ociosidade paga latência de wake-up do Postgres. Não é custo em R$, é custo em experiência do
   operador. Mitigável com Neon sem autosuspend — que aí custa CU-hora contínua.
8. **Egress do R2 ser gratuito é uma vantagem estrutural, não um detalhe.** O Instagram puxa cada
   imagem e vídeo por URL pública, e um Reel de 15 MB puxado repetidamente pelo CDN da Meta geraria
   custo real em S3 (US$ 0,09/GB). **Manter tudo no R2 é decisão de arquitetura com impacto direto
   no custo.**
9. **Trigger.dev com máquina maior.** Montagem de vídeo é CPU-intensiva. Se a small-1x se mostrar
   lenta e for preciso migrar para large-2x, o custo de montagem sobe 20× (US$ 0,0041 → US$ 0,082
   por Reel). Ainda é pequeno em absoluto, mas monitorar.

---

## 4. Custo total por cliente/mês

### 4.1 Três cenários de volume

| | **A — Essencial** | **B — Crescimento** | **C — Performance** |
|---|---|---|---|
| Estáticos orgânicos | 6 | 6 | 10 |
| Carrosséis | 2 | 3 | 4 |
| Reels orgânicos | 1 | 3 | 10 |
| Criativos de ads (estáticos) | 4 | 4 | 4 |
| Criativos de ads (Reels) | 0 | 2 | 2 |
| **Total de peças/mês** | **13** | **18** | **30** |

### 4.2 Custo de API por cenário

**Cenário A — Essencial**
```
10 estáticos × R$ 0,29 ........................ R$   2,90
 2 carrosséis × R$ 1,15 ....................... R$   2,30
 1 Reel × R$ 18,82 ............................ R$  18,82
                                          ---------------
Subtotal API                                    R$  24,02
Infra marginal                                  R$   5,00
                                          ===============
TOTAL VARIÁVEL                                  R$  29,02
```

**Cenário B — Crescimento**
```
10 estáticos × R$ 0,29 ........................ R$   2,90
 3 carrosséis × R$ 1,15 ....................... R$   3,45
 5 Reels × R$ 18,82 ........................... R$  94,10
                                          ---------------
Subtotal API                                    R$ 100,45
Infra marginal                                  R$   8,00
                                          ===============
TOTAL VARIÁVEL                                  R$ 108,45
```

**Cenário C — Performance**
```
14 estáticos × R$ 0,29 ........................ R$   4,06
 4 carrosséis × R$ 1,15 ....................... R$   4,60
12 Reels × R$ 18,82 ........................... R$ 225,84
                                          ---------------
Subtotal API                                    R$ 234,50
Infra marginal                                  R$  12,00
                                          ===============
TOTAL VARIÁVEL                                  R$ 246,50
```

> **Note a distribuição:** os Reels são **65%** do custo no cenário A, **87%** no B e **92%** no C.
> Estáticos e carrosséis somados nunca passam de R$ 9/mês. **A quantidade de posts não é a variável
> de custo. A quantidade de segundos de Veo é.**

**Variante Renan** — cenário B com 3 dos 5 Reels usando footage real de show:
```
10 estáticos + 3 carrosséis ................... R$   6,35
 2 Reels sintéticos × R$ 18,82 ................ R$  37,64
 3 Reels com footage × R$ 0,51 ................ R$   1,53
Infra marginal                                  R$   8,00
                                          ===============
TOTAL VARIÁVEL                                  R$  53,52   (−51% vs. cenário B padrão)
```

### 4.3 Composição do custo — o que domina

> A memória de cálculo de horas de operação, custo-hora interno, custo de entrega e margem por
> plano fica em `custos-e-precificacao-INTERNO.md`, **fora do versionamento** (ver `.gitignore`).

O que importa para qualquer decisão tomada a partir deste documento: **o custo dominante não é a
IA, é a hora humana de gestão de tráfego** — ela não é automatizável e responde pela maior parte
do custo em todos os cenários. Por isso os planos são diferenciados por **número de Reels**, que é
a única variável de custo de API que pesa.

---

## 5. Benchmark de mercado brasileiro

### 5.1 Fee mensal de gestão de tráfego pago

**Fonte: Cubo Suite** — "Quanto cobrar por gestão de tráfego: Meta e Google Ads em 2026"
(publicado 25/07/2026, atualizado 06/08/2026)
[blog.cubosuite.com.br](https://blog.cubosuite.com.br/quanto-cobrar-por-gestao-de-trafego-meta-e-google-ads-em-2026/)

| Perfil | Faixa mensal | Observação da fonte |
|---|---|---|
| Freelancer iniciante | R$ 1.500 – 2.000 | dificuldade de manter qualidade abaixo de R$ 2.000 |
| Freelancer experiente | R$ 2.000 – 7.000 | volume limitado, geralmente uma plataforma |
| Agência pequena (PME) | R$ 1.500 – 8.000 | até 3 plataformas; projetos complexos acima de R$ 15.000 |
| Agência estruturada | R$ 8.000+ | pode superar R$ 20.000/mês |

**Fonte: WiseData Marketing** — "Quanto Custa Gestão de Tráfego Pago em 2026"
(publicado 05/02/2026)
[blog.wisedatamarketing.com](https://blog.wisedatamarketing.com/marketing-digital/custo-gestao-trafego-pago/)

| Faixa | Fee mensal | Verba de mídia típica | Perfil |
|---|---|---|---|
| Básica | R$ 1.500 – 3.000 | até R$ 10.000 | PMEs, negócios locais, startups |
| Intermediária | R$ 3.000 – 8.000 | R$ 10.000 – 50.000 | empresas médias em crescimento |
| Premium | R$ 8.000 – 20.000 | R$ 50.000+ | grandes empresas, e-commerces |

Por plataforma (setup + gestão): Google Ads Search R$ 1.500–10.000/mês; Meta Ads R$ 1.500–12.000/mês;
TikTok Ads R$ 2.000–10.000/mês.

**Fonte: pesquisa própria Web Makers** — `docs/pesquisa-mercado-mogi-guacu.md` (julho/2026)

Benchmarks regionais (DDD 19) sustentam **fee de marketing de R$ 1.500–3.500/mês para agências
entrantes**; SEO local R$ 750–1.500/mês; manutenção de site R$ 150–600/mês. Nenhum dos 5
concorrentes diretos mapeados publica preço — **preço transparente é, por si só, um diferencial de
conversão na região.**

### 5.2 Modelos de cobrança praticados

| Modelo | Prática de mercado | Fonte |
|---|---|---|
| **Fee fixo mensal** | **65–70% das agências brasileiras.** R$ 1.500–8.000 para PMEs | Cubo Suite, 08/2026 |
| **% sobre a verba de mídia** | **10–20%** para verbas médias/altas; **20–30% ou fee mínimo** para verbas até R$ 10.000/mês | Cubo Suite, 08/2026 |
| **Híbrido (fee menor + performance)** | fee fixo reduzido + **5–10%** sobre a verba. Crescente entre agências focadas em retenção | Cubo Suite, 08/2026 |
| **Performance/CPA puro** | Modelo minoritário e de maior risco | WiseData, 02/2026 |

**Regra de proporção citada pelas duas fontes:** *verba de mídia = 2× a 5× o fee de gestão*.
Investimento mínimo recomendado para resultado consistente: **R$ 2.000–5.000/mês por plataforma**.

**Consenso universal nas fontes:** o fee da agência é **sempre separado** da verba de mídia. A verba
não é receita da agência.

### 5.3 Produção de criativo cobrada separadamente

| Item | Faixa de mercado 2026 | Fonte |
|---|---|---|
| Designer gráfico freelancer (hora) | R$ 50 – 200/h | [freelans.com.br](https://freelans.com.br/blog/quanto-custa-designer-grafico-freelancer) |
| Social media — pacote mensal | R$ 800 – 10.000/mês | [brfreelas.com.br](https://brfreelas.com.br/blog/quanto-cobrar-como-freelancer-em-2026-tabela-de-precos-atualizada/) |
| Post individual de Instagram | R$ 10 – 100 por peça | idem |
| Identidade visual completa | R$ 1.500 – 10.000 (projeto) | freelans.com.br |

**O achado central do benchmark:** a Cubo Suite registra que o **fee básico de mercado inclui
apenas 1 a 2 criativos/mês**, e que pacotes expandidos — vídeo, motion, testes A/B contínuos — são
**cobrados à parte**.

### 5.4 A arbitragem da Web Makers, quantificada

| | Mercado tradicional | Web Makers com Growth Kit |
|---|---|---|
| Criativos inclusos no fee básico | **1 a 2/mês** | **18 a 30/mês** |
| Custo marginal do 3º criativo | R$ 50–150 (designer) | **R$ 0,29** (estático) |
| Custo marginal do 1º Reel | R$ 300–800 (produtora/motion) | **R$ 18,82** — ou **R$ 0,51** com footage |
| Tempo de entrega de um criativo | 2 a 5 dias úteis (briefing → revisão) | minutos, com curadoria humana no fim |
| Capacidade de teste A/B de criativo | limitada pelo orçamento de produção | limitada só pelo julgamento do operador |

**Este é o diferencial real e defensável:** não é "somos mais baratos", é **"testamos 20 criativos
por mês onde a concorrência testa 2"**. Em tráfego pago, volume de teste criativo é o principal
driver de queda de CPA. **O argumento comercial não deve ser preço — deve ser cadência de teste.**

---

## 6. Proposta de precificação

### 6.1 Princípios adotados

1. **Fee fixo mensal**, alinhado aos 65–70% do mercado. Previsibilidade para ambos os lados e não
   cria o incentivo perverso do % sobre verba (agência ganha mais gastando mais do cliente).
2. **Verba de mídia sempre separada e sempre no cartão do cliente** (justificativa no item 7.4).
3. **Planos diferenciados pelo número de Reels**, porque é a única variável de custo relevante.
4. **Margem sustentável e defensável.** Não prometemos 90% — a hora de gestão de tráfego não é
   automatizável e responde pela maior parte do custo.
5. **Setup cobrado ou compensado por contrato mínimo**, porque as 16h de onboarding são reais.

### 6.2 Os três planos

---

#### 🎵 **Plano Essencial — "Agenda"** · R$ 1.490/mês

*Para quem quer presença constante e um fluxo previsível de contatos.*

| Escopo | |
|---|---|
| Plataformas | Meta Ads (Instagram + Facebook) |
| Conteúdo orgânico | 6 estáticos + 2 carrosséis + 1 Reel/mês |
| Criativos de anúncio | 4/mês |
| Otimização | 1 revisão semanal de campanha |
| Relatório | Mensal, com call de 30 min |
| Verba de mídia sugerida (do cliente) | R$ 1.500 – 3.000/mês |

---

#### 🎸 **Plano Crescimento — "Temporada"** · R$ 2.490/mês  ← **recomendado para o Renan**

*Para quem quer ocupar a agenda inteira e disputar as datas de alta temporada.*

| Escopo | |
|---|---|
| Plataformas | **Meta Ads + Google Ads** (Search + Performance Max) |
| Conteúdo orgânico | 6 estáticos + 3 carrosséis + **3 Reels**/mês |
| Criativos de anúncio | **6/mês, incluindo 2 em vídeo** |
| Otimização | 2 revisões semanais + ajuste sazonal de verba |
| Relatório | Quinzenal, com call mensal de 1h |
| Extra | Estruturação de remarketing e públicos semelhantes |
| Verba de mídia sugerida (do cliente) | R$ 3.000 – 6.000/mês |

---

#### 🎤 **Plano Performance — "Palco"** · R$ 3.900/mês

*Para operação de alta cadência com teste criativo contínuo.*

| Escopo | |
|---|---|
| Plataformas | Meta + Google + remarketing multicanal |
| Conteúdo orgânico | 10 estáticos + 4 carrosséis + **10 Reels**/mês |
| Criativos de anúncio | **6/mês** com teste A/B contínuo de criativo |
| Otimização | Acompanhamento contínuo, ajuste de lance e verba |
| Relatório | Semanal + dashboard de leads |
| Extra | Landing page dedicada + organização dos leads de WhatsApp |
| Verba de mídia sugerida (do cliente) | R$ 6.000+/mês |

---

**Setup inicial (cobrança única): R$ 1.490**
Cobre as 12–25h de onboarding: configuração de contas, pixel, tag de conversão, GA4, estruturação
de campanhas, brief de marca e calibração do pipeline.
*Alternativa comercial:* **isento mediante contrato de 6 meses**, que dilui o custo de
onboarding ao longo do contrato.

### 6.3 Posicionamento contra o benchmark

| Plano | Preço | Faixa de mercado equivalente | Posição |
|---|---|---|---|
| Essencial R$ 1.490 | R$ 1.490 | Freelancer iniciante / Básica (R$ 1.500–3.000) | **Piso do mercado, com 13 peças/mês em vez de 2** |
| Crescimento R$ 2.490 | R$ 2.490 | Básica–Intermediária (R$ 1.500–3.000 / 3.000–8.000) | **Meio da faixa básica, entregando escopo de faixa intermediária** |
| Performance R$ 3.900 | R$ 3.900 | Intermediária (R$ 3.000–8.000) | **Terço inferior, com 30 peças/mês** |

Todos os três estão **dentro** da faixa de mercado — não abaixo. **A automação não deve ser usada
para baixar preço; deve ser usada para entregar 10× mais criativo pelo mesmo preço.** Baixar preço
destrói a margem e sinaliza commodity; aumentar entrega cria diferencial defensável.

### 6.4 Recomendação específica para o Renan (primeiro cliente do MVP)

O Renan é o cliente-zero: ele valida o produto, tolera iteração de processo e vira o case de
lançamento. Isso tem valor real e justifica um desconto — **mas não um desconto que zere a margem.**

| Opção | Preço | Avaliação |
|---|---|---|
| Preço cheio Crescimento | R$ 2.490 | Saudável, mas difícil de vender sem case |
| **Preço de fundador (recomendado)** | **R$ 1.690** | **Margem positiva, preço vendável, case garantido** |
| Fundador agressivo | R$ 1.490 | Margem fina demais; um mês ruim vira prejuízo |
| "Só pra testar" | R$ 990 | ❌ Prejuízo direto. Nunca |

**Recomendação: R$ 1.690/mês pelos primeiros 3 meses**, com escopo integral do plano Crescimento,
em troca de:
- autorização escrita de uso como **case público** (números, prints, depoimento);
- **compromisso de 6 meses** de contrato;
- tolerância explícita a iteração do processo nos 60 primeiros dias;
- **entrega do acervo de vídeo** (shows gravados) — que é o insumo que barateia a operação dele.

A partir do 4º mês: **R$ 2.490/mês** (tabela cheia), com o reajuste já previsto em contrato desde a
assinatura. Setup: **isento**, compensado pelo contrato de 6 meses.

**Ponto de equilíbrio do modelo:** o preço de fundador só se sustenta enquanto o Renan for o
único cliente da base — a partir de 3 a 5 clientes o rateio de plataforma muda a conta a favor.
Motivo adicional para tratar o preço de fundador como aquisição de case, não como preço-padrão.

### 6.5 O que é fee da Web Makers e o que é verba de mídia

> **Esta separação precisa estar explícita no contrato e repetida na primeira reunião.**

| | **Fee da Web Makers** | **Verba de mídia** |
|---|---|---|
| **O que é** | Remuneração pelo serviço: estratégia, produção de criativo, configuração, gestão, otimização, relatório | Dinheiro que compra as impressões e cliques |
| **Para onde vai** | Conta da Web Makers | **Direto para Meta e Google.** Não passa pela agência |
| **Quem paga** | Cliente → Web Makers | Cliente → Meta/Google (**cartão no nome do cliente**) |
| **Valor** | R$ 1.490 / R$ 2.490 / R$ 3.900 por mês | Definido pelo cliente. Sugestão: 2× a 5× o fee |
| **Quem controla** | Web Makers executa | **Cliente é o titular da conta e vê tudo** |
| **Nota fiscal** | Emitida pela Web Makers | Recibo emitido por Meta/Google ao cliente |

**Por que a verba não passa pela agência:**
1. **Tributação.** Verba passando pela conta da agência vira receita bruta tributável sem ser
   margem. Em Simples Nacional, R$ 5.000/mês de verba repassada podem gerar imposto sobre dinheiro
   que não é lucro.
2. **Risco de crédito.** A agência viraria financiadora do cliente, adiantando mídia antes do
   recebimento.
3. **Transparência.** O cliente vê o gasto real no painel dele. Elimina a suspeita de markup oculto,
   que é o principal atrito comercial em agências de tráfego.
4. **Titularidade dos ativos.** A conta de anúncios, o pixel e o histórico de aprendizado do
   algoritmo ficam com o cliente. É o correto e é vendável como argumento de confiança.

**Exemplo para o Renan (plano Crescimento, preço de fundador):**
```
Web Makers (nota fiscal, serviço) ............. R$ 1.690/mês
Meta Ads (cartão do Renan) .................... R$ 2.500/mês
Google Ads (cartão do Renan) .................. R$ 1.500/mês
                                          ----------------
Desembolso total do Renan ..................... R$ 5.690/mês
Receita da Web Makers ......................... R$ 1.690/mês
```

---

## 7. Checklist: o que precisamos do Renan

Ordenado por **grau de bloqueio**. Os itens 1 a 6 são bloqueantes absolutos — nada roda sem eles.

### 🔴 Bloqueantes — nada funciona sem

---

**1. Instagram convertido para conta Business ou Creator, vinculado a uma Página do Facebook**

- **Por que:** a Instagram Graph API só publica em contas Business/Creator vinculadas a uma Página.
  É requisito da própria API, não escolha nossa.
- **O que quebra se faltar:** **o pipeline inteiro de publicação orgânica não existe.** O token
  system-user não consegue nem listar a conta. Zero posts automáticos. Todo o Growth Kit vira uma
  ferramenta de gerar arquivo para publicar na mão.
- **Como fazer:** app do Instagram → Configurações → Conta → Mudar para conta profissional →
  vincular à Página do Facebook do Renan (criar se não existir).

---

**2. Partner access da Página do Facebook para o BM da Web Makers**

- **Por que:** o Business Manager **"WM Corp" (ID 1635704286973645)** precisa de acesso de parceiro
  à Página para associar criativos e publicar como a marca.
- **O que quebra se faltar:** não conseguimos criar anúncios que apareçam com a identidade do
  Renan; o ad creative é rejeitado por falta de vínculo entre página e conta de anúncios.
- **Como fazer:** Meta Business Suite → Configurações do negócio → Páginas → selecionar a Página →
  Parceiros → **Atribuir parceiro** → informar o ID **1635704286973645** → conceder acesso total.
- ⚠️ **Usar partner access, nunca "adicionar pessoa".** Partner access sobrevive à troca de equipe
  e mantém a titularidade com o Renan. Acesso pessoal por login é frágil e não é auditável.

---

**3. Partner access da conta de anúncios do Meta**

- **Por que:** é onde a Marketing API cria campanhas, conjuntos e anúncios.
- **O que quebra se faltar:** nenhuma campanha pode ser criada. O pipeline de ads para no primeiro
  passo — nem o upload de imagem funciona.
- **Como fazer:** mesmo caminho do item 2, em Contas de anúncios. Se o Renan não tiver conta,
  criar uma **no BM dele**, não no nosso.
- **Nota:** nosso fluxo cria o anúncio **PAUSADO**. Nada vai ao ar sem aprovação humana explícita.
  Vale dizer isso ao cliente — reduz muito a ansiedade de conceder acesso.

---

**4. Método de pagamento ativo na conta de anúncios Meta — no nome do Renan**

- **Por que:** sem cartão válido a conta não veicula, mesmo com campanha aprovada.
- **O que quebra se faltar:** campanhas ficam com status "Conta com problema de pagamento". Silêncio
  total, sem erro óbvio na API — é o tipo de falha que consome um dia de diagnóstico.
- **Decisão recomendada: cartão no nome do Renan, na conta dele.** Justificativas completas no item
  6.5. Risco a mitigar: cartão recusado ou limite estourado derruba a campanha sem aviso →
  **configurar alerta de limite de gasto da conta e checar no ritual semanal.**

---

**5. 🎯 Definição do evento de conversão — O ITEM MAIS CRÍTICO DE TODOS**

- **Por que:** os algoritmos de Meta e Google só otimizam para o que conseguem medir. Sem sinal de
  conversão, a entrega é otimizada para cliques ou alcance — métricas que **não guardam relação
  com contratar um show.**
- **O que quebra se faltar:** **tudo, silenciosamente.** As campanhas rodam, gastam a verba,
  entregam impressões, geram relatórios bonitos — e não trazem contrato. Não há erro; há
  desperdício. É a forma mais cara de falhar, porque parece que está funcionando.
- **O desafio específico do Renan:** ele converte **por WhatsApp**, sem formulário e sem checkout.
  Isso exige decisão explícita antes de qualquer campanha subir. As opções:

  | Opção | Como | Qualidade do sinal | Recomendação |
  |---|---|---|---|
  | **Clique no botão de WhatsApp no site** | Evento `Contact` no Pixel, disparado no clique | Média — mede intenção, não conversa | ✅ **Baseline obrigatório** |
  | **Campanha "Click to WhatsApp" da Meta** | Meta conta a conversa iniciada nativamente | Boa — mede conversa real | ✅ **Recomendado para o canal principal** |
  | **Lead qualificado via WhatsApp Business API + Conversions API** | Renan marca o lead como qualificado; evento offline sobe para a Meta | **Ótima — otimiza por lead que presta** | ⭐ **Meta do 2º/3º mês** |
  | **Contrato fechado (conversão offline)** | Upload de conversões offline com valor do cachê | Excelente, mas volume baixo demais | ⚠️ Volume insuficiente para o algoritmo aprender |

- **Recomendação:** **começar com `Contact` no clique de WhatsApp + campanha Click-to-WhatsApp**, e
  evoluir para lead qualificado via Conversions API no segundo mês. Definir isso **na reunião de
  onboarding, por escrito, antes de subir a primeira campanha.**
- ⚠️ **Volume mínimo:** a Meta precisa de ~50 conversões por conjunto de anúncios por semana para
  sair da fase de aprendizado. Com ticket alto e volume baixo, **é provável que o evento de
  otimização precise ser o contato (volume alto), não o contrato (volume baixo).** Alinhar essa
  expectativa com o cliente evita a conversa desconfortável do mês 2.

---

**6. Pixel da Meta instalado no site**

- **Por que:** é a fonte do sinal de conversão e do público de remarketing.
- **O que quebra se faltar:** sem otimização por conversão, sem remarketing para quem visitou a
  página de casamentos, sem públicos semelhantes. A campanha fica cega e cara.
- **Como fazer:** instalar o pixel no `<head>` de https://www.orenancamargo.com.br/ + eventos
  customizados nos cliques de WhatsApp de cada formato (Voz&Violão / Flash'N Pop / ReMix) —
  **isso permite saber qual formato converte melhor e realocar verba.**
- **Recomendação técnica adicional:** implementar também a **Conversions API** (server-side), não
  só o pixel de browser. Bloqueadores de anúncio e ITS/ITP do Safari derrubam 20–40% dos eventos
  só de pixel. Custo: algumas horas de setup. Retorno: sinal muito mais confiável.

---

### 🟡 Bloqueantes do canal Google

---

**7. Aceite do convite de vínculo à MCC da Web Makers — ID `718-066-9384`**

- **Por que:** dá acesso gerenciado à conta do Google Ads via API (leitura GAQL e mutações de status
  e conversão).
- **O que quebra se faltar:** nenhuma leitura de performance, nenhuma otimização automatizada no
  Google. O canal Google simplesmente não entra na operação.
- **Como fazer:** enviamos o convite → Renan aceita em Google Ads → Ferramentas → Acesso e
  segurança → Gerenciadores. Se não tiver conta, criar **no e-mail dele**, aceitar o convite depois.
- **Nota:** o vínculo MCC mantém a titularidade com o Renan. Ele pode desvincular a qualquer momento.

---

**8. Tag de conversão do Google Ads instalada no site**

- **Por que:** mesma lógica do pixel, do lado do Google. Sem ela, Performance Max e lances
  inteligentes não têm o que otimizar.
- **O que quebra se faltar:** o Performance Max fica inutilizável (ele **exige** sinal de conversão
  para funcionar) e as campanhas de Search caem em CPC manual — pior desempenho, mais trabalho.
- **Como fazer:** instalar a tag global + conversão de clique em WhatsApp. Idealmente via **Google
  Tag Manager**, que centraliza pixel + tag + GA4 num container só e reduz o retrabalho.

---

### 🟢 Importantes — não bloqueiam, mas degradam a operação

---

**9. Acesso ao GA4 — adicionar nossa service account como leitor**

- **Por que:** permite cruzar o dado de mídia com o comportamento no site (páginas vistas, tempo,
  jornada até o clique de WhatsApp).
- **O que quebra se faltar:** perdemos a visão de funil. Sabemos que houve clique, mas não o que a
  pessoa viu antes. Otimização de criativo fica no achismo.
- **Como fazer:** GA4 → Administrador → Gerenciamento de acesso à propriedade → adicionar o e-mail
  da service account com papel **Leitor**. Se não houver GA4 instalado, instalar — é gratuito.

---

**10. 🎥 Acervo de vídeo e material de marca**

- **Por que:** este é o item de **maior impacto econômico** do checklist. Vídeo real de show reduz o
  custo de produção de Reel de **R$ 18,82 para R$ 0,51** (−97%) **e** converte melhor — ninguém
  contrata banda sem ver e ouvir a banda.
- **O que quebra se faltar:** produzimos 100% em Veo, o custo variável dobra, e — mais grave — o
  criativo perde a prova social que é o principal argumento de venda de um músico. **Um render
  bonito de IA vende menos que um vídeo tremido de casamento real com a pista cheia.**
- **O que pedir, em ordem de prioridade:**
  1. Vídeos de shows (mesmo de celular): pista cheia, noivos dançando, público cantando junto
  2. Registro de cada um dos 3 formatos (Voz&Violão, Flash'N Pop, ReMix)
  3. Fotos em alta resolução do Renan e das bandas
  4. Logotipo em vetor, paleta de cores, tipografia
  5. Repertório / setlist por formato
  6. **Depoimentos de noivos e contratantes** (texto, áudio ou vídeo — vídeo vale por dez)
- ⚠️ **Direitos de imagem e uso de obra musical.** Vídeo de casamento tem convidados identificáveis
  e execução de música de terceiros. Confirmar autorização de uso antes de veicular como anúncio —
  o Instagram derruba áudio por copyright e a Meta reprova criativo com pessoa identificável sem
  consentimento.

---

**11. Informações comerciais da oferta**

- **Por que:** alimentam o brief que gera o criativo e definem a segmentação geográfica.
- **O que quebra se faltar:** criativo genérico ("música ao vivo para o seu evento") e verba
  desperdiçada em região onde ele não atende ou em evento que ele não faz.
- **O que pedir:**
  - **Raio de atendimento** e se cobra deslocamento acima de X km ← define o targeting geográfico
  - **Faixa de preço** por formato ← define a qualificação do lead
  - **Agenda / datas já bloqueadas** ← evita gastar mídia para data indisponível
  - Formatos de evento priorizados (casamento é o de maior ticket?)
  - Diferenciais reais: repertório personalizado, ensaio com os noivos, DJ nos intervalos, etc.

---

**12. WhatsApp Business com resposta rápida**

- **Por que:** é o único ponto de conversão do funil inteiro.
- **O que quebra se faltar:** **este é o vazamento mais caro e mais invisível.** Toda a verba é
  gasta para gerar o clique, e o lead esfria porque a resposta demorou 6 horas. Nenhuma otimização
  de campanha compensa lentidão de atendimento.
- **O que combinar:** SLA de resposta (ideal: menos de 1h no horário comercial), mensagem de
  saudação automática, catálogo com os 3 formatos, e etiquetas para marcar o estágio do lead —
  as etiquetas são o insumo do evento de "lead qualificado" do item 5.

---

### Ordem de execução sugerida

| Semana | Ações |
|---|---|
| **Semana 1** | Reunião de onboarding → itens 1, 2, 3, 4, 7 (acessos) + item 5 (**decisão escrita do evento de conversão**) |
| **Semana 2** | Itens 6, 8, 9 (rastreamento: pixel, tag, GA4, GTM) + teste de disparo dos eventos |
| **Semana 2–3** | Itens 10, 11, 12 (acervo, oferta, WhatsApp) + calibração do brief de marca |
| **Semana 3** | Primeira leva de criativos → curadoria → aprovação do cliente |
| **Semana 4** | Campanhas no ar (criadas pausadas, ativadas após aprovação) |

**Não subir campanha sem o item 5 resolvido.** É o erro que faz a operação parecer funcionar por
dois meses e depois não ter o que mostrar.

---

## 8. Riscos e ressalvas honestas

| Risco | Impacto | Mitigação |
|---|---|---|
| Divergência de preço do Veo (US$ 0,12 vs 0,15/s) | +22% no custo do Reel | Validar no 1º extrato do Google Cloud. Não muda decisão de preço |
| Taxa de rejeição da validação acima de 25% | Custo de imagem sobe proporcionalmente | Calibrar prompt de marca no setup. Monitorar taxa nos 60 primeiros dias |
| **Estimativa de horas de operação otimista demais** | **A margem cai rápido se a operação passar do previsto** | **Medir horas reais nos 3 primeiros meses com o Renan. É o maior risco da precificação** |
| Volume de conversão insuficiente para o algoritmo aprender | Campanhas não saem da fase de aprendizado | Otimizar por contato (volume alto), não por contrato. Alinhar expectativa no onboarding |
| Custo de plataforma concentrado em 1 cliente | R$ 218/mês sem rateio | Prioridade comercial: chegar a 3–5 clientes rápido |
| Sazonalidade do negócio do Renan | Meses de baixa temporada com pouco resultado | Contrato de 6 meses e planejamento sazonal de verba desde o início |
| Reprovação de criativo por política da Meta | Retrabalho manual | A validação de policy do pipeline já cobre parcialmente. Monitorar reprovações reais |
| Direitos de imagem/música no acervo de vídeo | Anúncio derrubado, risco jurídico | Checar autorizações antes de veicular |

---

## 9. Fontes consultadas

**Preços de API e infraestrutura** — todos consultados em **4 de setembro de 2026**:

- [Gemini API Pricing — ai.google.dev](https://ai.google.dev/gemini-api/docs/pricing) — Gemini 2.5 Flash Image, Gemini 2.5 Flash, Veo 3.1 / Fast / Lite
- [ElevenLabs API Pricing](https://elevenlabs.io/pricing/api) e [ElevenLabs Pricing](https://elevenlabs.io/pricing)
- [Vercel Pricing](https://vercel.com/pricing)
- [Neon Pricing](https://neon.com/pricing)
- [Trigger.dev Pricing](https://trigger.dev/pricing)
- [Cloudflare R2 Pricing](https://developers.cloudflare.com/r2/pricing/)
- [Clerk Pricing](https://clerk.com/pricing)
- [Resend Pricing](https://resend.com/pricing)

**Divergência registrada sobre Veo 3.1 Fast** (US$ 0,15/s vs. US$ 0,12/s oficial):
- [veo3gen.app — Veo 3.1 API Cost](https://www.veo3gen.app/blog/veo-3-1-api-access-cost)
- [aifreeapi.com — Veo 3.1 Pricing](https://www.aifreeapi.com/en/posts/veo-3-1-pricing)

**Benchmark de mercado brasileiro:**
- [Cubo Suite — Quanto cobrar por gestão de tráfego: Meta e Google Ads em 2026](https://blog.cubosuite.com.br/quanto-cobrar-por-gestao-de-trafego-meta-e-google-ads-em-2026/) — publicado 25/07/2026, atualizado 06/08/2026
- [WiseData Marketing — Quanto Custa Gestão de Tráfego Pago em 2026](https://blog.wisedatamarketing.com/marketing-digital/custo-gestao-trafego-pago/) — publicado 05/02/2026
- [Freelans — Quanto Custa Designer Gráfico Freelancer, Tabela 2026](https://freelans.com.br/blog/quanto-custa-designer-grafico-freelancer)
- [BR Freelas — Quanto Cobrar como Freelancer em 2026](https://brfreelas.com.br/blog/quanto-cobrar-como-freelancer-em-2026-tabela-de-precos-atualizada/)
- `webmakers/docs/pesquisa-mercado-mogi-guacu.md` — pesquisa própria, julho/2026

**Câmbio:**
- USD/BRL spot ≈ R$ 5,12 em 4/9/2026 — [TradingView](https://br.tradingview.com/symbols/USDBRL/), [Investing.com](https://br.investing.com/currencies/usd-brl) (R$ 5,1058), [XE.com](https://www.xe.com/en-us/currencyconverter/convert/?Amount=1&From=USD&To=BRL) (R$ 5,1016)
- Taxa efetiva adotada: **R$ 5,45/USD** (spot + ~6,5% de IOF e spread) — **premissa, não fonte**

**Cliente:**
- https://www.orenancamargo.com.br/ — consultado em 4/9/2026
- https://www.instagram.com/renancamargo.rc/

---

## 10. O que NÃO foi possível apurar

Em linha com a regra de não inventar preço:

1. **Alíquota exata de IOF sobre cartão de crédito internacional em setembro/2026.** Não localizei
   fonte oficial atualizada. O adicional de 6,5% é **premissa conservadora**, não dado apurado.
   Impacto se errado: ±3% no custo de API — irrelevante para a decisão.
2. **Preço oficial do Veo 3.1 Fast com discrepância entre fontes.** Adotado o oficial
   (US$ 0,12/s a 1080p), com sensibilidade calculada no item 2.1.
3. **Consumo real de tokens do pipeline do Growth Kit.** As premissas da seção 2.2 são estimativas
   de engenharia baseadas na arquitetura descrita, não medições. **Ação recomendada: instrumentar o
   pipeline para logar o custo real por peça** e revisar este documento após 30 dias de operação.
4. **Taxa real de rejeição da validação.** O fator 1,25 é premissa. É o número que mais merece
   medição real.
5. **Valores de mercado para produção de criativo de vídeo/motion no Brasil em 2026.** As fontes
   consultadas mencionam que TikTok/Reels "geram custos adicionais de produção" mas não publicam
   valores. A faixa de R$ 300–800 por vídeo citada no item 5.4 é **estimativa de mercado, não dado
   com fonte** — tratar como ordem de grandeza.
6. **Ticket médio real dos shows do Renan.** O site não publica preço. Necessário para calcular ROI
   e definir a verba de mídia com precisão. **É pergunta obrigatória na reunião de onboarding.**

---

*Documento gerado em 4 de setembro de 2026. Revisar após 30 e 90 dias de operação real com dados
medidos de consumo de API e de horas efetivas de operação.*
