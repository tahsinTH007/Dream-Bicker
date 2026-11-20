"use client";

import { motion } from "framer-motion";
import { Target, HeartHandshake, Lightbulb, Telescope, Quote, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

interface Pillar {
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
}

// Text supplied by Dream Biker (client copy, keep wording as is)
const pillars: Pillar[] = [
  {
    icon: Target,
    title: "আমাদের লক্ষ্য ও উদ্দেশ্য",
    paragraphs: [
      "দেশের প্রত্যন্ত জনপদে পৌঁছে সাধারণ মানুষের জীবনযাপন, সংস্কৃতি, ঐতিহ্য, পেশা ও জীবনসংগ্রামের গল্প তুলে ধরা আমাদের অন্যতম প্রধান লক্ষ্য। প্রবীণ কারিগরের হারিয়ে যেতে বসা শিল্প, সংগ্রামী মায়ের জীবনযুদ্ধ, সুবিধাবঞ্চিত শিশুর স্বপ্ন কিংবা প্রতিকূলতাকে জয় করে এগিয়ে চলা তরুণের সাফল্য—প্রতিটি গল্পই আমাদের কাছে গুরুত্বপূর্ণ।",
      "ডিজিটাল যোগাযোগ ও সামাজিক যোগাযোগমাধ্যমকে ইতিবাচকভাবে ব্যবহার করে আমরা চাই, এসব গল্প দেশের মানুষের পাশাপাশি বিশ্বের দরবারেও পৌঁছে যাক।",
    ],
  },
  {
    icon: HeartHandshake,
    title: "মানবিক কার্যক্রম",
    paragraphs: [
      "আমরা বিশ্বাস করি, কনটেন্ট তৈরির মাধ্যমে শুধু মানুষের গল্প তুলে ধরাই নয়, মানুষের প্রয়োজনে পাশে দাঁড়ানোও আমাদের সামাজিক দায়িত্ব।",
      "এই বিশ্বাস থেকেই Dream Biker বিভিন্ন সময়ে অসহায়, সুবিধাবঞ্চিত ও প্রান্তিক জনগোষ্ঠীর পাশে দাঁড়ানোর চেষ্টা করে আসছে।",
      "প্রতিটি উদ্যোগে আমরা মানুষের আত্মসম্মান, ব্যক্তিগত মর্যাদা ও অনুভূতির প্রতি সর্বোচ্চ শ্রদ্ধাশীল থাকার চেষ্টা করি।",
    ],
  },
  {
    icon: Lightbulb,
    title: "আমাদের বিশ্বাস",
    paragraphs: [
      "আমরা বিশ্বাস করি, একটি ছোট উদ্যোগও কারও জীবনে বড় পরিবর্তনের সূচনা করতে পারে। একটি মানবিক গল্প জাগিয়ে তুলতে পারে হাজারো মানুষের বিবেক। আর সম্মিলিত প্রচেষ্টা তৈরি করতে পারে একটি সুন্দর ও সহমর্মী সমাজ।",
      "তাই আমাদের কাছে প্রতিটি ভ্রমণ শুধু একটি নতুন গন্তব্যে পৌঁছানো নয়; বরং নতুন কিছু জানা, নতুন মানুষের সঙ্গে পরিচিত হওয়া এবং সামর্থ্য অনুযায়ী মানুষের পাশে দাঁড়ানোর একটি সুযোগ।",
    ],
  },
  {
    icon: Telescope,
    title: "আমাদের ভবিষ্যৎ স্বপ্ন",
    paragraphs: [
      "Dream Biker-এর স্বপ্ন বাংলাদেশের প্রতিটি প্রান্তে পৌঁছে যাওয়া। দেশের অজানা জনপদ, অবহেলিত মানুষের গল্প এবং মানবিক উদ্যোগগুলোকে ডিজিটাল প্ল্যাটফর্মের মাধ্যমে আরও বড় পরিসরে তুলে ধরা।",
      "আমরা চাই, Dream Biker হয়ে উঠুক এমন একটি প্ল্যাটফর্ম, যেখানে ভ্রমণ, সংস্কৃতি, মানবিকতা ও সামাজিক দায়বদ্ধতা একসঙ্গে এগিয়ে যাবে।",
      "এই পথচলায় আমাদের সবচেয়ে বড় অনুপ্রেরণা সাধারণ মানুষের ভালোবাসা, সহযোগিতা এবং বিশ্বাস।",
    ],
  },
];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutBio() {
  return (
    <section className="py-12 sm:py-16 bg-[#F7F5EF]/60 border-y border-[#EAE6DB] overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="আমাদের পথচলা"
          title="লক্ষ্য, কার্যক্রম, বিশ্বাস ও স্বপ্ন"
          description="ভ্রমণের প্রতিটি পথে, মানবতার পাশে।"
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, paragraphs }, idx) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: (idx % 2) * 0.12, ease: EASE_OUT } }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl border border-[#EAE6DB] bg-white p-7 shadow-sm transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-[#E97835]/40 hover:shadow-xl sm:p-8"
            >
              {/* Top accent bar on hover */}
              <div className="absolute left-8 right-8 top-0 h-1 rounded-full bg-gradient-to-r from-[#E97835] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E97835]/10 text-[#E97835] transition-colors duration-300 group-hover:bg-[#E97835] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-bold text-[#142B3B] transition-colors group-hover:text-[#E97835] sm:text-2xl">
                  {title}
                </h3>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                {paragraphs.map((text) => (
                  <p key={text.slice(0, 24)}>{text}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing line */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-8 flex flex-col items-center gap-3 rounded-3xl bg-[#142B3B] px-6 py-8 text-center text-white shadow-xl sm:flex-row sm:gap-5 sm:text-left"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E97835]">
            <Quote className="h-6 w-6" />
          </span>
          <blockquote>
            <p className="text-lg font-bold leading-snug sm:text-xl">
              <span className="text-[#FF9A5C]">Dream Biker</span> – শুধু পথের গল্প নয়, মানুষের জীবনের গল্প।
            </p>
            <p className="mt-1 text-sm text-white/80 sm:text-base">ভ্রমণের প্রতিটি পথে, মানবতার পাশে।</p>
          </blockquote>
        </motion.figure>
      </div>
    </section>
  );
}
