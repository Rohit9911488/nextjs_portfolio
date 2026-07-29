import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The floating dev-mode route indicator (the small circular button in the
  // corner) is a Next.js dev affordance, not part of this app's UI.
  devIndicators: false,
  serverExternalPackages: ["@libsql/client", "@prisma/adapter-libsql"],
  experimental: {
    optimizePackageImports: ["gsap", "lenis"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
