import { WebsiteLayout } from "@/components/layouts/website-layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WebsiteLayout>{children}</WebsiteLayout>;
}
