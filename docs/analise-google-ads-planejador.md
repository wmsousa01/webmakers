# Análise de Google Ads — dados do Planejador de Palavras-chave

### Web Makers · região de Mogi Guaçu-SP · julho de 2026

> **Resumo em uma linha:** os dados do Planejador falsificam a premissa central da
> spec de Pesquisa. A estrutura estava certa; três números estavam errados
> (orçamento, teto de CPC, e a suposição de que o diferencial vende por Search).
> **O Search local é um fio de água (~11 cliques/mês). O canal principal para o
> que a Web Makers tem de mais valioso passa a ser orgânico + conteúdo + outbound.**

---

## 1. Os dados

Mesmas 19 palavras-chave da spec, medidas em geografias diferentes:

| Geografia | Buscas/mês | Lance topo (piso médio) |
|---|---|---|
| **4 cidades (spec atual)** | **110** | sem dado |
| Campinas | 300 | R$ 5,04 |
| Estado de SP | 4.830 | R$ 6,52 |
| Brasil | 14.060 | R$ 5,22 |

**Ressalva metodológica:** o Planejador arredonda volumes baixos em faixas (os "10"
por palavra são provavelmente um piso de bucket), e volume "zero" significa "abaixo
do limiar de reporte", não literalmente nenhuma busca. A ordem de grandeza, porém,
é inequívoca.

## 2. O que os números provam

### a) R$ 30/dia era inexequível — o gargalo é demanda, não verba
110 buscas/mês nas 4 cidades = ~3,7 buscas/dia para o **conjunto inteiro** de palavras.
Mesmo com 100% de participação e CTR generoso de 10%, dá **~11 cliques/mês**. A R$ 5–7
o clique, isso é **R$ 55–77/mês** de gasto possível — cerca de **1/12** dos R$ 900/mês
que R$ 30/dia representa.
→ **Corrigido para R$ 12/dia.** Sobra folgado.

### b) O teto de R$ 4 estava abaixo do piso do mercado
O lance de topo de página começa em **R$ 5–6,50** na região. A R$ 4, o anúncio quase
não alcança o topo — e é exatamente isso que explica a campanha antiga: **35 impressões
e R$ 0,20 em 30 dias** com R$ 17,20/dia disponível. Ela não estava quebrada; estava
com lance abaixo do piso e sem demanda.
→ **Corrigido para teto de R$ 9.**

### c) O gargalo real é geografia
Campinas quase **triplica** o volume; o estado multiplica por **44**. Decisão de marca
(mantida em aberto na spec — ver `decisao_pendente_expansao`): expandir para a RMC
triplica o volume mas dilui o argumento "agência local do DDD 19", que a pesquisa
aponta como o principal diferencial contra os concorrentes remotos.

### d) O diferencial não tem demanda de busca local
As palavras de automação e integração — o "espaço em branco" que a pesquisa
identificou — deram volume **ZERO** na região (`automação de whatsapp para empresa`,
`automação de processos empresa`). A pesquisa mostrou que ninguém **oferece**; os dados
mostram que ninguém **procura** localmente. **Esse diferencial não se vende por Search
local** — precisa de conteúdo, social e outbound.
→ Grupo "Automação e integração" fica **fora do lançamento** (`incluir_no_lancamento: false`).

## 3. Correções aplicadas à spec

`scripts/growth/config/google-ads/pesquisa-local.json`:

| Campo | Antes | Depois |
|---|---|---|
| Orçamento diário | R$ 30 | **R$ 12** |
| Teto de CPC | R$ 4 | **R$ 9** |
| Grupo automação | incluído | **fora do lançamento** (volume zero) |
| Geografia | 4 cidades (fixo) | 4 cidades + **decisão de expansão documentada** |

## 4. Duas correções factuais ao diagnóstico anterior

1. **Não há migração a fazer.** Uma campanha de Pesquisa completa **valida via API
   agora**, com a conta em modo Smart (`validateOnly` testado 2x). A limitação do modo
   Smart era sobre **editar** a campanha Smart antiga, não sobre **criar** uma nova de
   Pesquisa. A spec pode ser montada hoje.

2. **A correção das conversões principais não pode ser automatizada.** A API recusa
   mutação nas 6 ações herdadas do Smart (`Mutates are not allowed` — são gerenciadas
   pelo sistema). Tem que ser **no painel**: Metas → Conversões → Resumo. Como o lance
   inicia em Maximizar cliques, isso não morde agora — vira crítico ao trocar para
   Maximizar conversões.

## 5. Implicação estratégica

O Search local rende ~11 cliques/mês e o diferencial de maior tíquete não tem demanda
de busca alguma. **Orgânico e conteúdo deixam de ser complemento e passam a ser o canal
principal** para o que a Web Makers tem de mais valioso (automação, integração,
recorrência). Ver `scripts/growth/config/calendario-organico.json`.

## 6. Fontes

- Google Ads — Planejador de Palavras-chave (jul/2026), 19 palavras da spec em 4 geografias.
- Google Ads API — teste de criação de campanha de Pesquisa via `validateOnly` (2x, OK).
- Pesquisa de mercado — `docs/pesquisa-mercado-mogi-guacu.md`.
- Campanha removida `24046143972` (conta 4296394458): 35 impressões / R$ 0,20 em 30 dias.
