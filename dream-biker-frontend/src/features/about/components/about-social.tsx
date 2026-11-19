"use client";

import Link from "next/link";
import { ArrowRight, Video, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { SocialLinks } from "@/components/shared/social-links";
import { Button } from "@/components/ui/button";

export function AboutSocial() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 bg-white">
      {/* Background soft ambient accents */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#E97835]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E97835]/15 border border-[#E97835]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#E97835]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E97835] animate-ping" />
          যোগাযোগ ও সহযোগিতা
        </motion.div>

        {/* Animated Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142B3B] tracking-tight mb-4"
        >
          হানিফের সাথে সরাসরি যুক্ত হোন
        </motion.h3>

        {/* Animated Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-xl mx-auto mb-9"
        >
          প্রতিদিনের ভিডিও, মাঠপর্যায়ের নানা মানবিক আপডেট ও আলোকচিত্র দেখতে অফিশিয়াল সোশ্যাল চ্যানেলগুলোতে অনুসরণ করুন অথবা যেকোনো সমন্বয়ের জন্য সরাসরি যোগাযোগ করুন।
        </motion.p>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <SocialLinks showLabels />
        </motion.div>

        {/* CTA Buttons with Hover & Tap Physics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            variant="orange"
            size="lg"
            className="rounded-full px-8 py-3.5 text-sm font-bold gap-2 shadow-xl shadow-[#E97835]/25 hover:scale-105 active:scale-95 transition-all"
          >
            <Link href="/contact">
              <MessageSquare className="h-4 w-4" />
              সরাসরি বার্তা পাঠান
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="rounded-full px-8 py-3.5 text-sm font-bold gap-2 border border-[#EAE6DB] hover:bg-[#F7F5EF] hover:scale-105 active:scale-95 transition-all text-[#142B3B]"
          >
            <Link href="/videos">
              <Video className="h-4 w-4 text-[#E97835]" />
              ভিডিও কার্যক্রম দেখুন
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
