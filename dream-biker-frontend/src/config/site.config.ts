export const siteConfig = {
  name: "ড্রিম বাইকার",
  nameEn: "Dream Biker",
  author: "মো. হানিফ হোসেন",
  authorEn: "Md. Hanif Hossain",
  title: "ড্রিম বাইকার (হানিফ) | কন্টেন্ট ক্রিয়েটর ও মানবসেবক",
  description:
    "ড্রিম বাইকার (হানিফ)-এর অফিশিয়াল পোর্টফোলিও ও মানবিক প্ল্যাটফর্ম। 'মানবতাই শান্তির প্রতীক'—সমগ্র বাংলাদেশের প্রত্যন্ত অঞ্চলের মানুষের পাশে দাঁড়ানো এবং মানবিক গল্প তুলে ধরা।",
  tagline: "প্রতিটি জীবনের একটি গল্প আছে। প্রতিটি মানবিক কাজই মূল্যবান।",
  impactMessage: "মানবতাই শান্তির প্রতীক (Humanity is a Symbol of Peace)",
  label: "কন্টেন্ট ক্রিয়েটর | মানবসেবক",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  // Figures shown in the home hero stats bar. Update these by hand.
  heroStats: [
    { value: "4.5M", label: "Facebook Followers", icon: "followers" },
    { value: "1.4B", label: "Reel Views", icon: "views" },
    { value: "98%", label: "Recommendation", icon: "recommend" },
    { value: "690", label: "Reviews", icon: "reviews" },
  ],
  contact: {
    email: "md.hanifhossan6991@gmail.com",
    location: "বাংলাদেশ",
    availability: "মানবিক কার্যক্রমের সহযোগিতা, পুনর্বাসন উদ্যোগ ও জরুরি সহায়তার জন্য উন্মুক্ত",
  },
} as const;

export type SiteConfig = typeof siteConfig;
