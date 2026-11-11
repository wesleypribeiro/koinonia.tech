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
      beforeFiles: [],
      afterFiles: [{ source: "/:slug", destination: "/:slug/index.html" }],
      fallback: [],
    };
  },
};

export default nextConfig;
