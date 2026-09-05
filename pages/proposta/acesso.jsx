import Head from "next/head";

// Tela de aviso das propostas. O middleware faz REWRITE para cá quando o link
// não abre, então a URL na barra continua sendo a da proposta.
//
// Não há campo para digitar nada: o acesso é o link assinado que a gente
// enviou. Quando ele morre, o caminho é pedir outro — por isso a tela é um
// convite a responder no WhatsApp, e não um beco sem saída.
//
// getServerSideProps só existe para ler o motivo no servidor. Numa página
// estática o router.query chega vazio no primeiro render e a mensagem piscaria
// depois da hidratação.
export async function getServerSideProps({ query }) {
  const aceitos = ["expirada", "invalida", "ausente", "indisponivel"];
  const e = typeof query.e === "string" && aceitos.includes(query.e) ? query.e : "ausente";
  return { props: { motivo: e } };
}

const TEXTOS = {
  expirada: {
    titulo: "O prazo desta proposta terminou",
    corpo:
      "O link valia enquanto a proposta estava de pé. Se ainda quiser seguir, é só pedir — a gente revisa os valores, confirma o que mudou e envia um link novo.",
    botao: "Pedir uma proposta atualizada",
    zap: "Oi! A proposta que voces me enviaram expirou. Da pra reenviar?",
  },
  ausente: {
    titulo: "Esta proposta é privada",
    corpo:
      "Ela abre pelo link que enviamos diretamente a você. Se você chegou aqui digitando o endereço, ou se perdeu a conversa, a gente reenvia sem problema.",
    botao: "Pedir o link da proposta",
    zap: "Oi! Preciso do link da proposta de voces.",
  },
  invalida: {
    titulo: "Este link não é válido",
    corpo:
      "Pode ter sido copiado pela metade — acontece quando o endereço quebra em duas linhas no WhatsApp. Tente abrir de novo pela conversa original, ou peça outro.",
    botao: "Pedir outro link",
    zap: "Oi! O link da proposta nao esta abrindo aqui.",
  },
  indisponivel: {
    titulo: "Proposta indisponível",
    corpo:
      "Este endereço não corresponde a nenhuma proposta ativa no momento. Se você recebeu o link de nós, responda a mesma conversa que a gente verifica.",
    botao: "Falar com a Web Makers",
    zap: "Oi! Tentei abrir uma proposta de voces e apareceu indisponivel.",
  },
};

export default function AcessoProposta({ motivo }) {
  const t = TEXTOS[motivo] || TEXTOS.ausente;
  const zap = `https://wa.me/5519989331908?text=${encodeURIComponent(t.zap)}`;

  return (
    <>
      <Head>
        <title>Proposta privada | Web Makers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="flex min-h-screen items-center justify-center bg-surface-sunken px-6 py-16">
        <div className="w-full max-w-[440px]">
          <div className="mb-7 flex items-center gap-3">
            <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-brand-600 font-display text-sm font-extrabold tracking-tight text-white">
              wm
            </span>
            <span>
              <span className="block font-display text-[17px] font-extrabold tracking-tight text-brand-900">
                Web Makers
              </span>
              <span className="block text-[13px] text-ink-soft">webmakers.dev.br</span>
            </span>
          </div>

          <div className="rounded-2xl border border-line bg-white p-7 shadow-card">
            <h1 className="font-display text-[22px] font-extrabold leading-tight tracking-tight text-brand-900">
              {t.titulo}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t.corpo}</p>
            <a href={zap} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
              {t.botao}
            </a>
          </div>

          <p className="mt-5 text-center text-[13px] text-ink-soft">
            Web Makers · (19) 98933-1908 ·{" "}
            <a href="https://webmakers.dev.br" className="font-semibold text-brand-700 hover:text-brand-600">
              webmakers.dev.br
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
