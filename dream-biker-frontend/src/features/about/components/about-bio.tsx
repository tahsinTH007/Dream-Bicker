"use client";

import { motion } from "framer-motion";
import { Info, Compass, Sparkles, Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

export function AboutBio() {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F5EF]/60 border-y border-[#EAE6DB] overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="পটভূমি ও গল্প"
          title="ড্রিম বাইকার-এর শুরুর গল্প"
          description="একক মোটরসাইকেল ভ্রমণ থেকে শুরু করে গভীর সহানুভূতি ও ভালোবাসার এক মানবিক পথচলা।"
          align="center"
        />

        {/* Notice of authenticated bio with gentle motion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-12 mt-4 rounded-2xl border border-[#EAE6DB] bg-white p-4 sm:p-5 flex items-center gap-3.5 text-xs text-[#777777] shadow-sm"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E97835]/15 text-[#E97835]">
            <Info className="h-4 w-4" />
          </div>
          <span>
            <strong className="text-[#142B3B]">সম্পাদকীয় দ্রষ্টব্য:</strong> ব্যক্তিগত জীবনী ও বিস্তারিত তথ্যাবলি সরাসরি হানিফ ভাইয়ের অনুমোদিত রেকর্ড অনুযায়ী নিয়মিত পর্যবেক্ষণ ও সমৃদ্ধ করা হয়।
          </span>
        </motion.div>

        {/* Story Grid with Interactive Hover Cards & Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: যাত্রার সূচনা */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl border border-[#EAE6DB] bg-white p-8 sm:p-9 shadow-sm hover:shadow-xl hover:border-[#E97835]/40 transition-[color,background-color,border-color,box-shadow] duration-300"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-[#E97835] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E97835]/10 text-[#E97835] group-hover:bg-[#E97835] group-hover:text-white transition-colors duration-300">
                <Compass className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-[#E97835] uppercase tracking-wider bg-[#F7F5EF] px-3 py-1 rounded-full">
                অধ্যায় ০১
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-4 group-hover:text-[#E97835] transition-colors">
              যাত্রার সূচনা
            </h3>
            
            <p className="text-sm text-[#666666] leading-relaxed mb-4">
              একটি সাধারণ মোটরসাইকেল আর বাংলাদেশের প্রত্যন্ত অঞ্চলকে কাছ থেকে দেখার তীব্র ইচ্ছা থেকেই এই গল্পের শুরু। মহাসড়কের বাইরে অচেনা মেঠোপথ দিয়ে চলার সময় হানিফ লক্ষ্য করেন অসংখ্য বয়োবৃদ্ধ দোকানি, পরিশ্রমী মা আর অর্থনৈতিক প্রতিকূলতার মধ্যেও হাসিমুখে লড়াই করে যাওয়া তরুণদের।
            </p>
            
            <p className="text-sm text-[#666666] leading-relaxed">
              কেবল পাশ কাটিয়ে চলে না গিয়ে তিনি বাইকের ইঞ্জিন বন্ধ করে এক কাপ চা হাতে তাদের সাথে বসতেন, শুনতেন তাদের জীবনের আনন্দ-বেদনার কথা। সেই আন্তরিক আড্ডাগুলোই ভ্রমণকে কেবল ঘোরাঘুরি থেকে জীবনের ব্রতে রূপ দেয়।
            </p>
          </motion.div>

          {/* Card 2: অনুপ্রেরণা ও প্রত্যয় */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] } }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-3xl border border-[#EAE6DB] bg-white p-8 sm:p-9 shadow-sm hover:shadow-xl hover:border-[#E97835]/40 transition-[color,background-color,border-color,box-shadow] duration-300"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-[#E97835] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E97835]/10 text-[#E97835] group-hover:bg-[#E97835] group-hover:text-white transition-colors duration-300">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-[#E97835] uppercase tracking-wider bg-[#F7F5EF] px-3 py-1 rounded-full">
                অধ্যায় ০২
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-4 group-hover:text-[#E97835] transition-colors">
              অনুপ্রেরণা ও প্রত্যয়
            </h3>

            <p className="text-sm text-[#666666] leading-relaxed mb-4">
              হানিফের সবচেয়ে বড় অনুপ্রেরণা সাধারণ বাংলাদেশীদের অপরাজেয় মনোবল। বন্যা, নদীভাঙন কিংবা দারিদ্র্যের কষাঘাত সত্ত্বেও অপরিচিত মুসাফিরের প্রতি তাদের অকৃত্রিম আতিথেয়তা ও ভালোবাসা কোনো সীমানা মানে না।
            </p>

            <div className="mt-4 rounded-2xl bg-[#F7F5EF] p-4 border border-[#EAE6DB] flex items-start gap-3">
              <Quote className="h-5 w-5 text-[#E97835] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#142B3B] italic font-medium leading-relaxed">
                &quot;যাদের নিজেদের বলতে খুব সামান্যই আছে, তারা যদি একজন পথচারী বাইকারকে এতটা ভালোবাসা দিতে পারেন—তবে আমাদের মতো যাদের কথা বলার মাধ্যম আছে, তাদের দায়িত্ব এদের পাশে দাঁড়ানো।&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
