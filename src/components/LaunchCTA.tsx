import React from "react";
import Link from "next/link";
import { Apple, Play } from "lucide-react";

/**
 * LaunchCTA Component
 * 
 * Final download CTA at the bottom of the page.
 * Clean design with download buttons matching the hero.
 */
const LaunchCTA: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-white dark:bg-[#0d1117] relative overflow-hidden transition-colors">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Ready to trade?
          </h2>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-10 max-w-md">
            Download Tarra and start buying, selling, or offering services on campus.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#"
              id="cta-bottom-app-store"
              className="flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 px-8 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              <Apple className="w-6 h-6" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Download on the</span>
                <span className="text-base font-bold -mt-0.5">App Store</span>
              </div>
            </Link>

            <Link
              href="#"
              id="cta-bottom-google-play"
              className="flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 px-8 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              <Play className="w-6 h-6 fill-current" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Get it on</span>
                <span className="text-base font-bold -mt-0.5">Google Play</span>
              </div>
            </Link>
          </div>
          
          <p className="mt-10 text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.25em] text-xs">
            OAU Commerce. Without the Chaos.
          </p>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#00c6a7]/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default LaunchCTA;
