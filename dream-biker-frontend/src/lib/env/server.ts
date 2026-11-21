import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  // YouTube API
  YOUTUBE_API_KEY: z.string().optional(),
  YOUTUBE_CHANNEL_ID: z.string().optional(),
  YOUTUBE_CHANNEL_HANDLE: z.string().optional(),
  YOUTUBE_API_ENABLED: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1"),

  // Facebook Graph API
  FACEBOOK_APP_ID: z.string().optional(),
  FACEBOOK_APP_SECRET: z.string().optional(),
  FACEBOOK_PAGE_ID: z.string().optional(),
  FACEBOOK_PAGE_ACCESS_TOKEN: z.string().optional(),
  FACEBOOK_GRAPH_API_VERSION: z.string().default("v22.0"),
  FACEBOOK_API_ENABLED: z
    .string()
    .optional()
    .transform((val) => val === "true" || val === "1"),

  // Sync Protection & Security.
  // No default: if neither secret is set, every protected endpoint rejects requests.
  SYNC_SECRET_KEY: z.string().optional(),
  // Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` automatically.
  CRON_SECRET: z.string().optional(),

  // Site URL
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),


  // Optional PostgreSQL Database
  DATABASE_URL: z.string().optional(),

  // Sync Settings
  SOCIAL_SYNC_ENABLED: z
    .string()
    .optional()
    .default("true")
    .transform((val) => val === "true" || val === "1"),
  SOCIAL_SYNC_INTERVAL_MINUTES: z
    .string()
    .optional()
    .default("30")
    .transform((val) => parseInt(val, 10) || 30),
  SOCIAL_SYNC_INITIAL_LOOKBACK_DAYS: z
    .string()
    .optional()
    .default("365")
    .transform((val) => parseInt(val, 10) || 365),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function getValidatedServerEnv(): ServerEnv {
  const input: Record<string, string | undefined> = {
    ...process.env,
    // Accept the older documented name as an alias.
    FACEBOOK_PAGE_ACCESS_TOKEN:
      process.env.FACEBOOK_PAGE_ACCESS_TOKEN || process.env.FACEBOOK_ACCESS_TOKEN,
  };

  const result = serverEnvSchema.safeParse(input);
  if (!result.success) {
    console.warn(
      "⚠️ [ENV WARN] Some server environment variables are invalid or missing:",
      result.error.format()
    );
    // Return safe fallbacks so the application never crashes on startup
    return {
      YOUTUBE_API_KEY: input.YOUTUBE_API_KEY || "",
      YOUTUBE_CHANNEL_ID: input.YOUTUBE_CHANNEL_ID || "",
      YOUTUBE_CHANNEL_HANDLE: input.YOUTUBE_CHANNEL_HANDLE || "",
      YOUTUBE_API_ENABLED: input.YOUTUBE_API_ENABLED === "true",
      FACEBOOK_APP_ID: input.FACEBOOK_APP_ID || "",
      FACEBOOK_APP_SECRET: input.FACEBOOK_APP_SECRET || "",
      FACEBOOK_PAGE_ID: input.FACEBOOK_PAGE_ID || "",
      FACEBOOK_PAGE_ACCESS_TOKEN: input.FACEBOOK_PAGE_ACCESS_TOKEN || "",
      FACEBOOK_GRAPH_API_VERSION: input.FACEBOOK_GRAPH_API_VERSION || "v22.0",
      FACEBOOK_API_ENABLED: input.FACEBOOK_API_ENABLED === "true",
      SYNC_SECRET_KEY: input.SYNC_SECRET_KEY || "",
      CRON_SECRET: input.CRON_SECRET || "",
      NEXT_PUBLIC_SITE_URL: input.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      DATABASE_URL: input.DATABASE_URL || "",
      SOCIAL_SYNC_ENABLED: input.SOCIAL_SYNC_ENABLED !== "false",
      SOCIAL_SYNC_INTERVAL_MINUTES: 30,
      SOCIAL_SYNC_INITIAL_LOOKBACK_DAYS: 365,
    };
  }
  return result.data;
}

export const serverEnv = getValidatedServerEnv();
