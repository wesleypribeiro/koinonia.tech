import { NextResponse, type NextRequest } from "next/server";

const PLANOS_HOST = "planos.koinoniadev.com.br";
const SITE_URL = "https://www.koinoniadev.com.br";

/**
 * planos.koinoniadev.com.br mostra a página /planos.
 * - "/" no subdomínio exibe /planos (sem mudar o endereço).
 * - Outras páginas no subdomínio vão para o site principal.
 * - /planos no site principal vai para o subdomínio.
 */
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0];
  const { pathname, search } = req.nextUrl;

  if (host === PLANOS_HOST) {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/planos${search}`, req.url));
    }
    if (pathname === "/planos") {
      return NextResponse.redirect(new URL(`/${search}`, req.url), 308);
    }
    return NextResponse.redirect(`${SITE_URL}${pathname}${search}`, 308);
  }

  if (pathname === "/planos" && host.endsWith("koinoniadev.com.br")) {
    return NextResponse.redirect(`https://${PLANOS_HOST}/${search}`, 308);
  }

  return NextResponse.next();
}

// Ignora arquivos (imagens, robots.txt, sitemap.xml) e os internos do Next.
export const config = {
  matcher: ["/((?!_next/|_vercel/|.*\\.[a-zA-Z0-9]+$).*)"],
};
