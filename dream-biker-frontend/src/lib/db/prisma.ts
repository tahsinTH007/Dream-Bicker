import "server-only";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "") {
    return null;
  }

  try {
    const client =
      global.prisma ||
      new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      });

    if (process.env.NODE_ENV !== "production") {
      global.prisma = client;
    }

    return client;
  } catch (error) {
    console.warn("⚠️ Failed to initialize Prisma Client:", error);
    return null;
  }
}

export const prisma = createPrismaClient();

export function isDatabaseConfigured(): boolean {
  return Boolean(prisma && process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "");
}
