import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  // YouTube API
  YOUTUBE_API_KEY: z.string().optional(),
  YOUTUBE_CHANNEL_ID: z.string().optional(),
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

  // Sync Protection & Security
  SYNC_SECRET_KEY: z.string().default("dream_biker_sync_secret_dev"),

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
  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    console.warn(
      "⚠️ [ENV WARN] Some server environment variables are invalid or missing:",
      result.error.format()
    );
    // Return safe fallbacks so the application never crashes on startup
    return {
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || "",
      YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || "",
      YOUTUBE_API_ENABLED: process.env.YOUTUBE_API_ENABLED === "true",
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "",
      FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "",
      FACEBOOK_PAGE_ID: process.env.FACEBOOK_PAGE_ID || "",
      FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "",
      FACEBOOK_GRAPH_API_VERSION: process.env.FACEBOOK_GRAPH_API_VERSION || "v22.0",
      FACEBOOK_API_ENABLED: process.env.FACEBOOK_API_ENABLED === "true",
      SYNC_SECRET_KEY: process.env.SYNC_SECRET_KEY || "dream_biker_sync_secret_dev",
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      DATABASE_URL: process.env.DATABASE_URL || "",
      SOCIAL_SYNC_ENABLED: process.env.SOCIAL_SYNC_ENABLED !== "false",
      SOCIAL_SYNC_INTERVAL_MINUTES: 30,
      SOCIAL_SYNC_INITIAL_LOOKBACK_DAYS: 365,
    };
  }
  return result.data;
}

export const serverEnv = getValidatedServerEnv();
