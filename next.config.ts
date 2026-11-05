import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // O celular abre o servidor de desenvolvimento pelo IP da rede. Sem isto o Next recusa os scripts
  // e a página chega sem JavaScript (menu, botões e ilustrações param de funcionar).
  allowedDevOrigins: ["192.168.0.19", "192.168.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
