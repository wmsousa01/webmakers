import { NextResponse } from "next/server";

// Basic-auth gate for the ops panel. Credentials come from env (PANEL_USER /
// PANEL_PASSWORD). Fail-closed: if the env isn't set, the panel stays locked
// (an unprotected admin surface is worse than an unreachable one).
export const config = { matcher: ["/painel/:path*"] };

export function middleware(req) {
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
