"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InquiryType, ContactFormData } from "@/types";

const inquiryTypes: { value: InquiryType; label: string }[] = [
  { value: "General Inquiry", label: "সাধারণ জিজ্ঞাসা" },
  { value: "Collaboration", label: "সহযোগিতা ও যৌথ উদ্যোগ" },
  { value: "Media and Press", label: "গণমাধ্যম ও প্রেস" },
  { value: "Humanitarian Support", label: "জরুরি মানবিক সহায়তা" },
  { value: "Business Opportunities", label: "ব্যবসায়িক সুযোগ" },
  { value: "Other", label: "অন্যান্য" },
];

export function ContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  // When the server can't take the message, offer a prefilled email instead.
  const [offerEmailFallback, setOfferEmailFallback] = React.useState<boolean>(false);
  // Honeypot field (hidden from people, filled in by bots)
  const [website, setWebsite] = React.useState<string>("");

  const mailtoHref = React.useMemo(() => {
    const lines = [`নাম: ${formData.fullName}`, `ইমেইল: ${formData.email}`];
    if (formData.phone) lines.push(`ফোন: ${formData.phone}`);
    lines.push(`উদ্দেশ্য: ${formData.inquiryType}`, "", formData.message);
    const body = lines.join("\n");
    return `mailto:md.hanifhossan6991@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(body)}`;
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOfferEmailFallback(false);

    // Frontend validation
    if (!formData.fullName.trim()) {
      setStatus("error");
      setErrorMessage("অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("অনুগ্রহ করে সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }
    if (!formData.subject.trim()) {
      setStatus("error");
      setErrorMessage("অনুগ্রহ করে বার্তার বিষয় উল্লেখ করুন।");
      return;
    }
    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("বার্তাটি কমপক্ষে ১০ অক্ষরের হতে হবে।");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const data: { code?: string } = await response.json().catch(() => ({}));
      setStatus("error");

      if (data.code === "VALIDATION_ERROR") {
        setErrorMessage("কিছু তথ্য সঠিক নয়। অনুগ্রহ করে ফর্মটি আবার যাচাই করুন।");
      } else if (data.code === "RATE_LIMITED") {
        setErrorMessage("অল্প সময়ে অনেকগুলো বার্তা পাঠানো হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।");
      } else {
        // NOT_CONFIGURED, SERVER_ERROR or anything unexpected: the message was NOT saved.
        setErrorMessage("দুঃখিত, বার্তাটি এই মুহূর্তে পাঠানো যায়নি। নিচের বোতামে ক্লিক করে সরাসরি ইমেইল করুন।");
        setOfferEmailFallback(true);
      }
    } catch {
      setStatus("error");
      setErrorMessage("নেটওয়ার্ক সমস্যার কারণে বার্তাটি পাঠানো যায়নি। সরাসরি ইমেইল করতে পারেন।");
      setOfferEmailFallback(true);
    }
  };

  return (
    <div className="rounded-[24px] border border-[#EAE6DB] bg-white p-6 sm:p-10 shadow-xl">
      <h3 className="font-heading text-2xl font-bold text-[#142B3B] mb-2">
        বার্তা পাঠান
      </h3>
      <p className="text-sm text-[#777777] mb-6">
        নিচের ফর্মটি পূরণ করুন। জরুরি মানবিক সহায়তা বা সরাসরি যোগাযোগের ক্ষেত্রে নির্দিষ্ট ক্যাটাগরি বাছাই করুন।
      </p>

      {/* Direct email info notice */}
      <div className="mb-6 rounded-xl border border-[#EAE6DB] bg-[#F7F5EF] p-3.5 flex items-center gap-2.5 text-xs text-[#777777]">
        <Info className="h-4 w-4 text-[#E97835] shrink-0" />
        <span>
          <strong>যোগাযোগ দ্রষ্টব্য:</strong> তাৎক্ষণিক বা জরুরি প্রয়োজনে সরাসরি{" "}
          <a
            href="mailto:md.hanifhossan6991@gmail.com"
            className="text-[#E97835] font-semibold underline"
          >
            md.hanifhossan6991@gmail.com
          </a>{" "}
          ঠিকানায় ইমেইল পাঠাতে পারেন।
        </span>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center text-emerald-800"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white mb-4 shadow-lg shadow-emerald-600/20"
            >
              <CheckCircle2 className="h-7 w-7" />
            </motion.div>
            <h4 className="font-heading text-xl font-bold text-emerald-950">
              বার্তাটি সফলভাবে গৃহীত হয়েছে!
            </h4>
            <p className="mt-2 text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
              ধন্যবাদ, {formData.fullName}। আপনার বার্তাটি গৃহীত হয়েছে। সরাসরি যোগাযোগের জন্য হানিফের অফিসিয়াল ইমেইল <strong>md.hanifhossan6991@gmail.com</strong> ব্যবহার করুন।
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Button
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    subject: "",
                    inquiryType: "General Inquiry",
                    message: "",
                  });
                }}
                variant="default"
                size="sm"
                className="mt-6 rounded-xl shadow-sm"
              >
                আরেকটি বার্তা পাঠান
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Honeypot: hidden from people and screen readers, left empty by real visitors */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold uppercase tracking-wider text-[#142B3B] mb-2"
                >
                  আপনার পূর্ণ নাম *
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-[#142B3B] mb-2"
                >
                  ইমেইল ঠিকানা *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone & Inquiry Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-[#142B3B] mb-2"
                >
                  ফোন নম্বর (ঐচ্ছিক)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="inquiryType"
                  className="block text-xs font-bold uppercase tracking-wider text-[#142B3B] mb-2"
                >
                  যোগাযোগের উদ্দেশ্য *
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-xl border border-[#EAE6DB] bg-white px-3.5 py-2 text-sm text-[#142B3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E97835] focus-visible:ring-offset-2 transition-all cursor-pointer"
                >
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-bold uppercase tracking-wider text-[#142B3B] mb-2"
              >
                বার্তার বিষয় *
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="বিষয় সংক্ষেপে উল্লেখ করুন"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-bold uppercase tracking-wider text-[#142B3B] mb-2"
              >
                আপনার বার্তা *
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="আপনার বার্তাটি এখানে বিস্তারিত লিখুন..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span className="flex-1">{errorMessage}</span>
                {offerEmailFallback && (
                  <a
                    href={mailtoHref}
                    className="shrink-0 rounded-lg bg-red-600 px-3 py-1.5 font-semibold text-white hover:bg-red-700 transition-colors"
                  >
                    ইমেইলে পাঠান
                  </a>
                )}
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="orange"
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto rounded-2xl gap-2 font-semibold shadow-lg shadow-[#E97835]/20 cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>বার্তা পাঠানো হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>বার্তা পাঠান</span>
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}