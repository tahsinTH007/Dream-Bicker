"use client";

import * as React from "react";
import { Send, CheckCircle2, AlertCircle, Info } from "lucide-react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus("error");
      setErrorMessage("বার্তাটি কমপক্ষে ১০ অক্ষরের হতে হবে।");
      return;
    }

    setStatus("submitting");

    // Validated submission simulation
    setTimeout(() => {
      setStatus("success");
    }, 800);
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

      {status === "success" ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center text-emerald-800">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white mb-4 shadow-lg shadow-emerald-600/20">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h4 className="font-heading text-xl font-bold text-emerald-950">
            বার্তাটি সফলভাবে গৃহীত হয়েছে!
          </h4>
          <p className="mt-2 text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
            ধন্যবাদ, {formData.fullName}। আপনার বার্তাটি ফর্ম ভ্যালিডেশনের মাধ্যমে গৃহীত হয়েছে। সরাসরি যোগাযোগের জন্য হানিফের অফিসিয়াল ইমেইল <strong>md.hanifhossan6991@gmail.com</strong> ব্যবহার করুন।
          </p>
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
            className="mt-6 rounded-xl"
          >
            আরেকটি বার্তা পাঠান
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="যেমন: তানভীর রহমান"
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

          {/* Phone (optional) & Inquiry Type */}
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
                placeholder="+৮৮০ ১XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="inquiryType"
                className="block text-xs font-bold uppercase tracking-wider text-[#142B3B] mb-2"
              >
                বার্তার ধরন *
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="flex h-12 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#222222] transition-colors focus:border-[#E97835] focus:outline-none focus:ring-2 focus:ring-[#E97835]/20 cursor-pointer"
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
            <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="orange"
            size="lg"
            disabled={status === "submitting"}
            className="w-full sm:w-auto rounded-2xl gap-2 font-semibold shadow-lg shadow-[#E97835]/20 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            {status === "submitting" ? "বার্তা পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
          </Button>
        </form>
      )}
    </div>
  );
}
