/**
 * The site's public base URL (canonical links, Open Graph, sitemap, robots).
 *
 * 1. NEXT_PUBLIC_SITE_URL when set (the custom domain)
 * 2. otherwise Vercel's production domain (set automatically on Vercel)
 * 3. otherwise http://localhost:3000
 *
 * A localhost value copied from .env.local into Vercel is ignored when Vercel
 * provides a real domain, so search engines never get localhost links.
 */
export function resolveSiteUrl(input: {
  explicit?: string;
  vercelProductionHost?: string;
}): string {
  const explicit = input.explicit?.trim().replace(/\/+$/, "");
  const vercelHost = input.vercelProductionHost?.trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const vercelUrl = vercelHost ? `https://${vercelHost}` : undefined;

  const isLocal = (url: string) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(url);

  if (explicit && !(isLocal(explicit) && vercelUrl)) return explicit;
  return vercelUrl || explicit || "http://localhost:3000";
}

// Literal process.env reads so Next can inline the NEXT_PUBLIC_ values.
export const siteUrl = resolveSiteUrl({
  explicit: process.env.NEXT_PUBLIC_SITE_URL,
  vercelProductionHost:
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
});
