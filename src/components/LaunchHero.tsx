import React from "react";
import Link from "next/link";
import { Apple, Play } from "lucide-react";

/**
 * LaunchHero Component
 * 
 * Clean hero section with subtle grid background, social proof line,
 * main heading, subtext, and App Store / Google Play CTA buttons.
 * Fully responsive with dark/light mode support.
 */
const LaunchHero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-[var(--background)] dark:bg-[#0d1117]"
    >
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Radial fade so grid fades at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center max-w-4xl">
            {/* Social Proof Line */}
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium mb-8 tracking-wide">
              Trusted by{" "}
              <span className="text-[#00c6a7] font-bold">2,500+ OAU students</span>
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-gray-900 dark:text-white leading-[1.05] mb-8 tracking-tight">
              OAU Commerce.<br />
              Without the Chaos.
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium mb-14 max-w-2xl leading-relaxed">
              Buy, sell, and offer services. All in one account.
            </p>

            {/* CTA Buttons — dark mode: white bg, light mode: black bg */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="#"
                id="cta-app-store"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 px-8 rounded-2xl hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl border border-transparent"
              >
                <Apple className="w-6 h-6" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Download on the</span>
                  <span className="text-base font-bold -mt-0.5">App Store</span>
                </div>
              </Link>

              <Link
                href="#"
                id="cta-google-play"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 px-8 rounded-2xl hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl border border-transparent"
              >
                <Play className="w-6 h-6 fill-current" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Get it on</span>
                  <span className="text-base font-bold -mt-0.5">Google Play</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle teal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00c6a7]/5 dark:bg-[#00c6a7]/[0.08] rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default LaunchHero;
