import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Security headers on every response.
 * The CSP only sets directives that don't need per-request nonces (Next injects
 * inline scripts, so a strict script-src would need middleware-generated nonces).
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      // only in production: on http://localhost it would break asset loading
      ...(isProd ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
  // HSTS only in production (browsers ignore it on http://localhost anyway)
  ...(isProd
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
    : []),
];

const nextConfig: NextConfig = {
  // don't advertise the framework in an X-Powered-By header
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Next 16 only allows quality 75 by default and silently lowers any other
    // `quality` prop to it. 90 is used for the hero/portrait/footer photos.
    qualities: [75, 90],
    // AVIF first (~20-30% smaller than WebP), WebP for browsers without it
    formats: ["image/avif", "image/webp"],
    // Fewer candidate widths (default is 15). Facebook image URLs are ~300-600
    // characters, and every width repeats the URL in each image's srcset, so the
    // default list made the HTML ~90 KB heavier. These still cover phones
    // (1x-3x), tablets, laptops and 1920px screens.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "**.facebook.com",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/humanitarian-work",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/stories",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/stories/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/achievements",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/social",
        destination: "/videos",
        permanent: true,
      },
      {
        source: "/social/:path*",
        destination: "/videos",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
