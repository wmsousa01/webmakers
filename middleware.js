import { NextResponse } from "next/server";
import { verificar } from "./lib/propostaToken.mjs";

// Dois portões, um middleware.
//
//   /painel/*    Basic Auth — superfície interna da agência.
//   /proposta/*  link assinado com validade — documento comercial que existe
//                só durante a negociação. Ver lib/propostaToken.mjs.
//
// Ambos falham FECHADOS: sem a env configurada, a rota não abre. Uma superfície
// desprotegida é pior que uma inacessível.
export const config = { matcher: ["/painel/:path*", "/proposta/:path*"] };

const COOKIE_PREFIX = "wm_prop_";

export async function middleware(req) {
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

async function propostaGate(req) {
  const url = req.nextUrl;
  const slug = url.pathname.split("/")[2] || "";

  // A tela de aviso mora dentro de /proposta e precisa ficar fora do portão,
  // senão o rewrite abaixo vira loop.
  if (slug === "acesso") return NextResponse.next();

  const secret = process.env.PROPOSTA_SECRET;
  if (!secret) return aviso(url, "indisponivel");

  // O cookie guarda o próprio token e é reverificado a cada request — assim a
  // validade vale também para quem já abriu: passou da data, fecha sozinho.
  const doCookie = req.cookies.get(COOKIE_PREFIX + slug)?.value;
  if (doCookie) {
    const r = await verificar({ token: doCookie, slug, secret });
    if (r.ok) return NextResponse.next();
    if (r.motivo === "expirada") return aviso(url, "expirada");
  }

  const doLink = url.searchParams.get("t");
  if (doLink) {
    const r = await verificar({ token: doLink, slug, secret });
    if (r.ok) {
      // Token bom: guarda no cookie e devolve a URL limpa, para o endereço que
      // o cliente vê (e eventualmente repassa) não carregar o token à mostra.
      const limpa = url.clone();
      limpa.searchParams.delete("t");
      const res = NextResponse.redirect(limpa);
      res.cookies.set(COOKIE_PREFIX + slug, doLink, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: url.pathname,
        // O cookie morre junto com o token, nunca depois dele.
        expires: new Date(r.exp * 1000),
      });
      return res;
    }
    return aviso(url, r.motivo);
  }

  return aviso(url, "ausente");
}

/** Rewrite (não redirect): a URL na barra continua sendo a da proposta, então o
 *  cliente pode reenviar o link certo sem se perder. */
function aviso(url, motivo) {
  const to = url.clone();
  to.pathname = "/proposta/acesso";
  to.search = "";
  to.searchParams.set("e", motivo);
  return NextResponse.rewrite(to);
}
