import { beforeAll, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

// Run without a database: the endpoint must say so instead of pretending success
beforeAll(() => {
  delete process.env.DATABASE_URL;
  vi.resetModules();
});

const valid = {
  fullName: "Test Person",
  email: "test@example.com",
  phone: "",
  subject: "Hello",
  inquiryType: "Other",
  message: "This is a long enough message.",
};

let ipCounter = 0;
async function post(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  const { POST } = await import("@/app/api/contact/route");
  const res = await POST(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
  return { status: res.status, json: await res.json() };
}

describe("POST /api/contact", () => {
  it("rejects a body that isn't JSON", async () => {
    expect((await post("not json")).status).toBe(400);
  });

  it.each([
    ["missing name", { ...valid, fullName: "" }],
    ["bad email", { ...valid, email: "nope" }],
    ["short message", { ...valid, message: "short" }],
    ["unknown inquiry type", { ...valid, inquiryType: "Spam" }],
  ])("rejects %s with VALIDATION_ERROR", async (_label, body) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    expect(res.json.code).toBe("VALIDATION_ERROR");
  });

  it("quietly accepts honeypot submissions without revealing the filter", async () => {
    const res = await post({ ...valid, website: "http://spam.example" });
    expect(res.status).toBe(200);
    expect(res.json).toEqual({ success: true });
  });

  it("returns 503 NOT_CONFIGURED for a valid message when no database is set", async () => {
    const res = await post(valid);
    expect(res.status).toBe(503);
    expect(res.json.code).toBe("NOT_CONFIGURED");
  });

  it("rate-limits a single IP after 5 submissions in the window", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(valid, "10.9.9.9")).status);
    expect(statuses.slice(0, 5).every((s) => s === 503)).toBe(true);
    expect(statuses[5]).toBe(429);
  });
});
