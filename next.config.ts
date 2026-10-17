import type { NextConfig } from "next";

/**
 * Legacy URLs from the generalist site. statusCode 301 (not `permanent`, which emits 308) as the
 * rebuild spec requires. Order matters: the services rule must win over the generic /en rule.
 */
const legacyRedirects = [
  { source: "/en/services/:path*", destination: "/" },
  { source: "/es/:path*", destination: "/" },
  { source: "/es", destination: "/" },
  { source: "/en", destination: "/" },
  { source: "/en/:path*", destination: "/:path*" },
].map((r) => ({ ...r, statusCode: 301 as const }));

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  images: {
    // Higgsfield CDN (content/media.ts). Drop once media is self-hosted under /public/media.
    remotePatterns: [{ protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" }],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
