import { describe, expect, it } from "vitest";
import { classifyTokenHealth, WARNING_DAYS } from "@/server/social/facebook/facebook-token-health";

const NOW = Date.UTC(2026, 10, 21, 8, 0, 0);
const inDays = (d: number) => Math.floor((NOW + d * 86_400_000) / 1000);

describe("classifyTokenHealth", () => {
  it("flags a short-lived token that expires today", () => {
    const h = classifyTokenHealth({ is_valid: true, type: "PAGE", expires_at: inDays(0.04), data_access_expires_at: inDays(90) }, NOW);
    expect(h.status).toBe("warning");
    expect(h.daysLeft).toBe(0);
  });

  it("is ok for a never-expiring token with distant data access", () => {
    const h = classifyTokenHealth({ is_valid: true, type: "PAGE", expires_at: 0, data_access_expires_at: inDays(90) }, NOW);
    expect(h.status).toBe("ok");
    expect(h.expiresAt).toBeNull();
    expect(h.daysLeft).toBe(90);
  });

  it("warns when data access ends within the warning window even if the token never expires", () => {
    const h = classifyTokenHealth({ is_valid: true, expires_at: 0, data_access_expires_at: inDays(WARNING_DAYS - 1) }, NOW);
    expect(h.status).toBe("warning");
  });

  it("reports an expired deadline and an invalid token", () => {
    expect(classifyTokenHealth({ is_valid: true, expires_at: inDays(-1) }, NOW).status).toBe("expired");
    expect(classifyTokenHealth({ is_valid: false, error: { message: "Session has expired" } }, NOW)).toMatchObject({
      status: "invalid",
      message: "Session has expired",
    });
  });

  it("is ok with no expiry and no data-access limit (e.g. a system user token)", () => {
    expect(classifyTokenHealth({ is_valid: true, expires_at: 0 }, NOW)).toMatchObject({ status: "ok", daysLeft: null });
  });
});
