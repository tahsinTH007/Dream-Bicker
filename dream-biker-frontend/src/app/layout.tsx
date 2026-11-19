import type { Metadata } from "next";
import { Galada, Inter, Manrope, Noto_Sans_Bengali, Sacramento } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Calligraphic Bengali display face for the hero accent phrase ("শান্তির প্রতীক")
const galada = Galada({
  variable: "--font-bengali-display",
  subsets: ["bengali", "latin"],
  weight: "400",
  display: "swap",
});

// Thin signature script for the "Dream Biker" autograph in the hero
const sacramento = Sacramento({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | ড্রিম বাইকার - হানিফ",
    default: "ড্রিম বাইকার (হানিফ) | কন্টেন্ট ক্রিয়েটর ও মানবসেবক",
  },
  description:
    "ড্রিম বাইকার (হানিফ)-এর অফিশিয়াল পোর্টফোলিও ও ব্লগ। বাংলাদেশের প্রত্যন্ত অঞ্চলের মানবিক গল্প, সমাজকল্যাণমূলক কার্যক্রম, ভ্রমণ ডায়েরি ও সহায়তা কার্যক্রম।",
  keywords: [
    "ড্রিম বাইকার",
    "Dream Biker",
    "হানিফ",
    "Hanif",
    "বাংলাদেশ",
    "কন্টেন্ট ক্রিয়েটর",
    "মানবসেবা",
    "সমাজকল্যাণ",
    "বাইক ভ্রমণ",
    "মানবিক গল্প",
  ],
  authors: [{ name: "হানিফ (ড্রিম বাইকার)" }],
  openGraph: {
    title: "ড্রিম বাইকার (হানিফ) | কন্টেন্ট ক্রিয়েটর ও মানবসেবক",
    description:
      "প্রতিটি জীবনের একটি গল্প আছে। প্রতিটি মানবিক কাজই মূল্যবান। ড্রিম বাইকারের অফিশিয়াল ওয়েবসাইট।",
    url: "https://dreambiker.com",
    siteName: "ড্রিম বাইকার",
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${notoSansBengali.variable} ${inter.variable} ${manrope.variable} ${galada.variable} ${sacramento.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F7F5EF]/30 text-[#222222] font-sans antialiased selection:bg-[#E97835] selection:text-white flex flex-col"
      >
        {children}
      </body>
    </html>
  );
}
