import Head from "next/head";
import Link from "next/link";

// Proposta comercial de gestão de tráfego para um cliente específico.
// Página pública mas NÃO indexada (noindex aqui + exclude no next-sitemap):
// é documento de cliente, não conteúdo do site. Sem Basic Auth de propósito —
// o cliente precisa abrir o link no celular sem senha.
//
// O chrome do site (navbar, chat de triagem, barra de CTA mobile) é removido em
// pages/_app.js para /proposta/*: a página tem cabeçalho e CTA próprios, e o
// chat de captação de lead não faz sentido sobre uma proposta já enviada.

const WHATSAPP =
  "https://wa.me/5519989331908?text=" +
  encodeURIComponent("Oi, vi a proposta de gestão de tráfego e quero conversar.");

const TEAL = "#00779B"; // apoio (mesmo tom usado no /painel)
const GREEN = "#1F7A54"; // confirmação

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.13em]" style={{ color: TEAL }}>
      {children}
    </p>
  );
}

function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="mb-6">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-[22px] font-extrabold leading-tight tracking-tight text-brand-900 sm:text-[26px]">
        {title}
      </h2>
      {children ? <p className="mt-2 max-w-[660px] text-ink-soft">{children}</p> : null}
    </div>
  );
}

/** Uma pista de dinheiro. `flows` = a verba atravessa (contorno tracejado);
 *  senão fica com a agência (preenchida em navy). A forma carrega o sentido. */
