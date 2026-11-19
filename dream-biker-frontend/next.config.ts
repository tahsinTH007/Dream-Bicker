import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
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
      {
        protocol: "https",
        hostname: "picsum.photos",
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
};

export default nextConfig;
