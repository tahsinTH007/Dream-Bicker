export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  description: string;
  isAvailable: boolean;
  comingSoon?: boolean;
}

export const socialConfig: {
  youtube: SocialLink;
  facebook: SocialLink;
  instagram: SocialLink;
} = {
  youtube: {
    name: "YouTube",
    url: "https://www.youtube.com/@DreamBiker532",
    handle: "@DreamBiker532",
    description: "We believe that Humanity is a symbol of peace. Watch inspiring humanitarian documentaries, village rehabilitation stories, and journey diaries.",
    isAvailable: true,
  },
  facebook: {
    name: "Facebook",
    url: "https://www.facebook.com/BuydreambyHanif",
    handle: "BuydreambyHanif",
    description: "Follow daily field updates, real-life human stories, relief dispatches, and Facebook reels.",
    isAvailable: true,
  },
  instagram: {
    name: "Instagram",
    url: "https://www.instagram.com/dreambiker", // Coming soon placeholder
    handle: "@dreambiker",
    description: "Visual moments and behind the scenes. Integration coming soon.",
    isAvailable: false,
    comingSoon: true,
  },
};
