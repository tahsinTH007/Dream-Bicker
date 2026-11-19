"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Eye,
  Loader2,
} from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { NormalizedPhoto } from "@/server/social/social.types";
import { CoverflowCarousel, CoverflowItem } from "./coverflow-carousel";
import { cn } from "@/lib/utils";

interface GalleryViewProps {
  initialPhotos: NormalizedPhoto[];
}

interface CuratedGalleryItem {
  id: string;
  imageUrl: string;
  location: string;
  title: string;
  caption: string;
  provider: "FACEBOOK" | "YOUTUBE";
  aspect: string;
  publishedAt: string;
  sourceUrl?: string;
}

// 18 Curated High-Definition Photographic Frames (matching the reference editorial style)
const curatedMasterPhotos: CuratedGalleryItem[] = [
  // 1. Column 1 Hero: Half Dome Mountain at dusk (matching reference column 1)
  {
    id: "photo-1",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
    location: "YOSEMITE, CALIFORNIA",
    title: "নীরব পর্বতমালার চূড়ায় ভোরের আলো",
    caption: "ভোরের প্রথম রশ্মিতে জাগ্রত হওয়া পাহাড়ের বুক। নির্জন প্রকৃতির নিস্তব্ধতা যেখানে হৃদয়ের গভীর অনুভূতিকে স্পর্শ করে।",
    provider: "YOUTUBE",
    aspect: "aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]",
    publishedAt: "2026-02-14T10:00:00.000Z",
    sourceUrl: "https://www.youtube.com/@DreamBiker532",
  },
  // 2. Column 2 Top: Intimate creature / subject on dark canvas (matching reference column 2 top)
  {
    id: "photo-2",
    imageUrl: "https://images.unsplash.com/photo-1507666405895-422eee7d517f?auto=format&fit=crop&w=1000&q=85",
    location: "CAIRNGORMS, SCOTLAND",
    title: "অন্ধকারের বুক চিরে মায়াবী দৃষ্টি",
    caption: "নিস্তব্ধ বনে শান্ত দৃষ্টিতে তাকিয়ে থাকা নিঃসঙ্গ প্রাণী। প্রকৃতির মাঝে লুকিয়ে থাকা এক অনুপম জীবনবোধ।",
    provider: "FACEBOOK",
    aspect: "aspect-[4/3] sm:aspect-[1/1]",
    publishedAt: "2026-02-12T14:30:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 3. Column 3 Hero: Warm golden sunset mountain & desert (matching reference column 3)
  {
    id: "photo-3",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85",
    location: "NAMIB DESERT, SUNSET",
    title: "সোনালি গোধূলির আলোয় শান্ত প্রান্তর",
    caption: "ধূসর মরুর বুকে অস্তগামী সূর্যের শেষ আভা। জীবনের ক্লান্তি ধুয়ে যাওয়া এক শান্ত সন্ধ্যার স্মৃতি।",
    provider: "FACEBOOK",
    aspect: "aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]",
    publishedAt: "2026-02-10T18:00:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 4. Column 2 Bottom: White misty ocean horizon (matching reference column 2 bottom)
  {
    id: "photo-4",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
    location: "NORTH SEA, NORDIC COAST",
    title: "কুয়াশা ও অনন্ত জলরাশির সীমানা",
    caption: "অবারিত জলরাশির কূলে দাঁড়িয়ে দূর দিগন্তের পানে দৃষ্টি। জীবনের অস্থিরতা ভুলে শান্ত হওয়ার স্থান।",
    provider: "YOUTUBE",
    aspect: "aspect-[16/10] sm:aspect-[4/3]",
    publishedAt: "2026-02-08T12:00:00.000Z",
    sourceUrl: "https://www.youtube.com/@DreamBiker532",
  },
  // 5. Dream Biker on Motorbike - Solitary Highway
  {
    id: "photo-5",
    imageUrl: "/images/profile/hanif_jacket_back.jpg",
    location: "DHAKA - BOGURA HIGHWAY",
    title: "ড্রিম বাইকার — মেঠোপথের অভিযাত্রী",
    caption: "মহাসড়কের বুকে একা পথচলা। মানুষের দুয়ারে সহমর্মিতার বার্তা পৌঁছাতে ছুটে চলা প্রতিনিয়ত।",
    provider: "FACEBOOK",
    aspect: "aspect-[4/3] sm:aspect-[1/1]",
    publishedAt: "2026-02-05T09:15:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 6. Motorcycle by Lake Shore
  {
    id: "photo-6",
    imageUrl: "/images/footer_bike.jpg",
    location: "LAKE SHORE, BANGLADESH",
    title: "যাত্রাবিরতির এক নিঃশব্দ দুপুর",
    caption: "লেক আর সবুজের আলিঙ্গনে মোটরসাইকেল থামিয়ে ক্ষণিকের জিরেন। পথই যার ঘর, গন্তব্য তার মানবকল্যাণ।",
    provider: "FACEBOOK",
    aspect: "aspect-[16/10] sm:aspect-[4/3]",
    publishedAt: "2026-02-03T16:20:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 7. Smiles of Char Children
  {
    id: "photo-7",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=85",
    location: "JAMUNA CHAR, SIRAJGANJ",
    title: "চরের শিশুদের অনাবিল হাসিমুখ",
    caption: "দারিদ্র্যের মাঝেও যে হাসি অমলিন। এক টুকরো উপহার আর ভালোবাসায় তাদের চোখে খেলে যায় আনন্দের ঝিলিক।",
    provider: "YOUTUBE",
    aspect: "aspect-[3/4] sm:aspect-[4/5]",
    publishedAt: "2026-01-29T11:45:00.000Z",
    sourceUrl: "https://www.youtube.com/@DreamBiker532",
  },
  // 8. Elderly Rickshaw Puller
  {
    id: "photo-8",
    imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=85",
    location: "PADMA RIVERBANK, RAJSHAHI",
    title: "শ্রমে ঘামে ভেজা একাকী সংগ্রাম",
    caption: "নদীর পাড়ে ক্লান্ত রিকশাচালক চাচার সাথে বসে জীবনের সুখ-দুঃখের স্মৃতি রোমন্থন।",
    provider: "FACEBOOK",
    aspect: "aspect-[16/10] sm:aspect-[4/3]",
    publishedAt: "2026-01-25T14:10:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 9. Hanif Sitting in Forest
  {
    id: "photo-9",
    imageUrl: "/images/profile/hanif_hero_portrait.jpg",
    location: "SYLHET TEA HILLS",
    title: "সবুজের মাঝে ধ্যানের মুহূর্ত",
    caption: "পরবর্তী মানবিক অভিযানের আগে প্রকৃতির নিবিড় সান্নিধ্যে মনের শক্তি সঞ্চয়।",
    provider: "FACEBOOK",
    aspect: "aspect-[4/3] sm:aspect-[1/1]",
    publishedAt: "2026-01-20T10:30:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 10. Bicycle Leaning Against Rainy Wall
  {
    id: "photo-10",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=85",
    location: "OLD DHAKA, BANGLADESH",
    title: "বৃষ্টিস্নাত মেঠোপথের বাহন",
    caption: "অঝোর ধারায় ভেজা দেয়ালে দাঁড়িয়ে থাকা এক শ্রমিকের স্বপ্ন। বৃষ্টিতে ধুয়ে যায় শহুরে কোলাহল।",
    provider: "FACEBOOK",
    aspect: "aspect-[3/4] sm:aspect-[4/5]",
    publishedAt: "2026-01-15T15:50:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 11. Endless North Bengal Highway
  {
    id: "photo-11",
    imageUrl: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=1000&q=85",
    location: "DINAJPUR RURAL ROAD",
    title: "ফসলের মাঠের বুক চিরে চলা পথ",
    caption: "দুপাশে সোনালি ধানের খেত পেরিয়ে মেঠোপথে মোটরসাইকেল চালানো। গ্রামবাংলার চিরচেনা সৌন্দর্য।",
    provider: "YOUTUBE",
    aspect: "aspect-[16/10] sm:aspect-[4/3]",
    publishedAt: "2026-01-10T08:00:00.000Z",
    sourceUrl: "https://www.youtube.com/@DreamBiker532",
  },
  // 12. Flood Relief Volunteers
  {
    id: "photo-12",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=85",
    location: "RANGPUR RELIEF CAMP",
    title: "স্বেচ্ছাসেবীদের ঐক্যবদ্ধ শপথ",
    caption: "বন্যার্ত পরিবারের কাছে জরুরি খাদ্যসামগ্রী পৌঁছে দিতে একদল তরুণের নিরলস পরিশ্রম ও আন্তরিকতা।",
    provider: "FACEBOOK",
    aspect: "aspect-[4/3] sm:aspect-[1/1]",
    publishedAt: "2026-01-05T13:20:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 13. Street Dog Resting in Alley
  {
    id: "photo-13",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85",
    location: "BOGURA OLD BAZAAR",
    title: "নিস্তব্ধ দুপুরে একা পথিকের বিশ্রাম",
    caption: "বন্ধ দোকানের শাটারের সামনে ক্লান্ত দেহে পরম শান্তিতে ঘুমিয়ে থাকা নিরীহ অবলা পথশিশু।",
    provider: "YOUTUBE",
    aspect: "aspect-[4/3] sm:aspect-[1/1]",
    publishedAt: "2025-12-28T17:10:00.000Z",
    sourceUrl: "https://www.youtube.com/@DreamBiker532",
  },
  // 14. Iconic Historic Landmark in Mist
  {
    id: "photo-14",
    imageUrl: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1000&q=85",
    location: "HISTORIC CLOCK TOWER",
    title: "সময়ের নীরব অভিভাবক",
    caption: "মেঘ আর কুয়াশাকে ভেদ করে মাথা উঁচু করে দাঁড়িয়ে থাকা স্মারক। সময়ের স্রোতে হারিয়ে যাওয়া কত শত গল্প।",
    provider: "YOUTUBE",
    aspect: "aspect-[3/4] sm:aspect-[9/16] lg:aspect-[3/4]",
    publishedAt: "2025-12-22T09:40:00.000Z",
    sourceUrl: "https://www.youtube.com/@DreamBiker532",
  },
  // 15. Driftwood / Weathered Tree in Nature
  {
    id: "photo-15",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=85",
    location: "SUNDARBANS TIDAL FOREST",
    title: "প্রকৃতির নিঃশব্দ ভাস্কর্য",
    caption: "নোনা জলের স্রোতে শতাব্দীর ইতিহাস ধারণ করা কাঠের শেকড়। প্রকৃতির সহ্যশক্তি ও সহনশীলতার অনন্য নিদর্শন।",
    provider: "FACEBOOK",
    aspect: "aspect-[3/4] sm:aspect-[4/5]",
    publishedAt: "2025-12-15T11:00:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 16. Night Street Crossing & Life
  {
    id: "photo-16",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=85",
    location: "CHITTAGONG PORT HIGHWAY",
    title: "রাতের আলোয় জীবিকার স্পন্দন",
    caption: "দিনের আলো নিভে যাওয়ার পরও যাদের জীবন থেমে থাকে না। শহরের ব্যস্ত রাজপথে শ্রমিকের পদধ্বনি।",
    provider: "YOUTUBE",
    aspect: "aspect-[16/10] sm:aspect-[4/3]",
    publishedAt: "2025-12-10T21:30:00.000Z",
    sourceUrl: "https://www.youtube.com/@DreamBiker532",
  },
  // 17. Curved Architectural Steps
  {
    id: "photo-17",
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1000&q=85",
    location: "SAVAR MEMORIAL GROUNDS",
    title: "উন্নতি ও স্বপ্নের সোপান",
    caption: "কুয়াশার চাদরে ঢাকা ঊর্ধ্বমুখী স্থাপত্যের খাঁজ। আত্মত্যাগের গৌরবগাথা ধারণ করে থাকা প্রাঙ্গণ।",
    provider: "FACEBOOK",
    aspect: "aspect-[3/4] sm:aspect-[9/16] lg:aspect-[3/4]",
    publishedAt: "2025-12-05T07:45:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
  // 18. Emotional Eye Contact & Portrait
  {
    id: "photo-18",
    imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=85",
    location: "CHAR SHURID, KURIGRAM",
    title: "সহমর্মিতার এক শান্ত সমর্পণ",
    caption: "শব্দহীন চোখের চাহনি যা হাজারো না বলা কথা ব্যক্ত করে। মানুষের প্রতি নিখাদ ভালোবাসাই আমাদের পাথেয়।",
    provider: "FACEBOOK",
    aspect: "aspect-[4/3] sm:aspect-[1/1]",
    publishedAt: "2025-12-01T12:00:00.000Z",
    sourceUrl: "https://www.facebook.com/BuydreambyHanif",
  },
];

export function GalleryView({ initialPhotos }: GalleryViewProps) {
  // Filter state strictly: "ALL", "FACEBOOK", "YOUTUBE" as requested
  const [activeFilter, setActiveFilter] = React.useState<"all" | "facebook" | "youtube">("all");

  // Number of items displayed currently (initial 9; appends more on scroll down)
  const [visibleCount, setVisibleCount] = React.useState<number>(9);
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);

  // Color mode: "noir" (Grayscale that blooms into vivid color on hover) or "color" (Always full color)
  const [colorMode, setColorMode] = React.useState<"noir" | "color">("noir");

  // Lightbox modal active photo
  const [activePhoto, setActivePhoto] = React.useState<{
    imageUrl: string;
    caption?: string | null;
    title?: string;
    location?: string;
    provider?: string | null;
    publishedAt?: string | null;
    sourceUrl?: string | null;
  } | null>(null);

  // Combine initialPhotos from API with curated photos
  const allPhotosCombined: CuratedGalleryItem[] = React.useMemo(() => {
    const list: CuratedGalleryItem[] = [...curatedMasterPhotos];

    // If database or API has additional photos, merge them seamlessly
    initialPhotos.forEach((apiPhoto, idx) => {
      // Avoid exact duplicates
      if (!list.some((item) => item.imageUrl === apiPhoto.imageUrl)) {
        list.push({
          id: `api-photo-${apiPhoto.id || idx}`,
          imageUrl: apiPhoto.imageUrl,
          location: apiPhoto.provider === "YOUTUBE" ? "YOUTUBE PUBLICATION" : "FACEBOOK POST",
          title: apiPhoto.caption?.slice(0, 40) || "ড্রিম বাইকার ফ্রেম",
          caption: apiPhoto.caption || "মাঠপর্যায়ের অভিজ্ঞতা ও সামাজিক ডায়েরি থেকে সংগৃহীত আলোকচিত্র।",
          provider: apiPhoto.provider === "YOUTUBE" ? "YOUTUBE" : "FACEBOOK",
          aspect: idx % 3 === 0 ? "aspect-[3/4]" : idx % 2 === 0 ? "aspect-[16/10]" : "aspect-[1/1]",
          publishedAt: apiPhoto.publishedAt,
          sourceUrl: apiPhoto.sourceUrl || undefined,
        });
      }
    });

    return list;
  }, [initialPhotos]);

  // Filtered array according to active tab
  const filteredList = React.useMemo(() => {
    if (activeFilter === "facebook") {
      return allPhotosCombined.filter((p) => p.provider === "FACEBOOK");
    }
    if (activeFilter === "youtube") {
      return allPhotosCombined.filter((p) => p.provider === "YOUTUBE");
    }
    return allPhotosCombined;
  }, [allPhotosCombined, activeFilter]);

  // Carousel items derived from filteredList (up to 12 items for smooth looping)
  const carouselItems: CoverflowItem[] = React.useMemo(() => {
    return filteredList.slice(0, 12).map((p) => ({
      id: `carousel-${p.id}`,
      imageUrl: p.imageUrl,
      category: p.location || (p.provider === "YOUTUBE" ? "YOUTUBE PUBLICATION" : "FIELD EXPEDITION"),
      title: p.title,
      caption: p.caption,
      location: p.location,
      provider: p.provider,
      publishedAt: p.publishedAt,
      sourceUrl: p.sourceUrl,
    }));
  }, [filteredList]);

  // Current slice of photos based on visibleCount
  const visiblePhotos = React.useMemo(() => {
    return filteredList.slice(0, visibleCount);
  }, [filteredList, visibleCount]);

  // Reset visibleCount when filter changes
  const handleFilterChange = (filter: "all" | "facebook" | "youtube") => {
    setActiveFilter(filter);
    setVisibleCount(9);
  };

  // Scroll-down Infinite Loading: Sentinel observer to add photos dynamically like requested
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore && visibleCount < filteredList.length) {
          setIsLoadingMore(true);
          // Subtle natural delay to show smooth appending animation
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 6, filteredList.length));
            setIsLoadingMore(false);
          }, 350);
        }
      },
      { rootMargin: "250px" }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [visibleCount, filteredList.length, isLoadingMore]);

  // Lightbox keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;

      if (e.key === "Escape") {
        setActivePhoto(null);
      } else if (e.key === "ArrowLeft") {
        const curIdx = filteredList.findIndex((p) => p.imageUrl === activePhoto.imageUrl);
        if (curIdx > 0) {
          const prev = filteredList[curIdx - 1];
          setActivePhoto({
            imageUrl: prev.imageUrl,
            caption: prev.caption,
            title: prev.title,
            location: prev.location,
            provider: prev.provider,
            publishedAt: prev.publishedAt,
            sourceUrl: prev.sourceUrl,
          });
        }
      } else if (e.key === "ArrowRight") {
        const curIdx = filteredList.findIndex((p) => p.imageUrl === activePhoto.imageUrl);
        if (curIdx >= 0 && curIdx < filteredList.length - 1) {
          const next = filteredList[curIdx + 1];
          setActivePhoto({
            imageUrl: next.imageUrl,
            caption: next.caption,
            title: next.title,
            location: next.location,
            provider: next.provider,
            publishedAt: next.publishedAt,
            sourceUrl: next.sourceUrl,
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, filteredList]);

  // Lock scroll during lightbox
  React.useEffect(() => {
    if (activePhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activePhoto]);

  // Distribute visiblePhotos into 3 responsive columns for true masonry stacking
  const column1 = visiblePhotos.filter((_, idx) => idx % 3 === 0);
  const column2 = visiblePhotos.filter((_, idx) => idx % 3 === 1);
  const column3 = visiblePhotos.filter((_, idx) => idx % 3 === 2);

  // Render photo card
  const renderCard = (photo: CuratedGalleryItem, globalIndex: number) => {
    const isYT = photo.provider === "YOUTUBE";

    return (
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: (globalIndex % 4) * 0.08 }}
        whileHover={{ y: -6 }}
        onClick={() =>
          setActivePhoto({
            imageUrl: photo.imageUrl,
            title: photo.title,
            location: photo.location,
            caption: photo.caption,
            provider: photo.provider,
            publishedAt: photo.publishedAt,
            sourceUrl: photo.sourceUrl,
          })
        }
        className={cn(
          "group relative w-full overflow-hidden bg-[#111111] cursor-pointer shadow-lg transition-all duration-500",
          photo.aspect
        )}
      >
        {/* Main Image */}
        <Image
          src={photo.imageUrl}
          alt={photo.caption || photo.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-all duration-700 ease-out group-hover:scale-105",
            colorMode === "noir" ? "grayscale contrast-[1.08] group-hover:grayscale-0" : ""
          )}
        />

        {/* Static Bottom-Left Location Tag (Identical to reference: CAIRNGORMS, SCOTLAND) */}
        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
          <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {photo.location}
          </span>
        </div>

        {/* Hover Overlay (Existing rich hover effect: platform badge, zoom icon, title & full caption) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-6 z-20">
          {/* Top: Platform Badge & Zoom Icon */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-white bg-black/70 backdrop-blur-md border border-white/20 shadow-md">
              {isYT ? (
                <>
                  <FaYoutube className="h-3.5 w-3.5 text-red-500" />
                  <span>YOUTUBE</span>
                </>
              ) : (
                <>
                  <FaFacebookF className="h-3 w-3 text-blue-400" />
                  <span>FACEBOOK</span>
                </>
              )}
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/35 transition-colors">
              <Maximize2 className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Bottom: Location, Title, & Detailed Caption */}
          <div className="space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E97835]">
                {photo.location}
              </span>
            </div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-white leading-snug">
              {photo.title}
            </h3>
            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
              {photo.caption}
            </p>
            <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-white/90">
              <span>বড় করে দেখুন</span>
              <ArrowUpRight className="h-3 w-3 text-[#E97835]" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* =========================================================================
          TOP MINIMALIST FILTER NAVIGATION (MATCHING EXACT REFERENCE SCREENSHOT)
          Filter options: "ALL" | "FACEBOOK" | "YOUTUBE"
         ========================================================================= */}
      <section className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-12 py-5 sm:py-6">
        <div className="max-w-[1720px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: 3 Filter Tabs ("ALL", "FACEBOOK", "YOUTUBE") with sleek white underline */}
          <nav className="flex items-center gap-6 sm:gap-10">
            {/* 1. ALL */}
            <button
              onClick={() => handleFilterChange("all")}
              className={cn(
                "relative font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-colors pb-2 cursor-pointer",
                activeFilter === "all" ? "text-white" : "text-white/45 hover:text-white/80"
              )}
            >
              <span>ALL</span>
              {activeFilter === "all" && (
                <motion.span
                  layoutId="filterActiveLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 2. FACEBOOK */}
            <button
              onClick={() => handleFilterChange("facebook")}
              className={cn(
                "relative flex items-center gap-2 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-colors pb-2 cursor-pointer",
                activeFilter === "facebook" ? "text-white" : "text-white/45 hover:text-white/80"
              )}
            >
              <span>FACEBOOK</span>
              {activeFilter === "facebook" && (
                <motion.span
                  layoutId="filterActiveLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 3. YOUTUBE */}
            <button
              onClick={() => handleFilterChange("youtube")}
              className={cn(
                "relative flex items-center gap-2 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-colors pb-2 cursor-pointer",
                activeFilter === "youtube" ? "text-white" : "text-white/45 hover:text-white/80"
              )}
            >
              <span>YOUTUBE</span>
              {activeFilter === "youtube" && (
                <motion.span
                  layoutId="filterActiveLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </nav>

          {/* Right: Noir / Color Mode Toggle & Item Count */}
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline-block font-sans uppercase tracking-[0.2em] text-white/40 text-[11px]">
              {filteredList.length} FRAMES
            </span>

            <div className="flex items-center gap-1.5 rounded-full bg-white/10 p-1 border border-white/15">
              <button
                onClick={() => setColorMode("noir")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer",
                  colorMode === "noir"
                    ? "bg-white text-black shadow-sm"
                    : "text-white/60 hover:text-white"
                )}
              >
                <Eye className="h-3 w-3" />
                <span>NOIR</span>
              </button>
              <button
                onClick={() => setColorMode("color")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer",
                  colorMode === "color"
                    ? "bg-[#E97835] text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                )}
              >
                <Sparkles className="h-3 w-3" />
                <span>VIVID</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED 3D COVER FLOW CAROUSEL SLIDER (MATCHING humble-method-084621.framer.app)
          - Active center card (elevated, prominent, white pill button)
          - Left & Right peek cards (scale down, 70% opacity)
          - Floating '<' and '>' circular white arrow buttons
         ========================================================================= */}
      <section className="relative w-full border-b border-white/10 bg-black/40">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
          <CoverflowCarousel
            items={carouselItems}
            onSelectPhoto={(item) =>
              setActivePhoto({
                imageUrl: item.imageUrl,
                title: item.title,
                location: item.location,
                caption: item.caption,
                provider: item.provider,
                publishedAt: item.publishedAt,
                sourceUrl: item.sourceUrl,
              })
            }
            buttonText="View Product"
          />
        </div>
      </section>

      {/* =========================================================================
          GALLERY MASONRY GRID (3 Responsive Stacks matching reference image)
          - Smooth scroll-down reveal where photos dynamically enter the frame
         ========================================================================= */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-20">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/10">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-white/60">
            ALL FRAMES • MASONRY ARCHIVE
          </span>
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-white/40">
            SCROLL DOWN TO REVEAL MORE ({visibleCount} OF {filteredList.length})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {column1.map((photo, i) => renderCard(photo, i * 3))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {column2.map((photo, i) => renderCard(photo, i * 3 + 1))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 sm:col-span-2 lg:col-span-1">
            {column3.map((photo, i) => renderCard(photo, i * 3 + 2))}
          </div>
        </div>

        {/* =========================================================================
            SCROLL-DOWN TRIGGER / SENTINEL (Dynamically loads more photos as you scroll)
           ========================================================================= */}
        <div ref={sentinelRef} className="pt-16 pb-12 flex flex-col items-center justify-center text-center">
          {isLoadingMore ? (
            <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-[0.25em]">
              <Loader2 className="h-4 w-4 animate-spin text-[#E97835]" />
              <span>LOADING FRAMES...</span>
            </div>
          ) : visibleCount < filteredList.length ? (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredList.length))}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
            >
              <span>LOAD MORE FRAMES ({filteredList.length - visibleCount} REMAINING)</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center gap-3 text-white/30 text-[11px] font-bold uppercase tracking-[0.25em]">
              <span className="h-px w-10 bg-white/15" />
              <span>DREAM BIKER ARCHIVE • ALL FRAMES LOADED</span>
              <span className="h-px w-10 bg-white/15" />
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
          FULLSCREEN LIGHTBOX MODAL WITH FRAMER MOTION ANIMATION
         ========================================================================= */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 backdrop-blur-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close"
              className="absolute top-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev Photo Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const curIdx = filteredList.findIndex((p) => p.imageUrl === activePhoto.imageUrl);
                if (curIdx > 0) {
                  const prev = filteredList[curIdx - 1];
                  setActivePhoto({
                    imageUrl: prev.imageUrl,
                    caption: prev.caption,
                    title: prev.title,
                    location: prev.location,
                    provider: prev.provider,
                    publishedAt: prev.publishedAt,
                    sourceUrl: prev.sourceUrl,
                  });
                } else {
                  const last = filteredList[filteredList.length - 1];
                  setActivePhoto({
                    imageUrl: last.imageUrl,
                    caption: last.caption,
                    title: last.title,
                    location: last.location,
                    provider: last.provider,
                    publishedAt: last.publishedAt,
                    sourceUrl: last.sourceUrl,
                  });
                }
              }}
              aria-label="Previous"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Photo Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const curIdx = filteredList.findIndex((p) => p.imageUrl === activePhoto.imageUrl);
                if (curIdx >= 0 && curIdx < filteredList.length - 1) {
                  const next = filteredList[curIdx + 1];
                  setActivePhoto({
                    imageUrl: next.imageUrl,
                    caption: next.caption,
                    title: next.title,
                    location: next.location,
                    provider: next.provider,
                    publishedAt: next.publishedAt,
                    sourceUrl: next.sourceUrl,
                  });
                } else {
                  const first = filteredList[0];
                  setActivePhoto({
                    imageUrl: first.imageUrl,
                    caption: first.caption,
                    title: first.title,
                    location: first.location,
                    provider: first.provider,
                    publishedAt: first.publishedAt,
                    sourceUrl: first.sourceUrl,
                  });
                }
              }}
              aria-label="Next"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Modal Dialog Content Container */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center max-h-[92vh] max-w-5xl w-full"
            >
              {/* Image Frame */}
              <div className="relative h-[65vh] sm:h-[72vh] w-full rounded-lg overflow-hidden shadow-2xl bg-black">
                <Image
                  src={activePhoto.imageUrl}
                  alt={activePhoto.caption || activePhoto.title || "ফুল রেজোলিউশন ছবি"}
                  fill
                  priority
                  sizes="(max-width: 1200px) 90vw, 1200px"
                  className="object-contain"
                />
              </div>

              {/* Caption & Metadata Bar */}
              <div className="mt-4 w-full rounded-xl bg-white/10 p-4 sm:p-5 text-white backdrop-blur-xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E97835] uppercase tracking-[0.2em]">
                      {activePhoto.location || (activePhoto.provider === "YOUTUBE" ? "YOUTUBE" : "FACEBOOK")}
                    </span>
                    {activePhoto.publishedAt && (
                      <>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/70">
                          {new Date(activePhoto.publishedAt).toLocaleDateString("bn-BD", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </>
                    )}
                  </div>
                  {activePhoto.title && (
                    <h4 className="font-heading text-sm sm:text-base font-bold text-white mb-1">
                      {activePhoto.title}
                    </h4>
                  )}
                  <p className="text-xs sm:text-sm font-normal text-white/80 line-clamp-2 leading-relaxed">
                    {activePhoto.caption}
                  </p>
                </div>

                {activePhoto.sourceUrl && (
                  <a
                    href={activePhoto.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:bg-[#E97835] hover:text-white hover:scale-105 shadow-md shrink-0"
                  >
                    <span>মূল উৎস দেখুন</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
