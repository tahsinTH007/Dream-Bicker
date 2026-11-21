import "server-only";
import { siteConfig } from "@/config/site.config";
import { FacebookClient } from "./facebook/facebook.client";
import type { FacebookPageResponse } from "./facebook/facebook.types";

export interface ContactInfo {
  email: string;
  /** Public phone from the Facebook page's About section; null when not set or not public. */
  phone: string | null;
  /** Where the details came from. */
  source: "facebook" | "config";
}

/** Pure mapping (unit-tested): Facebook page fields first, site config as fallback. */
export function pickContactInfo(page: Pick<FacebookPageResponse, "phone" | "emails"> | null): ContactInfo {
  const phone = page?.phone?.trim() || null;
  const email = page?.emails?.find((e) => e.includes("@"))?.trim() || siteConfig.contact.email;
  return { email, phone, source: page ? "facebook" : "config" };
}

/**
 * Contact details shown on the site, read live from the Facebook page's About
 * section (the Graph API fetch is cached for 1 hour). A phone number added
 * publicly on Facebook appears automatically; nothing to edit in the code.
 */
export async function getContactInfo(): Promise<ContactInfo> {
  const client = new FacebookClient();
  if (!client.isConfigured()) return pickContactInfo(null);
  try {
    return pickContactInfo(await client.getPage());
  } catch (error) {
    console.warn("⚠️ [contact-info] Facebook page details unavailable:", error instanceof Error ? error.message : error);
    return pickContactInfo(null);
  }
}

/** `tel:` link target from a human-written number ("+880 1712-345678" -> "+8801712345678"). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
