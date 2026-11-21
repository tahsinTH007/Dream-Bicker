"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { DreamBikerStory } from "@/components/shared/dream-biker-story";

export function AboutBio() {
  return (
    <section className="py-12 sm:py-16 bg-[#F7F5EF]/60 border-y border-[#EAE6DB] overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="আমাদের পথচলা"
          title="লক্ষ্য, কার্যক্রম, বিশ্বাস ও স্বপ্ন"
          description="ভ্রমণের প্রতিটি পথে, মানবতার পাশে।"
          align="center"
        />
        <DreamBikerStory />
      </div>
    </section>
  );
}
