import Head from "next/head";

// Tela de desbloqueio das propostas. O middleware faz REWRITE para cá quando
// falta a chave, então a URL na barra continua sendo a da proposta — e o
// formulário abaixo, um GET sem `action`, volta para ela com ?k=<chave>.
// Sem JavaScript: é um form HTML puro, funciona até com script bloqueado.
//
// getServerSideProps só existe para ler o motivo do bloqueio no servidor. Numa
// página estática o `router.query` chega vazio no primeiro render e a mensagem
// de erro piscaria depois da hidratação.
export async function getServerSideProps({ query }) {
  const e = typeof query.e === "string" ? query.e : null;
  return { props: { erro: e === "errada" || e === "indisponivel" ? e : null } };
}

export default function AcessoProposta({ erro }) {
  const indisponivel = erro === "indisponivel";

  return (
    <>
      <Head>
        <title>Proposta protegida | Web Makers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="flex min-h-screen items-center justify-center bg-surface-sunken px-6 py-16">
        <div className="w-full max-w-[420px]">
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
            {indisponivel ? (
              <>
                <h1 className="font-display text-[22px] font-extrabold leading-tight tracking-tight text-brand-900">
                  Proposta indisponível
                </h1>
                <p className="mt-3 text-[15px] text-ink-soft">
                  Este endereço não corresponde a nenhuma proposta ativa. Se você recebeu o link de
                  nós, responda a mesma conversa que a gente reenvia.
                </p>
              </>
            ) : (
              <>
                <h1 className="font-display text-[22px] font-extrabold leading-tight tracking-tight text-brand-900">
                  Sua proposta é privada
                </h1>
                <p className="mt-3 text-[15px] text-ink-soft">
                  Para abrir, informe os <strong className="text-ink">4 últimos dígitos do seu
                  WhatsApp</strong> — o mesmo número pelo qual a gente conversou.
                </p>

                <form method="get" className="mt-6">
                  <label htmlFor="k" className="sr-only">
                    Últimos 4 dígitos do seu WhatsApp
                  </label>
                  <input
                    id="k"
                    name="k"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    autoComplete="off"
                    autoFocus
                    placeholder="0000"
                    aria-invalid={erro === "errada" ? "true" : undefined}
                    aria-describedby={erro === "errada" ? "erro" : undefined}
                    className={
                      "w-full rounded-[10px] border bg-white px-4 py-3 text-center font-display text-[28px] font-extrabold tracking-[0.4em] tabular-nums text-brand-900 outline-none transition-colors placeholder:font-normal placeholder:tracking-[0.4em] placeholder:text-ink-faint/50 focus:ring-2 focus:ring-brand-300 " +
                      (erro === "errada" ? "border-[#C9372C]" : "border-[#DFE1E6] focus:border-brand-600")
                    }
                  />
                  {erro === "errada" ? (
                    <p id="erro" className="mt-2 text-center text-sm font-medium text-[#C9372C]">
                      Chave incorreta. Confira os 4 últimos dígitos.
                    </p>
                  ) : null}
                  <button type="submit" className="btn-primary mt-4 w-full">
                    Abrir proposta
                  </button>
                </form>
              </>
            )}
          </div>

          <p className="mt-5 text-center text-[13px] text-ink-soft">
            Não é você quem deveria ver isto?{" "}
            <a
              href="https://webmakers.dev.br"
              className="font-semibold text-brand-700 hover:text-brand-600"
            >
              Conheça a Web Makers
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
