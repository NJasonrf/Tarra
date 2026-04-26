import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import LaunchHero from "@/components/LaunchHero";
import ScreenshotShowcase from "@/components/ScreenshotShowcase";
import Features from "@/components/Features";
import OneAccount from "@/components/OneAccount";

export const dynamic = "force-dynamic";

/**
 * Tarra Landing Page
 * 
 * Sections:
 * 1. Navbar (sticky)
 * 2. Hero — OAU Commerce. Without the Chaos.
 * 3. See Tarra in Action — scrollable showcase cards
 * 4. Built for Campus Life — 2×3 feature grid
 * 5. One Account. Everything. — Students & Brands cards
 * 6. Footer (always dark)
 */
export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <LaunchHero />
        
        <ScreenshotShowcase />
        
        <Features />
        
        <OneAccount />
      </main>

      <Footer />
    </div>
  );
}
