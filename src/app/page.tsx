import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import LaunchHero from "@/components/LaunchHero";
import ScreenshotShowcase from "@/components/ScreenshotShowcase";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import LaunchCTA from "@/components/LaunchCTA";

export const dynamic = "force-dynamic";

/**
 * Tarra Launch Landing Page
 * 
 * Replaces the previous waitlist-only homepage.
 * Optimized for app downloads and feature discovery.
 */
export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <LaunchHero />
        
        <ScreenshotShowcase />
        
        <Features />
        
        <SocialProof />
        
        <LaunchCTA />
      </main>

      <Footer />
    </div>
  );
}
