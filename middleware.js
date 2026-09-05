import { NextResponse } from "next/server";

// Dois portões, um middleware.
//
//   /painel/*    Basic Auth — superfície interna da agência.
//   /proposta/*  chave numérica por cliente — documento comercial com um
//                destinatário só. Não é Basic Auth de propósito: o cliente abre
//                no celular, e digitar 4 dígitos num campo é menos atrito que o
//                prompt de usuário e senha do navegador.
//
// Ambos falham FECHADOS: sem a env configurada, a rota não abre. Uma superfície
// desprotegida é pior que uma inacessível.
export const config = { matcher: ["/painel/:path*", "/proposta/:path*"] };

const COOKIE_PREFIX = "wm_prop_";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/painel")) return painelGate(req);
  return propostaGate(req);
}

// ---------------------------------------------------------------- /painel

function painelGate(req) {
  const user = process.env.PANEL_USER;
  const pass = process.env.PANEL_PASSWORD;
  const deny = (msg) =>
    new NextResponse(msg, {
      status: 401,
      // Sem travessão nem acento: cabeçalho HTTP é ByteString (latin-1) e um
      // caractere fora de 0-255 faz o NextResponse lançar — o painel devolvia
      // 500 em vez do 401 que abre o prompt de login do navegador.
      headers: { "WWW-Authenticate": 'Basic realm="Web Makers Painel"' },
    });

  if (!user || !pass) return deny("Painel não configurado (defina PANEL_USER e PANEL_PASSWORD).");

  const header = req.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const [u, p] = atob(encoded).split(":");
    if (u === user && p === pass) return NextResponse.next();
  }
  return deny("Autenticação necessária.");
}

// -------------------------------------------------------------- /proposta

/** PROPOSTA_KEYS = "renan-camargo:7975,outro-cliente:1234" → { slug: chave } */
function parseKeys(raw) {
  const map = {};
  for (const pair of String(raw || "").split(",")) {
    const i = pair.indexOf(":");
    if (i < 0) continue;
    const slug = pair.slice(0, i).trim();
    const key = pair.slice(i + 1).trim();
    if (slug && key) map[slug] = key;
  }
  return map;
}

function propostaGate(req) {
  const url = req.nextUrl;
  const slug = url.pathname.split("/")[2] || "";

  // A tela de desbloqueio mora dentro de /proposta e precisa ficar fora do
  // portão, senão o rewrite abaixo vira loop.
  if (slug === "acesso") return NextResponse.next();

  const expected = parseKeys(process.env.PROPOSTA_KEYS)[slug];
  // Proposta sem chave configurada não abre para ninguém — nem com chave certa.
  if (!expected) return unlock(url, "indisponivel");

  if (req.cookies.get(COOKIE_PREFIX + slug)?.value === expected) {
    return NextResponse.next();
  }

  const tentativa = url.searchParams.get("k");
  if (tentativa && tentativa === expected) {
    // Chave certa: guarda no cookie e devolve a URL limpa, para o link que o
    // cliente eventualmente repassar não carregar a chave à mostra.
    const limpa = url.clone();
    limpa.searchParams.delete("k");
    const res = NextResponse.redirect(limpa);
    res.cookies.set(COOKIE_PREFIX + slug, expected, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: url.pathname,
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  }

  return unlock(url, tentativa ? "errada" : null);
}

/** Rewrite (não redirect) para a URL na barra continuar sendo a da proposta —
 *  assim o formulário de desbloqueio faz GET de volta para ela mesma. */
function unlock(url, erro) {
  const to = url.clone();
  to.pathname = "/proposta/acesso";
  to.search = "";
  if (erro) to.searchParams.set("e", erro);
  return NextResponse.rewrite(to);
}
