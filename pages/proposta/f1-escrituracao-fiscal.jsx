import Head from "next/head";
import { FaWhatsapp, FaPrint } from "react-icons/fa";

// Proposta da Fase 1 da escrituração fiscal para o Marcos (F1). Abre só pelo
// link assinado do middleware (scripts/proposta/link.mjs f1-escrituracao-fiscal);
// fora do sitemap e com noindex, como as demais em /proposta. Valores e termos de
// sociedade são confidenciais — nada daqui vai para a home, blog ou portfólio.
// O link de WhatsApp é direto (sem trackWhatsAppClick): o clique do cliente não
// é lead de Ads e contaria como conversão falsa.

const etapas = [
  { nome: "Motor do livro de entradas, validado contra agosto/2026 da FF Dental", curto: "Motor do livro de entradas", horas: 40, valor: "6.000", de: 1, ate: 3 },
  { nome: "Livro de saídas e apuração de ICMS", curto: "Saídas e apuração de ICMS", horas: 24, valor: "3.600", de: 4, ate: 5 },
  { nome: "Arquivo EFD ICMS/IPI importado no Domínio", curto: "Arquivo EFD para o Domínio", horas: 60, valor: "9.000", de: 5, ate: 7 },
  { nome: "Aplicação web (acesso, empresas, envio de XML, revisão, regras)", curto: "Aplicação web", horas: 80, valor: "12.000", de: 6, ate: 10 },
  { nome: "Homologação assistida: dois fechamentos em paralelo com o processo atual", curto: "Homologação (2 fechamentos)", horas: 40, valor: "6.000", de: 9, ate: 12 },
];

const marcos = [
  { semana: 3, nome: "Agosto conferido com o Domínio" },
  { semana: 7, nome: "Arquivo importa no Domínio · 2ª parcela" },
  { semana: 12, nome: "Homologado · 3ª parcela" },
];

const escopo = [
  ["Livro de entradas", "Lê o XML da NF-e e decide, item a item, o CFOP de entrada (NCM + CNAE + CFOP do emitente) e se toma crédito de ICMS. O crédito do Simples (vCredICMSSN) também entra. Data de entrada = data de emissão, como a F1 faz hoje."],
  ["Livro de saídas", "Transcreve as notas como o cliente emitiu, sem interpretar."],
  ["Apuração de ICMS", "Soma débitos e créditos por CFOP (dentro do estado, fora do estado e exterior) e mostra o valor a recolher."],
  ["Arquivo para o Domínio", "TXT no layout da EFD ICMS/IPI (registros 0000, 0100, 0150, 0200, 0400, 0450/0460, C100 e C190), conferido no validador oficial (PVA) e testado na importação do Domínio."],
  ["Tela de revisão", "A equipe sobe os XMLs do mês, vê os itens marcados para revisão com o motivo e corrige antes de gerar o arquivo."],
  ["Regras por empresa", "Tabela de NCM → destinação (insumo, revenda, uso e consumo, ativo, revisar) que a equipe mantém na própria tela. Cada correção vira regra e o acerto sobe mês a mês."],
];

const pedidos = [
  "Escolher a Opção A ou B (e, se for a B, marcarmos uma conversa sobre o acordo de sócios)",
  "XMLs de agosto/2026 da FF Dental, de entrada e de saída, exportados do CIEG",
  "Do Domínio, do mesmo mês: livro de entradas, livro de saídas, apuração de ICMS e o SPED gerado. É o gabarito para medir o acerto.",
  "CNAE principal e regime da FF Dental",
  "Um ponto focal na equipe (o Matheus?) com cerca de 2 h por semana para validar as regras",
  "Sua revisão das tabelas de CFOP e crédito de ICMS antes da etapa 3",
];

const Secao = ({ titulo, children }) => (
  <section className="mt-14 print:mt-8 break-inside-avoid-page">
    <h2 className="font-display text-[24px] font-bold text-brand-900 tracking-tight">{titulo}</h2>
    <div className="mt-4 text-[16px] leading-relaxed text-ink-subtle space-y-4">{children}</div>
  </section>
);

const Tabela = ({ children }) => (
  <div className="overflow-x-auto rounded-xl border border-line bg-surface">
    <table className="w-full text-left text-[15px]">{children}</table>
  </div>
);

