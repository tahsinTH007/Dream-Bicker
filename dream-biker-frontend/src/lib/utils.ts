import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Ensures any Facebook, YouTube, or social URL is an absolute, fully-qualified web URL
 * (e.g. converting relative API paths like "/reel/12345" or "/videos/12345" into "https://www.facebook.com/reel/12345").
 */
export function formatSocialUrl(url?: string | null, provider?: string): string {
  if (!url || !url.trim()) {
    if (provider === "FACEBOOK") return "https://www.facebook.com/BuydreambyHanif";
    if (provider === "YOUTUBE") return "https://www.youtube.com/@DreamBiker532";
    return "#";
  }

  const trimmed = url.trim();

  // Already a full HTTP/HTTPS URL
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Handle Facebook relative paths (e.g. "/reel/123", "reel/123", "/videos/123", "/photo.php?...")
  if (
    provider === "FACEBOOK" ||
    trimmed.startsWith("/reel") ||
    trimmed.startsWith("/watch") ||
    trimmed.startsWith("/photo") ||
    trimmed.startsWith("/posts") ||
    trimmed.startsWith("/videos") ||
    /^\d+_\d+/.test(trimmed)
  ) {
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `https://www.facebook.com${cleanPath}`;
  }

  // If it's a YouTube relative path (e.g. "/watch?v=123" or "watch?v=123")
  if (provider === "YOUTUBE" || trimmed.startsWith("/watch") || trimmed.startsWith("/shorts")) {
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `https://www.youtube.com${cleanPath}`;
  }

  // Fallback for leading slash
  if (trimmed.startsWith("/")) {
    return `https://www.facebook.com${trimmed}`;
  }

  return `https://${trimmed}`;
}
