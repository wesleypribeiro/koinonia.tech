import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Páginas de demonstração de clientes: public/<slug>/index.html abre em /<slug>.
  // Fica em afterFiles, então as rotas do app (/, /bio, /planos) vêm antes.
  async rewrites() {
    return {
      // Café da Ane: o cardápio com pedidos é o app cafe-da-ane-cardapio (Vercel), servido aqui dentro.
      beforeFiles: [
        {
          // sem redirecionamento: o app redireciona para a barra no fim e o Next tira a barra (laço)
          source: "/cafe-da-ane-campos-do-jordao/cardapio",
          destination:
            "https://cafe-da-ane-cardapio.vercel.app/cafe-da-ane-campos-do-jordao/cardapio/pedir/cafe-da-ane",
        },
        {
          source: "/cafe-da-ane-campos-do-jordao/cardapio/:path*",
          destination: "https://cafe-da-ane-cardapio.vercel.app/cafe-da-ane-campos-do-jordao/cardapio/:path*",
        },
        // Esfihou!: mesmo esquema, app esfihou-cardapio (Vercel).
        {
          source: "/esfihou-campos-do-jordao/cardapio",
          destination:
            "https://esfihou-cardapio.vercel.app/esfihou-campos-do-jordao/cardapio/pedir/esfihou",
        },
        {
          source: "/esfihou-campos-do-jordao/cardapio/:path*",
          destination: "https://esfihou-cardapio.vercel.app/esfihou-campos-do-jordao/cardapio/:path*",
        },
      ],
      afterFiles: [{ source: "/:slug", destination: "/:slug/index.html" }],
      fallback: [],
    };
  },
};

export default nextConfig;