const Cronograma = () => {
  const col = (s) => `${((s - 1) / 12) * 100}%`;
  const larg = (de, ate) => `${((ate - de + 1) / 12) * 100}%`;
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <p className="font-display font-semibold text-brand-900">
        Arquivo importando no Domínio na semana 7, homologado na 12
      </p>
      <p className="text-[13px] text-ink-soft">Semanas a partir da assinatura · losangos = marcos de entrega e de pagamento</p>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[220px_minmax(0,1fr)] gap-x-4 gap-y-3 text-[14px]">
        <div className="hidden sm:block" />
        <div className="grid grid-cols-12 text-center text-[12px] text-ink-faint border-b border-line pb-1">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i}>S{i + 1}</span>
          ))}
        </div>

        {etapas.map((e, i) => (
          <div key={e.nome} className="contents">
            <div className="text-ink sm:pt-[2px]">
              {i + 1}. {e.curto}
            </div>
            <div className="relative h-6">
              <div
                className="absolute top-1 h-4 rounded-full bg-brand-100 border border-brand-600/40"
                style={{ left: col(e.de), width: larg(e.de, e.ate) }}
              />
            </div>
          </div>
        ))}

        {marcos.map((m) => (
          <div key={m.nome} className="contents">
            <div className="font-semibold text-brand-900 sm:pt-[2px]">{m.nome}</div>
            <div className="relative h-6">
              <span
                className="absolute top-1 h-4 w-4 -translate-x-1/2 rotate-45 bg-brand-700"
                style={{ left: col(m.semana + 1) }}
                aria-label={`fim da semana ${m.semana}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function PropostaF1() {
  const resposta =
    "https://wa.me/5519989331908?text=" +
    encodeURIComponent("Oi Willian, aqui é o Marcos. Li a proposta da Fase 1 da escrituração fiscal e queria conversar.");

  return (
    <>
      <Head>
        <title>Proposta · Escrituração Fiscal Automatizada (Fase 1)</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="referrer" content="no-referrer" />
      </Head>

      <header className="border-b border-line bg-surface print:border-0">
        <div className="mx-auto max-w-[880px] px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="flex items-center gap-[10px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/wm-circle.png" alt="Web Makers" className="w-[34px] h-[34px] rounded-full" />
            <span className="font-display font-extrabold text-[18px] tracking-tight text-brand-900">Web Makers</span>
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="print:hidden inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[14px] text-ink-subtle hover:bg-surface-raised"
          >
            <FaPrint aria-hidden /> Salvar em PDF
          </button>
        </div>
      </header>

      <main className="bg-surface-tint/40 print:bg-white">
        <div className="mx-auto max-w-[880px] px-4 sm:px-6 pt-12 pb-20 print:pt-4">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">Proposta para a F1 · 28/10/2026</p>
          <h1 className="mt-3 font-display text-[34px] sm:text-[42px] leading-[1.1] font-extrabold text-brand-900 tracking-tight">
            Escrituração fiscal automatizada — Fase 1
          </h1>
          <p className="mt-4 text-[18px] leading-relaxed text-ink-subtle">
            Marcos, a Fase 1 entrega o livro de entradas, o livro de saídas e a apuração de ICMS gerados direto dos XMLs, com o
            arquivo pronto para importar no Domínio. São cerca de 12 semanas. Abaixo estão duas formas de fazer: contratado pela
            F1 ou em sociedade no SaaS.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href="#opcao-a" className="rounded-xl border border-line bg-surface p-5 shadow-card hover:border-brand-600">
              <p className="text-[13px] font-semibold text-ink-faint">Opção A · contratado</p>
              <p className="mt-1 font-display text-[28px] font-extrabold text-brand-900">R$ 40.500</p>
              <p className="text-[14px] text-ink-soft">270 h · o sistema é da F1, para uso interno</p>
            </a>
            <a href="#opcao-b" className="rounded-xl border-2 border-brand-600 bg-surface p-5 shadow-card">
              <p className="text-[13px] font-semibold text-brand-700">Opção B · sociedade no SaaS</p>
              <p className="mt-1 font-display text-[28px] font-extrabold text-brand-900">R$ 15.000</p>
              <p className="text-[14px] text-ink-soft">+ 170 h minhas como aporte · 50/50 no produto</p>
            </a>
          </div>

          <Secao titulo="Contexto e objetivo">
            <p>
              Hoje o CIEG lança as notas no Domínio só espelhando o CFOP do emitente (5124 vira 1124). Isso acerta de 80% a 85%
              dos lançamentos. Num cliente com mil notas, sobram cerca de 150 para a equipe corrigir à mão, e um CFOP errado leva
              junto o crédito de ICMS.
            </p>
            <p>
              A ferramenta decide o CFOP de entrada item a item, cruzando NCM, CNAE e o CFOP do emitente. Cada decisão vem com o
              motivo escrito, para a equipe conferir. O que não dá para decidir com segurança vai para 1.949 e fica marcado para
              revisão, como você pediu. Uma prova de conceito dessa lógica já está rodando: ela lê os XMLs, decide o CFOP e o
              crédito e monta o livro de entradas.
            </p>
          </Secao>

          <Secao titulo="Escopo da Fase 1">
            <p>A Fase 1 cobre o registro dos documentos fiscais de ICMS, do XML até o arquivo importado no Domínio, numa aplicação web.</p>
            <Tabela>
              <thead className="bg-surface-sunken text-ink">
                <tr><th className="px-4 py-3 font-semibold w-[180px]">Entrega</th><th className="px-4 py-3 font-semibold">O que faz</th></tr>
              </thead>
              <tbody>
                {escopo.map(([entrega, oque]) => (
                  <tr key={entrega} className="border-t border-line align-top">
                    <td className="px-4 py-3 font-semibold text-ink">{entrega}</td>
                    <td className="px-4 py-3">{oque}</td>
                  </tr>
                ))}
              </tbody>
            </Tabela>
            <p>
              <strong className="text-ink">Fica para depois:</strong> integração automática com o CIEG (na Fase 1 os XMLs são
              enviados em lote), CT-e e NFC-e, CIAP do ativo imobilizado, DIFAL e ICMS-ST de apuração, IPI, a auditoria do
              fechamento (a “segunda IA”) e a venda para outros escritórios (cadastro, cobrança, teste grátis).
            </p>
          </Secao>

          <Secao titulo="Etapas e cronograma">
            <p>
              São 12 semanas a partir da assinatura. A primeira entrega é o livro de entradas de agosto conferido contra o Domínio,
              na semana 3.
            </p>
            <Cronograma />
            <p>
              A homologação roda dois fechamentos mensais em paralelo com o processo atual. A F1 só troca de processo depois que os
              números baterem.
            </p>
          </Secao>

          <div id="opcao-a" className="scroll-mt-6" />
          <Secao titulo="Opção A – Desenvolvimento contratado pela F1">
            <p>
              A Fase 1 sai por <strong className="text-ink">R$ 40.500</strong>: 270 horas a R$ 150/h, já com o período de ajuste.
              O sistema fica da F1, para uso interno.
            </p>
            <Tabela>
              <thead className="bg-surface-sunken text-ink">
                <tr>
                  <th className="px-4 py-3 font-semibold">Etapa</th>
                  <th className="px-4 py-3 font-semibold text-right">Horas</th>
                  <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                {etapas.map((e, i) => (
                  <tr key={e.nome} className="border-t border-line">
                    <td className="px-4 py-3">{i + 1}. {e.nome}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{e.horas}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{e.valor}</td>
                  </tr>
                ))}
                <tr className="border-t border-line">
                  <td className="px-4 py-3">Gestão e reuniões semanais</td>
                  <td className="px-4 py-3 text-right tabular-nums">26</td>
                  <td className="px-4 py-3 text-right tabular-nums">3.900</td>
                </tr>
                <tr className="border-t-2 border-brand-900/20 font-semibold text-ink">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3 text-right tabular-nums">270</td>
                  <td className="px-4 py-3 text-right tabular-nums">40.500</td>
                </tr>
              </tbody>
            </Tabela>
            <p>
              <strong className="text-ink">Pagamento:</strong> 30% na assinatura (R$ 12.150), 40% quando o arquivo de agosto
              importar no Domínio (R$ 16.200) e 30% ao fim da homologação (R$ 12.150).
            </p>
            <p>
              Mudança de escopo pedida durante o projeto é orçada à parte, na mesma hora/valor. Ajustes de regra fiscal dentro do
              escopo acima não são cobrados.
            </p>
          </Secao>

          <div id="opcao-b" className="scroll-mt-6" />
          <Secao titulo="Opção B – Sociedade no SaaS">
            <p>
              Nesta opção a F1 paga <strong className="text-ink">R$ 15.000</strong> pela Fase 1, e eu entro com as outras 170
              horas (R$ 25.500) como aporte numa sociedade para vender o produto a outros escritórios. O escopo e o prazo são os
              mesmos da Opção A.
            </p>
            <Tabela>
              <thead className="bg-surface-sunken text-ink">
                <tr><th className="px-4 py-3" /><th className="px-4 py-3 font-semibold">Eu</th><th className="px-4 py-3 font-semibold">Marcos / F1</th></tr>
              </thead>
              <tbody>
                <tr className="border-t border-line align-top">
                  <td className="px-4 py-3 font-semibold text-ink">Entra com</td>
                  <td className="px-4 py-3">Desenvolvimento, infraestrutura, segurança e suporte técnico</td>
                  <td className="px-4 py-3">Conhecimento fiscal, validação das regras e entrada nos escritórios</td>
                </tr>
                <tr className="border-t border-line align-top">
                  <td className="px-4 py-3 font-semibold text-ink">Participação proposta</td>
                  <td className="px-4 py-3">50%</td>
                  <td className="px-4 py-3">50%</td>
                </tr>
                <tr className="border-t border-line align-top">
                  <td className="px-4 py-3 font-semibold text-ink">Na Fase 1</td>
                  <td className="px-4 py-3">170 h de aporte</td>
                  <td className="px-4 py-3">R$ 15.000 + o ponto focal da equipe para validar</td>
                </tr>
              </tbody>
            </Tabela>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-ink">O que muda para a F1:</strong> usa a ferramenta sem mensalidade e não precisa negociar preço a cada ajuste. As fases seguintes (auditoria, outros escritórios) são investimento da sociedade, não horas cobradas.</li>
              <li><strong className="text-ink">Propriedade:</strong> código, marca e regras genéricas ficam na sociedade. As tabelas montadas com dados de clientes da F1 são da F1.</li>
              <li><strong className="text-ink">Prazo comercial:</strong> o ICMS sai na transição para o IBS (2029 a 2032). A venda precisa começar em 2027 para aproveitar a janela.</li>
              <li><strong className="text-ink">Para formalizar num acordo de sócios:</strong> a participação final, quem banca a infraestrutura até haver receita, a divisão do resultado e a saída de um sócio.</li>
            </ul>
          </Secao>

          <Secao titulo="Custos mensais depois da entrega">
            <p>
              Na Opção A, o custo recorrente estimado é de R$ 1.650 a R$ 1.900 por mês com suporte, ou R$ 150 a R$ 400 só com a
              hospedagem. Na Opção B, esse custo vai para a sociedade.
            </p>
            <Tabela>
              <thead className="bg-surface-sunken text-ink">
                <tr><th className="px-4 py-3 font-semibold">Item</th><th className="px-4 py-3 font-semibold text-right whitespace-nowrap">Estimativa (R$/mês)</th></tr>
              </thead>
              <tbody>
                <tr className="border-t border-line"><td className="px-4 py-3">Hospedagem, banco de dados e armazenamento dos XMLs</td><td className="px-4 py-3 text-right tabular-nums">150 a 400</td></tr>
                <tr className="border-t border-line"><td className="px-4 py-3">Suporte e manutenção, até 10 h/mês (opcional na Opção A)</td><td className="px-4 py-3 text-right tabular-nums">1.500</td></tr>
              </tbody>
            </Tabela>
            <p>
              Na Fase 1 a decisão de CFOP é feita por regras, não por IA, então não há custo de IA. Isso é de propósito: toda
              decisão fiscal precisa de um motivo que a equipe consiga conferir. A IA entra numa fase seguinte, para sugerir regras
              de NCM, e quem aprova continua sendo a F1.
            </p>
          </Secao>

          <Secao titulo="O que preciso da F1 e próximos passos">
            <p>Para começar, preciso que você escolha entre a Opção A e a B e me envie o material de agosto/2026 da FF Dental.</p>
            <ol className="list-decimal pl-5 space-y-2">
              {pedidos.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <p>
              Com o material de agosto em mãos, em duas semanas mostro a comparação entre o livro de entradas da ferramenta e o do
              Domínio, CFOP por CFOP.
            </p>
          </Secao>

          <div className="mt-14 rounded-2xl bg-brand-900 p-6 sm:p-8 text-white print:hidden">
            <p className="font-display text-[22px] font-bold">Ficou alguma dúvida ou já tem uma escolha?</p>
            <p className="mt-1 text-white/80">Me chama no WhatsApp e a gente marca a conversa.</p>
            <a
              href={resposta}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white shadow-cta hover:bg-brand-700"
            >
              <FaWhatsapp aria-hidden /> Responder pelo WhatsApp
            </a>
          </div>

          <p className="mt-10 text-[14px] text-ink-soft">Willian Marinho · Web Makers · webmakers.dev.br</p>
        </div>
      </main>
    </>
  );
}
