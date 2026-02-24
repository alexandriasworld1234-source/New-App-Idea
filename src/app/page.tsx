import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TheShift } from "@/components/landing/TheShift";
import { TabbedShowcase } from "@/components/landing/TabbedShowcase";
import { OurStory } from "@/components/landing/OurStory";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="atmosphere grain">
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <TheShift />
        <TabbedShowcase />
        <OurStory />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
