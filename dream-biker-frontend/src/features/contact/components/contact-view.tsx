"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Clock, MessageSquare, HeartHandshake, Video } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SocialLinks } from "@/components/shared/social-links";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/config/site.config";

export function ContactView() {
  return (
    <>
      <PageHeader
        badge="সরাসরি যোগাযোগ"
        title="হানিফের সাথে যোগাযোগ করুন"
        description="মানবিক সহায়তা, ডকুমেন্টারি সহযোগিতা, গণমাধ্যম সাক্ষাৎকার বা স্বেচ্ছাসেবী হিসেবে যুক্ত হতে বার্তা পাঠান।"
      />

      <section className="relative py-8 sm:py-12 bg-white overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-10 left-10 h-96 w-96 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Details & Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E97835] mb-2 block">
                  যোগাযোগের মাধ্যম
                </span>
                <h2 className="font-heading text-3xl font-extrabold text-[#142B3B]">
                  একসাথে কাজ করি ও যুক্ত থাকি
                </h2>
                <p className="mt-3 text-sm text-[#777777] leading-relaxed">
                  হানিফ ব্যক্তিগতভাবে প্রতিটি অর্থপূর্ণ মানবিক প্রস্তাবনা, ডকুমেন্টারি পরিকল্পনা এবং তৃণমূলের জরুরি সহায়তার বার্তাগুলো গুরুত্ব সহকারে বিবেচনা করেন।
                </p>
              </div>

              {/* Direct Info Cards with Hover Lift */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[#EAE6DB] bg-[#F7F5EF]/60 p-5 flex items-start gap-4 transition-colors hover:border-[#E97835]/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#142B3B] text-[#E97835] shadow-sm">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#777777]">
                      ইমেইল ঠিকানা
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-heading text-base font-bold text-[#142B3B] hover:text-[#E97835] transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <span className="block text-xs text-[#777777] mt-0.5">
                      অফিশিয়াল যোগাযোগের ইমেইল
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[#EAE6DB] bg-[#F7F5EF]/60 p-5 flex items-start gap-4 transition-colors hover:border-[#E97835]/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#142B3B] text-[#E97835] shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#777777]">
                      মূল অবস্থান
                    </span>
                    <span className="font-heading text-base font-bold text-[#142B3B]">
                      {siteConfig.contact.location}
                    </span>
                    <span className="block text-xs text-[#777777] mt-0.5">
                      নিয়মিত সমগ্র বাংলাদেশের প্রত্যন্ত অঞ্চলে ভ্রমণরত
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-[#EAE6DB] bg-[#F7F5EF]/60 p-5 flex items-start gap-4 transition-colors hover:border-[#E97835]/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#142B3B] text-[#E97835] shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#777777]">
                      প্রতিক্রিয়ার সময়সীমা
                    </span>
                    <span className="font-heading text-base font-bold text-[#142B3B]">
                      ২৪–৪৮ কর্মঘণ্টা
                    </span>
                    <span className="block text-xs text-[#777777] mt-0.5">
                      প্রত্যন্ত চরাঞ্চলে ভ্রমণের সময় কিছুটা বিলম্ব হতে পারে
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Inquiry Categories Help Box */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl border border-[#EAE6DB] bg-[#F7F5EF]/30 p-6 shadow-sm"
              >
                <h4 className="font-heading text-sm font-bold text-[#142B3B] mb-3">
                  বার্তার প্রধান ধরনসমূহ
                </h4>
                <div className="space-y-3 text-xs text-[#777777]">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="h-4 w-4 text-[#E97835]" />
                    <span><strong>মানবিক সহায়তা:</strong> জরুরি কোনো পরিবার বা এলাকার সংকটের কথা জানাতে।</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-[#E97835]" />
                    <span><strong>গণমাধ্যম ও প্রেস:</strong> সাক্ষাৎকার, তথ্যচিত্র কিংবা মিডিয়া কভারেজের জন্য।</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#E97835]" />
                    <span><strong>যৌথ উদ্যোগ:</strong> তরুণ সামাজিক সংগঠন বা স্বেচ্ছাসেবী হিসেবে যুক্ত হতে।</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Media Links */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-3">
                  অফিশিয়াল প্ল্যাটফর্মসমূহ
                </p>
                <SocialLinks showLabels />
              </div>
            </motion.div>

            {/* Right Column: Contact Form with Motion */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}