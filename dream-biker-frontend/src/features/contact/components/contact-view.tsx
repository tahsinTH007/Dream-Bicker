"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Send,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  HeartHandshake,
  Video,
  Briefcase,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";
import { PageHeader } from "@/components/shared/page-header";
import { siteConfig } from "@/config/site.config";
import { socialConfig } from "@/config/social.config";

interface ContactViewProps {
  /** From the Facebook page's About section, falling back to site config */
  email: string;
  /** Public phone from the Facebook page; the card is hidden when there is none */
  phone: { label: string; href: string } | null;
}

export function ContactView({ email, phone }: ContactViewProps) {
  const [copied, setCopied] = React.useState(false);

  const displayEmail = email || siteConfig.contact.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(displayEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = displayEmail;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const emailCategories = [
    {
      icon: HeartHandshake,
      title: "জরুরি মানবিক সহায়তা ও পুনর্বাসন",
      subtitle: "অসহায় পরিবার, চিকিৎসা সহায়তা বা চরাঞ্চলের সংকট",
      subject: "[জরুরি মানবিক সহায়তা] ড্রিম বাইকার হানিফের দৃষ্টি আকর্ষণ",
      body: "শ্রদ্ধেয় হানিফ ভাই,\n\nআমি সহায়তার জন্য যোগাযোগ করছি:\n১. রোগীর/ব্যক্তির নাম:\n২. সমস্যা ও বিস্তারিত:\n৩. এলাকা ও জেলা:\n৪. জরুরি যোগাযোগের নম্বর:\n\nধন্যবাদ।",
      badge: "জরুরি সেবা",
      badgeColor: "bg-red-500/10 text-red-600 border-red-500/20",
    },
    {
      icon: Video,
      title: "গণমাধ্যম, প্রেস ও সাক্ষাৎকার",
      subtitle: "টিভি চ্যানেল, জাতীয় পত্রিকা বা অনলাইন মিডিয়া কভারেজ",
      subject: "[মিডিয়া ও প্রেস] ড্রিম বাইকার হানিফের সাক্ষাৎকার / তথ্যচিত্র",
      body: "শ্রদ্ধেয় হানিফ ভাই,\n\nআমাদের মিডিয়া প্রতিষ্ঠানের পক্ষ থেকে আপনার সাথে যোগাযোগ করছি:\n১. মিডিয়া/সংস্থার নাম:\n২. উদ্দেশ্য (সাক্ষাৎকার/কভারেজ):\n৩. প্রস্তাবিত তারিখ ও স্থান:\n৪. যোগাযোগের নম্বর:\n\nধন্যবাদ।",
      badge: "মিডিয়া ও প্রেস",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    {
      icon: Briefcase,
      title: "যৌথ উদ্যোগ ও স্পনসরশিপ",
      subtitle: "ব্র্যান্ড পার্টনারশিপ, সামাজিক ক্যাম্পেইন ও ত্রাণ প্রজেক্ট",
      subject: "[কোলাবোরেশন] যৌথ উদ্যোগ ও পার্টনারশিপ প্রস্তাবনা",
      body: "শ্রদ্ধেয় হানিফ ভাই,\n\nএকটি যৌথ উদ্যোগ/পার্টনারশিপের প্রস্তাব নিয়ে লিখছি:\n১. প্রতিষ্ঠান/সংগঠনের নাম:\n২. প্রস্তাবিত যৌথ কাজের ধরন:\n৩. সময়সীমা:\n৪. ফোকাস এরিয়া:\n\nধন্যবাদ।",
      badge: "পার্টনারশিপ",
      badgeColor: "bg-[#E97835]/10 text-[#E97835] border-[#E97835]/20",
    },
    {
      icon: MessageSquare,
      title: "সাধারণ জিজ্ঞাসা ও পরামর্শ",
      subtitle: "সরাসরি মতামত, পরামর্শ ও শুভকামনা জানানো",
      subject: "[সাধারণ জিজ্ঞাসা] ড্রিম বাইকার টিমের সাথে যোগাযোগ",
      body: "শ্রদ্ধেয় হানিফ ভাই,\n\nআমি ড্রিম বাইকার পেজ ও চ্যানেলের একজন শুভাকাঙ্ক্ষী।\n\nআমার বক্তব্য/পরামর্শ:\n\nধন্যবাদ।",
      badge: "সাধারণ বার্তা",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
  ];

  return (
    <>
      <PageHeader
        badge="সরাসরি যোগাযোগ"
        title="হানিফের সাথে যোগাযোগ করুন"
        description="মানবিক সহায়তা, ডকুমেন্টারি উদ্যোগ, গণমাধ্যম সাক্ষাৎকার বা যেকোনো জরুরি প্রয়োজনে সরাসরি যোগাযোগের মাধ্যম।"
      />

      <section className="relative py-10 sm:py-16 bg-[#FAFAF8] overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-[#142B3B]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Main Hero Showcase: Use This Email to Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-[#EAE6DB] bg-gradient-to-br from-[#142B3B] via-[#0F2230] to-[#0A1620] p-6 sm:p-10 lg:p-12 text-white shadow-2xl"
          >
            {/* Subtle light mesh */}
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#E97835]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E97835]/40 bg-[#E97835]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F5A623]">
                <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                অফিশিয়াল সরাসরি মাধ্যম • Official Direct Channel
              </div>

              {/* Title */}
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                যোগাযোগের জন্য এই ইমেইল ব্যবহার করুন
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
                হানিফ (ড্রিম বাইকার)-এর সাথে যেকোনো মানবিক প্রস্তাবনা, ত্রাণ উদ্যোগ বা মিডিয়া কভারেজের জন্য নিচের অফিশিয়াল ইমেইল ঠিকানায় সরাসরি মেইল পাঠান। প্রতিটি বার্তা গুরুত্ব সহকারে পড়া হয়।
              </p>

              {/* Email Address Interactive Display Box */}
              <div className="pt-2">
                <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-4 backdrop-blur-md shadow-inner w-full max-w-2xl">
                  <div className="flex items-center gap-3 px-3 py-1 text-left w-full sm:w-auto overflow-hidden">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E97835] text-white shadow-md">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="truncate">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-white/60">
                        অফিশিয়াল ইমেইল ঠিকানা
                      </span>
                      <a
                        href={`mailto:${displayEmail}`}
                        className="font-mono text-base sm:text-xl font-bold text-white hover:text-[#F5A623] transition-colors truncate block"
                      >
                        {displayEmail}
                      </a>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCopyEmail}
                      type="button"
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                        copied
                          ? "bg-emerald-600 text-white"
                          : "bg-white/15 hover:bg-white/25 text-white border border-white/20"
                      }`}
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-white" />
                          <span>কপি হয়েছে!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>কপি করুন</span>
                        </>
                      )}
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={`mailto:${displayEmail}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E97835] hover:bg-[#d06727] px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all shadow-md shadow-[#E97835]/30"
                    >
                      <Send className="h-4 w-4" />
                      <span>মেইল পাঠান</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-white/70">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  ২৪–৪৮ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করা হয়
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#F5A623]" />
                  যাচাইকৃত অফিশিয়াল ইনবক্স
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Category Templates: One-click email with pre-filled subject */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E97835] mb-1.5 block">
                এক ক্লিকে বিষয় নির্বাচন • Instant Topics
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#142B3B]">
                আপনার বার্তার ধরন অনুযায়ী দ্রুত মেইল করুন
              </h3>
              <p className="mt-2 text-sm text-[#777777]">
                নিচের যেকোনো অপশনে ক্লিক করলে সরাসরি আপনার ইমেইল অ্যাপ ওপেন হবে এবং প্রয়োজনীয় ফরম্যাট স্বয়ংক্রিয়ভাবে তৈরি হয়ে যাবে।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {emailCategories.map((cat, idx) => {
                const Icon = cat.icon;
                const mailtoUrl = `mailto:${displayEmail}?subject=${encodeURIComponent(
                  cat.subject
                )}&body=${encodeURIComponent(cat.body)}`;

                return (
                  <motion.a
                    key={cat.title}
                    href={mailtoUrl}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -4, borderColor: "#E97835" }}
                    className="group relative flex flex-col justify-between rounded-2xl border border-[#EAE6DB] bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-[#E97835]/50"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F5EF] text-[#142B3B] group-hover:bg-[#E97835] group-hover:text-white transition-colors">
                          <Icon className="h-6 w-6 transition-colors" />
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${cat.badgeColor}`}
                        >
                          {cat.badge}
                        </span>
                      </div>

                      <h4 className="font-heading text-lg font-bold text-[#142B3B] group-hover:text-[#E97835] transition-colors">
                        {cat.title}
                      </h4>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#777777] leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#EAE6DB]/60 flex items-center justify-between text-xs font-bold text-[#E97835]">
                      <span>এই বিষয়ে ইমেইল পাঠান</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Other Direct Channels: Messenger, Facebook Page, YouTube, Phone */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E97835] mb-1.5 block">
                অন্যান্য সরাসরি মাধ্যম • Social & Live Channels
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#142B3B]">
                সোশ্যাল মিডিয়ায় সরাসরি ইনবক্স ও ফলো করুন
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Facebook Messenger */}
              <motion.a
                href="https://m.me/BuydreambyHanif"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#EAE6DB] bg-white p-6 shadow-sm transition-all hover:border-[#0084FF]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0084FF]/10 text-[#0084FF] mb-4">
                    <FaFacebookMessenger className="h-6 w-6" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#777777]">
                    তাত্ক্ষণিক মেসেজ
                  </span>
                  <h4 className="font-heading text-lg font-bold text-[#142B3B] mt-0.5">
                    ফেসবুক মেসেঞ্জার
                  </h4>
                  <p className="mt-1.5 text-xs text-[#777777] leading-relaxed">
                    জরুরি প্রশ্ন বা দ্রুত বার্তার জন্য অফিসিয়াল পেজের ইনবক্সে মেসেজ পাঠান।
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#0084FF]">
                  <span>চ্যাট শুরু করুন</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </motion.a>

              {/* Facebook Page */}
              <motion.a
                href={socialConfig.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#EAE6DB] bg-white p-6 shadow-sm transition-all hover:border-[#1877F2]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1877F2]/10 text-[#1877F2] mb-4">
                    <FaFacebookF className="h-6 w-6" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#777777]">
                    অফিশিয়াল পেজ ({siteConfig.heroStatsFallback.facebookFollowers.toLocaleString("bn-BD")} ফলোয়ার)
                  </span>
                  <h4 className="font-heading text-lg font-bold text-[#142B3B] mt-0.5">
                    ড্রিম বাইকার ফেসবুক পেজ
                  </h4>
                  <p className="mt-1.5 text-xs text-[#777777] leading-relaxed">
                    মাঠপর্যায়ের মানবিক লাইভ আপডেট, ফটো পোস্ট ও সরাসরি কমেন্টে যুক্ত থাকুন।
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#1877F2]">
                  <span>পেজ ভিজিট করুন</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </motion.a>

              {/* YouTube Channel */}
              <motion.a
                href={socialConfig.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#EAE6DB] bg-white p-6 shadow-sm transition-all hover:border-[#FF0000]/40 hover:shadow-md sm:col-span-2 lg:col-span-1"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF0000]/10 text-[#FF0000] mb-4">
                    <FaYoutube className="h-6 w-6" />
                  </div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#777777]">
                    ইউটিউব চ্যানেল ({siteConfig.heroStatsFallback.youtubeSubscribers.toLocaleString("bn-BD")} সাবস্ক্রাইবার)
                  </span>
                  <h4 className="font-heading text-lg font-bold text-[#142B3B] mt-0.5">
                    Dream Biker Documentary
                  </h4>
                  <p className="mt-1.5 text-xs text-[#777777] leading-relaxed">
                    সম্পূর্ণ তথ্যচিত্র, চরাঞ্চলের মানবিক সহায়তার পর্ব এবং ভিডিও ডায়েরি দেখুন।
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#FF0000]">
                  <span>ইউটিউবে সাবস্ক্রাইব করুন</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </motion.a>

              {/* Phone Call (if configured on Facebook) */}
              {phone && (
                <motion.a
                  href={phone.href}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col justify-between rounded-2xl border border-[#EAE6DB] bg-white p-6 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md sm:col-span-2 lg:col-span-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-[#777777]">
                          পাবলিক ফোন নম্বর (ফেসবুক পেজ অনুযায়ী)
                        </span>
                        <h4 className="font-mono text-xl font-bold text-[#142B3B]">
                          {phone.label}
                        </h4>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white transition-colors shrink-0">
                      <Phone className="h-4 w-4" />
                      <span>সরাসরি কল করুন</span>
                    </span>
                  </div>
                </motion.a>
              )}
            </div>
          </div>

          {/* Contact Guidelines & Location Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-[#EAE6DB] bg-[#F7F5EF]/60 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#142B3B] text-[#E97835]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-heading text-sm font-bold text-[#142B3B]">
                    মূল অবস্থান ও কার্যক্রম
                  </h5>
                  <p className="mt-1 text-xs text-[#777777] leading-relaxed">
                    {siteConfig.contact.location} — প্রতিনিয়ত বাংলাদেশের প্রতিটি চরাঞ্চল, দ্বীপ ও প্রান্তিক জনপদে ভ্রমণরত।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#142B3B] text-[#E97835]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-heading text-sm font-bold text-[#142B3B]">
                    প্রতিক্রিয়ার সময়সীমা
                  </h5>
                  <p className="mt-1 text-xs text-[#777777] leading-relaxed">
                    সাধারণত ২৪–৪৮ কর্মঘণ্টার মধ্যে প্রতিটি ইমেইল যাচাই করে প্রয়োজনীয় যোগাযোগ স্থাপন করা হয়।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#142B3B] text-[#E97835]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-heading text-sm font-bold text-[#142B3B]">
                    ইমেইল পাঠানোর ক্ষেত্রে
                  </h5>
                  <p className="mt-1 text-xs text-[#777777] leading-relaxed">
                    রোগী বা অসহায় পরিবারের ক্ষেত্রে পূর্ণ বিবরণ, এলাকা এবং কার্যকর ফোন নম্বর সংযুক্ত করার অনুরোধ রইল।
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
