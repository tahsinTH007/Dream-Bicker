import { describe, expect, it } from "vitest";
import { pickContactInfo, telHref } from "@/server/social/contact-info";
import { siteConfig } from "@/config/site.config";

describe("pickContactInfo (Facebook page About -> site contact details)", () => {
  it("uses the page's public phone and email when set", () => {
    expect(pickContactInfo({ phone: " +880 1712-345678 ", emails: ["page@example.com"] })).toEqual({
      email: "page@example.com",
      phone: "+880 1712-345678",
      source: "facebook",
    });
  });

  it("hides the phone when Facebook has none, keeps the page email", () => {
    expect(pickContactInfo({ emails: ["md.hanifhossan6991@gmail.com"] })).toMatchObject({
      phone: null,
      email: "md.hanifhossan6991@gmail.com",
    });
  });

  it("falls back to the site config email when Facebook isn't available", () => {
    expect(pickContactInfo(null)).toEqual({ email: siteConfig.contact.email, phone: null, source: "config" });
  });
});

describe("telHref", () => {
  it("keeps only + and digits", () => {
    expect(telHref("+880 1712-345678")).toBe("tel:+8801712345678");
    expect(telHref("(01712) 345 678")).toBe("tel:01712345678");
  });
});
