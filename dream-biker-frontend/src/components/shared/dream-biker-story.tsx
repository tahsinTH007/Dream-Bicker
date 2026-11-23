"use client";

import * as m from "framer-motion/m";
import { Target, HeartHandshake, Lightbulb, Telescope, Quote, type LucideIcon } from "lucide-react";

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
const bnDigits = new Intl.NumberFormat("bn-BD", { minimumIntegerDigits: 2 });

/**
 * The Dream Biker story, section by section: each heading (numbered) followed by
 * its paragraphs, then the closing lines. Used on the About page and in the
 * Home about section so both always show the same client-supplied text.
 */
export function DreamBikerStory({
  className,
  showClosing = true,
}: {
  className?: string;
  /** Show the closing "Dream Biker – শুধু পথের গল্প নয়…" banner. */
  showClosing?: boolean;
}) {
  return (
    <div className={className}>
      <div className="divide-y divide-[#EAE6DB] overflow-hidden rounded-3xl border border-[#EAE6DB] bg-white shadow-sm">
        {pillars.map(({ icon: Icon, title, paragraphs }, idx) => (
          <m.section
            key={title}
            aria-labelledby={`story-${idx}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="group grid grid-cols-1 gap-4 p-6 transition-colors duration-300 hover:bg-[#FDF8F3] sm:p-8 md:grid-cols-12 md:gap-8"
          >
            {/* Heading column */}
            <div className="flex items-center gap-4 md:col-span-4 md:flex-col md:items-start md:gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E97835]/10 text-[#E97835] transition-colors duration-300 group-hover:bg-[#E97835] group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <span className="block text-xs font-bold tracking-widest text-[#E97835]">
                  {bnDigits.format(idx + 1)}
                </span>
                <h3 id={`story-${idx}`} className="text-xl font-bold leading-snug text-[#142B3B] sm:text-2xl">
                  {title}
                </h3>
              </div>
            </div>

            {/* Text column */}
            <div className="space-y-3 text-base leading-relaxed text-[#444444] md:col-span-8">
              {paragraphs.map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
            </div>
          </m.section>
        ))}
      </div>

      {/* Closing lines */}
      {showClosing && (
        <m.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-6 flex flex-col items-center gap-3 rounded-3xl bg-[#142B3B] px-6 py-8 text-center text-white shadow-xl sm:flex-row sm:gap-5 sm:text-left"
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
        </m.figure>
      )}
    </div>
  );
}
