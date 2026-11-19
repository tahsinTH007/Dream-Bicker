import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { MotionProvider } from "./motion-provider";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <MotionProvider>
      <div className="flex min-h-screen flex-col bg-[#F7F5EF]/20">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
