import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TabbedShowcase } from "@/components/landing/TabbedShowcase";
import { OurStory } from "@/components/landing/OurStory";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="atmosphere min-h-screen scroll-smooth">
      <Navbar />
      <Hero />
      <TabbedShowcase />
      <OurStory />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
