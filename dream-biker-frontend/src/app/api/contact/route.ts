import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma, isDatabaseConfigured } from "@/lib/db/prisma";

const INQUIRY_TYPES = [
  "General Inquiry",
  "Collaboration",
  "Media and Press",
  "Humanitarian Support",
  "Business Opportunities",
  "Other",
] as const;

const contactSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(1).max(200),
  inquiryType: z.enum(INQUIRY_TYPES),
  message: z.string().trim().min(10).max(5000),
  // Honeypot: hidden field real visitors never fill in.
  // Any value is accepted here and handled below, so bots get no validation hint.
  website: z.string().max(500).optional(),
});

// Best-effort per-instance rate limit (5 submissions / 10 minutes / IP).
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) {
    recentSubmissions.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  recentSubmissions.set(ip, timestamps);
  return false;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, code: "INVALID_BODY" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, code: "VALIDATION_ERROR", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Silently accept honeypot hits so bots don't learn they were filtered.
  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ success: false, code: "RATE_LIMITED" }, { status: 429 });
  }

  // Without a database there is nowhere durable to put the message. Say so
  // instead of pretending it was received; the form then offers a direct email.
  if (!isDatabaseConfigured() || !prisma) {
    return NextResponse.json({ success: false, code: "NOT_CONFIGURED" }, { status: 503 });
  }

  try {
    const { fullName, email, phone, subject, inquiryType, message } = parsed.data;
    await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        subject,
        inquiryType,
        message,
        ipAddress: ip === "unknown" ? null : ip,
        userAgent: request.headers.get("user-agent")?.slice(0, 300) || null,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ [API /api/contact] Failed to save message:", error);
    return NextResponse.json({ success: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}