function Lane({ flows, tag, title, amount, unit, rows }) {
  return (
    <div
      className={
        "flex flex-col gap-4 rounded-2xl p-6 " +
        (flows
          ? "border-2 border-dashed border-brand-600 bg-surface-tint text-ink"
          : "border border-brand-900 bg-brand-900 text-white")
      }
    >
      <span
        className={
          "self-start rounded-full px-3 py-[5px] text-[11.5px] font-bold uppercase tracking-[0.1em] " +
          (flows ? "border border-line bg-white" : "bg-white/[0.14] text-brand-100")
        }
        style={flows ? { color: TEAL } : undefined}
      >
        {tag}
      </span>

      <h3 className={"font-display text-[17px] font-bold " + (flows ? "text-brand-900" : "text-white")}>
        {title}
      </h3>

      <div
        className={
          "font-display text-[38px] font-extrabold leading-none tracking-tight tabular-nums " +
          (flows ? "text-brand-900" : "text-white")
        }
      >
        {amount}
        <small className="ml-1 text-[15px] font-semibold tracking-normal opacity-70">{unit}</small>
      </div>

      <dl className={"mt-1 border-t " + (flows ? "border-line" : "border-white/20")}>
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className={
              "flex justify-between gap-4 py-[9px] text-[14.5px] " +
              (i < rows.length - 1 ? (flows ? "border-b border-line/70" : "border-b border-white/10") : "")
            }
          >
            <dt className={"shrink-0 font-medium " + (flows ? "text-ink-soft" : "text-brand-100/80")}>{k}</dt>
            <dd className={"text-right font-semibold " + (flows ? "text-ink" : "text-white")}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Callout({ children }) {
  return (
    <div className="mt-6 space-y-2 rounded-r-xl border-l-[3px] border-brand-600 bg-surface-tint px-6 py-5">
      {children}
    </div>
  );
}

function Check({ children, off }) {
  return (
    <li className={"relative border-b border-line py-[11px] pl-7 text-[15.5px] " + (off ? "text-ink-soft" : "")}>
      {off ? (
        <span className="absolute left-[3px] top-[22px] h-[2px] w-[11px] bg-ink-faint/60" aria-hidden="true" />
      ) : (
        <span
          className="absolute left-[2px] top-[18px] h-[7px] w-[13px] -rotate-45 border-b-2 border-l-2"
          style={{ borderColor: GREEN }}
          aria-hidden="true"
        />
      )}
      {children}
    </li>
  );
}

function Numbered({ n, title, children }) {
  return (
    <div className="grid grid-cols-[30px_1fr] gap-4 border-b border-line py-[17px] last:border-b-0">
      <div className="pt-[3px] font-display text-[13px] font-extrabold tabular-nums text-brand-600">{n}</div>
      <div>
        {title ? <h3 className="mb-1 font-display text-[17px] font-bold text-brand-900">{title}</h3> : null}
        <div className="space-y-2 text-[15px] text-ink-soft">{children}</div>
      </div>
    </div>
  );
}

/** Um achado do diagnóstico: o que vimos e o que isso custa hoje.
 *  Lista com régua à esquerda em vez de card — são observações de um mesmo
 *  levantamento, não objetos separados. */
function Achado({ titulo, children }) {
  return (
    <li className="border-l-2 border-line py-1 pl-5">
      <h3 className="font-display text-[16px] font-bold text-brand-900">{titulo}</h3>
      <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{children}</p>
    </li>
  );
}

function PathCard({ recommended, who, title, price, unit, note, items }) {
  return (
    <div
      className={
        "flex flex-col gap-3 rounded-2xl p-6 " +
        (recommended
          ? "border border-brand-600 bg-surface-tint ring-[3px] ring-brand-600/10"
          : "border border-line bg-white")
      }
    >
      <span className="text-[11.5px] font-bold uppercase tracking-[0.1em]" style={{ color: TEAL }}>
        {who}
      </span>
      <h3 className="font-display text-[19px] font-bold text-brand-900">{title}</h3>
      <div className="font-display text-[30px] font-extrabold leading-none tracking-tight tabular-nums text-brand-900">
        {price}
        <small className="text-[14px] font-semibold tracking-normal opacity-70">{unit}</small>
        <span className="mt-[7px] block font-sans text-[13.5px] font-medium tracking-normal text-ink-soft">
          {note}
        </span>
      </div>
      <ul className="mt-1">
        {items.map(([txt, off]) => (
          <Check key={txt} off={off}>
            {txt}
          </Check>
        ))}
      </ul>
    </div>
  );
}

export default function PropostaRenanCamargo() {
  return (
    <>
      <Head>
        <title>Proposta · Renan Camargo | Web Makers</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Proposta de gestão de tráfego pago e orgânico da Web Makers para Renan Camargo."
        />
      </Head>

      <div className="bg-white text-ink">
        {/* topo */}
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-[940px] flex-wrap items-center justify-between gap-4 px-6 py-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-brand-600 font-display text-sm font-extrabold tracking-tight text-white">
                wm
              </span>
              <span>
                <span className="block font-display text-[17px] font-extrabold tracking-tight text-brand-900">
                  Web Makers
                </span>
                <span className="block text-[13px] text-ink-soft">webmakers.dev.br</span>
              </span>
            </Link>
            <p className="text-right text-[13px] text-ink-soft">
              Proposta comercial
              <br />
              Setembro de 2026 · válida por 15 dias
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-[940px] px-6">
          {/* hero */}
          <div className="pb-3 pt-12">
            <Eyebrow>Gestão de tráfego · Renan Camargo</Eyebrow>
            <h1 className="mt-4 font-display text-[30px] font-extrabold leading-[1.12] tracking-tight text-brand-900 sm:text-[44px]">
              Sua agenda cheia, com cada real rastreado até o contrato.
            </h1>
            <p className="mt-4 max-w-[660px] text-[19px] text-ink-soft">
              Anúncios no Instagram, Facebook e Google, mais produção de conteúdo, operados pela Web
              Makers. Esta proposta começa pelo que encontramos olhando o seu material, passa pela
              estratégia que sai dali, e só então chega ao preço — separando linha por linha o que é
              serviço nosso e o que é verba de anúncio sua.
            </p>
          </div>

          {/* diagnóstico */}
          <section className="py-11">
            <SectionHead
              eyebrow="Onde você está hoje"
              title="O que a gente viu antes de escrever esta proposta"
            >
              Olhamos seu site, suas últimas publicações e como o mercado de música para eventos se
              comporta na sua região. O que está aqui é observação, não suposição — e é de onde sai
              tudo o que vem depois.
            </SectionHead>

            <div className="rounded-2xl border border-line bg-surface-tint px-6 py-5">
              <h3 className="font-display text-[15px] font-bold text-brand-900">
                O que já está pronto — e é mais forte do que você usa
              </h3>
              <ul className="mt-3 grid gap-x-9 sm:grid-cols-2">
                <Check>26 anos de estrada e mais de 2.300 eventos</Check>
                <Check>6,6 mil seguidores e acervo real de palco</Check>
                <Check>Siemens e Multfer no portfólio corporativo</Check>
                <Check>Três formatos: cerimônia, festa e corporativo</Check>
              </ul>
              <p className="mt-4 text-[14.5px] text-ink-soft">
                Nenhum concorrente da região junta essas quatro coisas. O problema não é o que você
                tem — é que quase nada disso está trabalhando para você fora do palco.
              </p>
            </div>

            <h3 className="mb-5 mt-9 font-display text-[17px] font-bold text-brand-900">
              O que está travando
            </h3>
            <ul className="flex list-none flex-col gap-5 p-0">
              <Achado titulo="Ninguém sabe de onde você é">
                Nem o site nem a bio do Instagram dizem a sua cidade. Para quem vende serviço
                presencial, essa é a informação que mais qualifica ou desqualifica um contato — e
                hoje ela não aparece em lugar nenhum. Custa busca local e traz gente de fora do seu
                raio de atendimento.
              </Achado>
              <Achado titulo="Nada é medido">
                Seu site não tem Pixel do Meta, Google Analytics nem tag de conversão do Google Ads.
                Um anúncio que rodasse hoje mostraria cliques e nada mais: não daria para saber
                quais viraram conversa no WhatsApp, e o algoritmo não teria como aprender quem
                procurar.
              </Achado>
              <Achado titulo="Cinco botões de WhatsApp idênticos">
                Todos com a mesma mensagem pronta e sem qualquer identificação. Quando o contato cai
                no seu celular, não há como saber se veio do topo do site, da seção de casamento ou
                de um anúncio pago.
              </Achado>
              <Achado titulo="O conteúdo é bom e termina sem pedir nada">
                Nas últimas 25 publicações não há uma única chamada para ação. E as hashtags estão
                em inglês e genéricas — entregam o post para um público que nunca vai te contratar,
                em vez de para quem casa na sua região no ano que vem.
              </Achado>
              <Achado titulo="Seu maior diferencial está escondido">
                <em className="text-ink">“Sempre um repertório exclusivo, para chamar de SEU”</em> é
                a quarta linha da sua bio. É a única promessa que nenhum concorrente da região faz
                de forma explícita, e ela está enterrada.
              </Achado>
              <Achado titulo="Sua melhor frase circulou uma vez só">
                <em className="text-ink">
                  “O barato sai caro quando o momento não pode ser repetido”
                </em>{" "}
                é o melhor argumento de venda que existe no seu perfil — escrito por você, publicado
                uma vez, sem nenhum impulso. Ela ataca de frente a objeção que trava a maioria das
                contratações.
              </Achado>
              <Achado titulo="Seus números não batem entre si">
                O site diz 25 anos e 2.500 eventos; a bio diz 26 anos e 2.300. São detalhes, mas
                prova social só pesa quando é consistente. Vale fixar um número e usar sempre o
                mesmo, em todo lugar.
              </Achado>
            </ul>
          </section>

          {/* estratégia */}
          <section className="py-11">
            <SectionHead eyebrow="Para onde vamos" title="A estratégia">
              Nada aqui é genérico. Cada peça sai de algo que já existe no seu material e não está
              sendo aproveitado.
            </SectionHead>

            <div className="rounded-2xl border border-line bg-surface-sunken px-6 py-5">
              <h3 className="font-display text-[15px] font-bold text-brand-900">
                Quem vamos buscar
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                Noiva entre 26 e 38 anos, casamento marcado para daqui a 6 a 14 meses, num raio de
                cerca de 120 km. Ela não está comparando bandas por preço — está com medo de errar
                num evento que não tem segunda chance. O que passa pela cabeça dela é:{" "}
                <em className="text-ink">
                  “tenho pavor de a festa esvaziar às onze horas, e não tenho como saber se a banda
                  é boa antes do dia”
                </em>
                .
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                Em paralelo, dois públicos que quase ninguém disputa na região: aniversário de 40 a
                60 anos e evento corporativo — onde a Siemens no seu portfólio vale mais que
                qualquer anúncio que a gente escreva.
              </p>
            </div>

            <h3 className="mb-1 mt-9 font-display text-[17px] font-bold text-brand-900">
              Os três ângulos, em ordem de prioridade
            </h3>
            <div>
              <Numbered n="01" title="“O repertório é SEU”">
                <p>
                  Um Reel curto emendando rock, sertanejo e flashback para provar em 20 segundos o
                  que a sua bio diz em texto. É a promessa que nenhum concorrente local faz, e
                  responde ao medo da noiva de a festa não ter a cara dela.
                </p>
              </Numbered>
              <Numbered n="02" title="“O barato sai caro quando o momento não pode ser repetido”">
                <p>
                  Sua própria frase, virando carrossel: as perguntas que toda noiva deveria fazer a
                  uma banda antes de assinar. Conteúdo feito para ser salvo e compartilhado em grupo
                  de noivas — que é como esse mercado realmente circula.
                </p>
              </Numbered>
              <Numbered n="03" title="“Sim, a gente toca isso”">
                <p>
                  Série curta respondendo pedidos de música. Esse formato já funcionou no seu
                  perfil: o post sobre tocar The Wall performou acima da sua média. É barato de
                  produzir, é infinito, e é o que mais gera comentário.
                </p>
              </Numbered>
            </div>

            <h3 className="mb-4 mt-9 font-display text-[17px] font-bold text-brand-900">
              Onde o dinheiro entra
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-600 bg-surface-tint p-6 ring-[3px] ring-brand-600/10">
                <p className="font-display text-[15px] font-bold text-brand-900">
                  Instagram e Facebook · a maior parte
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                  Ninguém pesquisa no Google “banda para o meu aniversário de 60 anos” — mas para de
                  rolar o feed quando vê uma pista cheia. Seu produto é audiovisual: o vídeo{" "}
                  <strong className="text-ink">é</strong> a demonstração. É aqui que se cria a
                  demanda que ainda não virou busca.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="font-display text-[15px] font-bold text-brand-900">
                  Google · a rede de pesca
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                  Quem digita “música para casamento” na sua região já decidiu contratar e só
                  precisa te achar. É volume menor, porque a cidade é pequena, mas é o contato mais
                  barato e mais perto de fechar que existe.
                </p>
              </div>
            </div>

            <Callout>
              <p>
                <strong className="text-brand-900">A ordem importa mais que a verba.</strong> Antes
                de qualquer anúncio, instalamos a medição e definimos junto com você o que conta
                como um contato válido. Sem isso, campanha vira aposta cara: gasta, entrega
                relatório bonito e não dá para saber o que trouxe contrato.
              </p>
              <p>
                Enquanto o tráfego pago calibra — leva de 4 a 8 semanas —, o orgânico já corrige o
                que não custa nada: chamada para ação nas publicações, hashtags da sua região no
                lugar das em inglês, e o repertório sob medida saindo da quarta linha da bio para o
                centro da comunicação.
              </p>
            </Callout>
          </section>

          {/* as duas pistas */}
          <section className="py-11">
            <SectionHead eyebrow="O ponto mais importante" title="Dois pagamentos, dois destinos">
              Quase todo atrito entre agência e cliente nasce de misturar essas duas contas. Aqui
              elas nunca se misturam: a verba de anúncio sai do seu cartão e vai direto para o Meta e
              o Google. Ela não passa pela Web Makers.
            </SectionHead>

            <div className="grid gap-5 md:grid-cols-2">
              <Lane
                tag="Fica com a Web Makers"
                title="Serviço"
                amount="R$ 1.690"
                unit="/mês"
                rows={[
                  ["O que é", "Estratégia, criativo, gestão e relatório"],
                  ["Vai para", "Web Makers"],
                  ["Documento", "Nota fiscal de serviço"],
                  ["Quem define", "Fixo em contrato"],
                ]}
              />
              <Lane
                flows
                tag="Passa direto · não é nosso"
                title="Verba de anúncio"
                amount="R$ 2.400"
                unit="/mês sugerido"
                rows={[
                  ["O que é", "Compra de impressões e cliques"],
                  ["Vai para", "Meta e Google"],
                  ["Documento", "Recibo do Meta/Google no seu nome"],
                  ["Quem define", "Você — pode subir ou pausar quando quiser"],
                ]}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4 rounded-2xl border border-line bg-surface-sunken px-6 py-5">
              <div>
                <p className="font-display text-base font-bold text-brand-900">Desembolso total no mês</p>
                <p className="mt-[3px] text-[13.5px] text-ink-soft">
                  R$ 1.690 de serviço + R$ 2.400 de anúncio
                </p>
              </div>
              <p className="font-display text-[30px] font-extrabold tracking-tight tabular-nums text-brand-900">
                R$ 4.090
              </p>
            </div>

            <Callout>
              <p>
                <strong className="text-brand-900">
                  A conta de anúncios é sua, no seu CPF/CNPJ, com o seu cartão.
                </strong>{" "}
                A Web Makers recebe acesso de parceira para operar — e você enxerga cada centavo
                gasto, em tempo real, no painel do Meta e do Google.
              </p>
              <p>
                Isso não é detalhe burocrático. Significa que não existe margem escondida na verba,
                que o histórico de aprendizado das campanhas fica com você, e que se um dia nos
                separarmos, você leva a conta, o pixel e os dados junto.
              </p>
            </Callout>
          </section>

          {/* verba */}
          <section className="py-11">
            <SectionHead eyebrow="Verba de anúncio" title="Por que R$ 2.400 e não mais">
              Mogi Guaçu e as cidades vizinhas formam um mercado pequeno. Colocar R$ 6.000/mês num
              raio de 100 km não traz o dobro de noivas — traz o mesmo público visto mais vezes, a um
              custo maior por contato.
            </SectionHead>
            <div className="max-w-[660px] space-y-4">
              <p>
                Começamos em torno de <strong className="text-brand-900">R$ 80 por dia</strong>,
                divididos entre Instagram/Facebook (onde a pessoa ainda não está procurando, mas se
                emociona com um vídeo da pista cheia) e Google (onde ela já está procurando
                &quot;banda para casamento&quot; e só precisa te achar).
              </p>
              <p className="text-ink-soft">
                A partir do segundo mês, com dados reais de quanto custa cada contato, a gente ajusta
                juntos. Se estiver funcionando, sobe. Se a temporada esfriar, desce. A decisão de
                quanto investir é sempre sua.
              </p>
            </div>
          </section>

          {/* escopo */}
          <section className="py-11">
            <SectionHead eyebrow="O que a Web Makers entrega" title="Incluído nos R$ 1.690 por mês" />
            <div className="grid gap-x-9 sm:grid-cols-2">
              <ul>
                <Check>Campanhas no Meta Ads (Instagram + Facebook)</Check>
                <Check>Campanhas no Google (Pesquisa e Performance Max)</Check>
                <Check>6 criativos de anúncio por mês, sendo 2 em vídeo</Check>
                <Check>Remarketing e públicos semelhantes</Check>
              </ul>
              <ul>
                <Check>6 posts estáticos por mês para o seu Instagram</Check>
                <Check>3 carrosséis por mês</Check>
                <Check>3 Reels por mês</Check>
                <Check>Relatório quinzenal e uma call de 1h por mês</Check>
              </ul>
            </div>
            <Callout>
              <p>
                <strong className="text-brand-900">Duas revisões por semana das campanhas</strong>,
                com ajuste de verba nas semanas de alta temporada de casamento e de festa de fim de
                ano — que é quando cada real rende mais e quando a concorrência aperta.
              </p>
            </Callout>
          </section>

          {/* preço */}
          <section className="py-11">
            <SectionHead eyebrow="Preço" title="Condição de primeiro cliente">
              Você é o primeiro cliente desta operação. Isso vale um preço melhor — e vale ser dito
              com todas as letras o que esperamos em troca.
            </SectionHead>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-600 bg-white p-6 ring-[3px] ring-brand-600/10">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.09em]" style={{ color: TEAL }}>
                  Meses 1 a 3
                </p>
                <p className="mt-2 font-display text-[27px] font-extrabold tracking-tight tabular-nums text-brand-900">
                  R$ 1.690<small className="text-sm font-semibold opacity-70">/mês</small>
                </p>
                <p className="mt-[7px] text-sm text-ink-soft">Escopo integral, sem corte. Setup isento.</p>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.09em]" style={{ color: TEAL }}>
                  A partir do mês 4
                </p>
                <p className="mt-2 font-display text-[27px] font-extrabold tracking-tight tabular-nums text-brand-900">
                  R$ 2.490<small className="text-sm font-semibold opacity-70">/mês</small>
                </p>
                <p className="mt-[7px] text-sm text-ink-soft">
                  Valor de tabela, já previsto em contrato desde a assinatura — sem surpresa.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <Numbered n="01">
                <p>
                  <strong className="font-bold text-brand-900">Contrato de 6 meses.</strong> Tráfego
                  pago leva de 4 a 8 semanas para calibrar. Contrato curto obriga a decidir antes de
                  haver dado.
                </p>
              </Numbered>
              <Numbered n="02">
                <p>
                  <strong className="font-bold text-brand-900">Setup isento</strong> — normalmente R$
                  1.490. Cobre configuração de contas, pixel, tags de conversão e estruturação das
                  campanhas.
                </p>
              </Numbered>
              <Numbered n="03">
                <p>
                  <strong className="font-bold text-brand-900">
                    Autorização para usarmos o resultado como case.
                  </strong>{" "}
                  Números, prints e um depoimento seu. Nada é publicado sem você ver antes.
                </p>
              </Numbered>
              <Numbered n="04">
                <p>
                  <strong className="font-bold text-brand-900">
                    Paciência com o processo nos primeiros 60 dias.
                  </strong>{" "}
                  Vamos ajustar rotina e formato junto com você — e você vai ser ouvido nisso.
                </p>
              </Numbered>
              <Numbered n="05">
                <p>
                  <strong className="font-bold text-brand-900">
                    Acesso ao seu acervo de vídeo dos shows.
                  </strong>{" "}
                  É o insumo mais valioso que existe aqui: ninguém contrata banda vendo imagem feita
                  no computador. Contrata vendo a pista cheia.
                </p>
              </Numbered>
            </div>
          </section>

          {/* alternativa */}
          <section className="py-11">
            <SectionHead eyebrow="Alternativa" title="E se você entregar os materiais?">
              Você grava bastante e já tem acervo. Se preferir entregar as peças prontas, existe uma
              versão mais barata — com uma contrapartida que vale deixar clara antes, não depois.
            </SectionHead>

            <div className="grid gap-[18px] md:grid-cols-2">
              <PathCard
                recommended
                who="Opção A · recomendada"
                title="A Web Makers produz"
                price="R$ 1.690"
                unit="/mês"
                note="R$ 2.490 a partir do 4º mês"
                items={[
                  ["6 criativos de anúncio por mês, sendo 2 em vídeo"],
                  ["6 estáticos, 3 carrosséis e 3 Reels para o seu perfil"],
                  ["Peça nova sempre que uma cansar, sem custo extra"],
                  ["Você só aprova — leva minutos por semana"],
                ]}
              />
              <PathCard
                who="Opção B"
                title="Você entrega os materiais"
                price="R$ 1.290"
                unit="/mês"
                note="R$ 1.790 a partir do 4º mês"
                items={[
                  ["Você envia as peças prontas, nos formatos combinados"],
                  ["A gente escreve os textos e ajusta os recortes"],
                  ["Sem produção de imagem, vídeo ou carrossel", true],
                  ["Sem posts de conteúdo para o seu perfil", true],
                ]}
              />
            </div>

            <div className="mt-[18px] rounded-2xl border border-line bg-surface-sunken px-6 py-5">
              <h3 className="mb-3 font-display text-[15px] font-bold text-brand-900">
                O que é exatamente igual nas duas opções
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Campanhas no Meta e no Google",
                  "Instalação e manutenção da medição",
                  "Textos dos anúncios",
                  "Públicos e remarketing",
                  "2 revisões por semana",
                  "Relatório quinzenal + call mensal",
                  "Ajuste sazonal de verba",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-white px-[13px] py-[5px] text-[13.5px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[14.5px] text-ink-soft">
                A gestão de tráfego é a mesma nos dois casos — e ela é a maior parte do trabalho. A
                diferença de preço é só a produção das peças, por isso a economia é de R$ 400 e não
                de metade do valor.
              </p>
            </div>

            <div
              className="mt-[18px] space-y-2 rounded-r-xl border-l-[3px] bg-surface-sunken px-6 py-5"
              style={{ borderLeftColor: TEAL }}
            >
              <p>
                <strong className="text-brand-900">
                  A contrapartida da Opção B, dita com todas as letras:
                </strong>{" "}
                anúncio cansa. O mesmo criativo rodando quatro semanas para o mesmo público perde
                entrega e encarece cada contato — é o motivo nº 1 de campanha que começa bem e murcha
                no segundo mês.
              </p>
              <p>
                Por isso a Opção B pressupõe{" "}
                <strong className="text-brand-900">
                  no mínimo 6 peças novas por mês, entregues até o dia 25
                </strong>
                , nos formatos 9:16 (vertical) e 4:5, com direito de uso. Se o material não chegar,
                as campanhas seguem com o que existe e o desempenho cai — e essa parte deixa de estar
                sob nosso controle. A economia é real; o compromisso também.
              </p>
            </div>
          </section>

          {/* outras faixas */}
          <section className="py-11">
            <SectionHead eyebrow="Outras faixas" title="Se quiser comparar">
              Todos os planos seguem a mesma regra: o valor abaixo é só o serviço. A verba de anúncio
              é sempre sua, à parte.
            </SectionHead>
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[560px] text-[15px]">
                <thead>
                  <tr className="bg-surface-sunken">
                    {["Plano", "Serviço/mês", "Canais", "Verba de anúncio sugerida"].map((h) => (
                      <th
                        key={h}
                        className="border-b border-line px-[18px] py-[14px] text-left font-display text-[13px] font-bold uppercase tracking-wide text-brand-900"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Essencial", "R$ 1.490", "Meta Ads", "R$ 1.500 – 3.000", false],
                    ["Crescimento", "R$ 2.490", "Meta + Google", "R$ 2.400 – 6.000", true],
                    [
                      "Crescimento · você entrega os materiais",
                      "R$ 1.790",
                      "Meta + Google",
                      "R$ 2.400 – 6.000",
                      false,
                    ],
                    ["Performance", "R$ 3.900", "Meta + Google + remarketing", "R$ 6.000+", false],
                  ].map(([plano, preco, canais, verba, pick]) => (
                    <tr key={plano} className={pick ? "bg-surface-tint" : ""}>
                      <td
                        className={
                          "border-b border-line px-[18px] py-[14px] last:border-b-0 " +
                          (pick ? "shadow-[inset_3px_0_0_#39B6EB]" : "")
                        }
                      >
                        {plano}
                        {pick ? (
                          <span className="ml-2 rounded-full bg-brand-600 px-2 py-[3px] align-[2px] text-[11px] font-bold uppercase tracking-wider text-white">
                            sua proposta
                          </span>
                        ) : null}
                      </td>
                      <td className="whitespace-nowrap border-b border-line px-[18px] py-[14px] font-bold tabular-nums text-brand-900">
                        {preco}
                      </td>
                      <td className="border-b border-line px-[18px] py-[14px]">{canais}</td>
                      <td className="whitespace-nowrap border-b border-line px-[18px] py-[14px] font-bold tabular-nums text-brand-900">
                        {verba}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* o que precisamos */}
          <section className="py-11">
            <SectionHead eyebrow="Antes de começar" title="O que precisamos de você">
              Nada aqui custa dinheiro. São acessos e decisões — e a maioria leva poucos minutos. Os
              três primeiros são os que travam tudo.
            </SectionHead>
            <div>
              <Numbered n="01" title="Definir o que conta como um cliente">
                <p>
                  Hoje tudo cai no seu WhatsApp. Precisamos combinar o que é um contato válido — uma
                  pessoa perguntando data e valor, por exemplo — para o Meta e o Google aprenderem a
                  buscar mais pessoas parecidas com ela. Sem isso, as campanhas gastam e entregam
                  relatório bonito sem trazer contrato.
                </p>
              </Numbered>
              <Numbered n="02" title="Acesso de parceira às suas contas">
                <p>
                  Seu Instagram precisa estar como conta profissional e ligado a uma Página do
                  Facebook. Você nos concede acesso de parceira — não precisa entregar senha nenhuma,
                  e você pode revogar quando quiser.
                </p>
              </Numbered>
              <Numbered n="03" title="Conta de anúncios no seu nome, com seu cartão">
                <p>
                  No Meta e no Google. Se ainda não tiver, a gente cria junto com você. A titularidade
                  é sempre sua.
                </p>
              </Numbered>
              <Numbered n="04" title="Sua base e o raio que você atende">
                <p>
                  De onde você sai e até onde vale a pena ir — inclusive se você cobra deslocamento
                  acima de certa distância. Hoje isso não aparece em nenhum lugar do seu site nem do
                  seu perfil, e é o que mais desperdiça verba se a gente errar.
                </p>
              </Numbered>
              <Numbered n="05" title="Faixa de preço por formato">
                <p>
                  Voz &amp; Violão, Flash&apos;N Pop e Banda ReMix. Não vamos publicar valor sem sua
                  autorização, mas sem saber o ticket não dá para escrever anúncio que atrai quem
                  pode pagar e afasta quem não pode.
                </p>
              </Numbered>
              <Numbered n="06" title="Fotos, vídeos e depoimentos reais">
                <p>
                  Especialmente dos eventos corporativos — Siemens e Multfer no seu portfólio valem
                  mais que qualquer texto que a gente escreva. Se houver depoimento de cliente com
                  nome e foto, melhor ainda.
                </p>
              </Numbered>
            </div>
          </section>

          {/* acesso ao site */}
          <section className="py-11">
            <SectionHead eyebrow="Acesso ao site" title="O que precisamos instalar em orenancamargo.com.br">
              Hoje o seu site não tem nenhuma medição instalada — nem do Meta, nem do Google. Na
              prática, um anúncio que rodasse hoje seria às cegas: daria para ver cliques, mas não
              para saber quais viraram conversa no WhatsApp. É isso que resolvemos antes de subir
              qualquer campanha.
            </SectionHead>
            <div>
              <Numbered n="01" title="Acesso de edição ao site — uma vez só">
                <p>
                  Precisamos inserir <strong className="text-brand-900">um único trecho de código</strong>
                  : o Gerenciador de Tags do Google, no topo das páginas. Depois dele instalado, o
                  Pixel do Meta, a tag de conversão do Google Ads e o Google Analytics entram, saem e
                  mudam sem nunca mais mexer no site.
                </p>
                <p>
                  Se preferir não dar acesso, enviamos o trecho pronto e quem cuida do seu site cola.
                  Leva cerca de 10 minutos e não altera nada do que aparece na tela.
                </p>
              </Numbered>
              <Numbered n="02" title="Quem administra o domínio">
                <p>
                  O Meta exige comprovar que o <em>orenancamargo.com.br</em> é seu — por um registro
                  no DNS ou por uma linha dentro do site. Sem essa verificação, o iPhone corta boa
                  parte da medição e as campanhas ficam limitadas no público que mais importa para
                  casamento.
                </p>
              </Numbered>
              <Numbered n="03" title="Autorização para identificar os botões de WhatsApp">
                <p>
                  Hoje existem cinco botões iguais na página, todos com a mesma mensagem pronta e sem
                  nenhuma identificação. Quando o contato cai no seu celular, não há como saber se
                  veio do topo do site, da seção de casamento ou de um anúncio. Marcamos cada um —
                  sem mudar uma vírgula do que você vê.
                </p>
              </Numbered>
              <Numbered n="04" title="A imagem que aparece quando compartilham seu link">
                <p>
                  Quando alguém manda o link do seu site no WhatsApp, a miniatura hoje vem de um
                  servidor da ferramenta com que o site foi construído — e o nome dela está no código
                  da página. Trocamos por uma imagem sua. Isso afeta o anúncio diretamente, porque
                  boa parte do tráfego de casamento chega por link repassado entre amigas.
                </p>
              </Numbered>
              <Numbered n="05" title="Segunda fase, a partir do mês 2">
                <p>
                  Medição pelo servidor, além do navegador. Bloqueadores de anúncio e o Safari fazem
                  perder de 20% a 40% dos eventos, e essa camada recupera boa parte. Combinamos
                  quando chegar a hora — não é impedimento para começar.
                </p>
              </Numbered>
            </div>
            <Callout>
              <p>
                <strong className="text-brand-900">Nenhum desses passos pede a sua senha.</strong>{" "}
                Google, Meta e Instagram funcionam por concessão de acesso: você adiciona a Web Makers
                como parceira e remove quando quiser, sem compartilhar credencial nenhuma e sem perder
                a titularidade de nada.
              </p>
            </Callout>
          </section>
        </div>

        {/* fechamento */}
        <div className="mt-5 border-t border-line bg-surface-sunken">
          <div className="mx-auto max-w-[940px] px-6 py-12">
            <div className="max-w-[660px]">
              <Eyebrow>Próximo passo</Eyebrow>
              <h2 className="mt-3 font-display text-[22px] font-extrabold leading-tight tracking-tight text-brand-900 sm:text-[26px]">
                Uma conversa de 30 minutos
              </h2>
              <p className="mt-3 text-ink-soft">
                Antes de qualquer assinatura: a gente senta, você conta como funciona a sua agenda
                hoje, e a gente fecha juntos os itens acima. Se ao fim dessa conversa não fizer
                sentido, não fazemos — sem custo e sem insistência.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">
                Falar no WhatsApp
              </a>
              <p className="mt-4 text-sm text-ink-soft">
                Web Makers · (19) 98933-1908 · Mogi Guaçu-SP
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[940px] px-6">
          <footer className="flex flex-wrap justify-between gap-4 border-t border-line py-7 text-[13.5px] text-ink-soft">
            <span>Web Makers · webmakers.dev.br</span>
            <span>Proposta para Renan Camargo · setembro de 2026</span>
          </footer>
        </div>
      </div>
    </>
  );
}
