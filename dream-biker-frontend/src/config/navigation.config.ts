export interface NavItem {
  title: string;
  href: string;
  description?: string;
  isExternal?: boolean;
}

export const mainNavItems: NavItem[] = [
  { title: "হোম", href: "/" },
  { title: "পরিচিতি", href: "/about" },
  { title: "ভিডিও", href: "/videos" },
  { title: "ব্লগ", href: "/blog" },
  { title: "গ্যালারি", href: "/gallery" },
  { title: "যোগাযোগ", href: "/contact" },
];

export const footerQuickLinks: NavItem[] = [
  { title: "হোম", href: "/" },
  { title: "পরিচিতি", href: "/about" },
  { title: "ভিডিও", href: "/videos" },
  { title: "ব্লগ", href: "/blog" },
  { title: "গ্যালারি", href: "/gallery" },
  { title: "যোগাযোগ", href: "/contact" },
];

export const legalNavItems: NavItem[] = [
  { title: "গোপনীয়তা নীতি", href: "/privacy-policy" },
  { title: "ব্যবহারের শর্তাবলী", href: "/terms-and-conditions" },
];
