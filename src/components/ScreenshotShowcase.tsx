"use client";

import React from "react";
import { Smartphone } from "lucide-react";

/**
 * ScreenshotShowcase Component
 * 
 * "See Tarra in Action" section with horizontally scrollable
 * app screen cards, each with a gradient background and label.
 * Adaptive colors for dark/light mode.
 */
const ScreenshotShowcase: React.FC = () => {
  const screens = [
    { label: "Browse", darkGradient: "from-teal-700 to-teal-900", lightGradient: "from-indigo-100 to-purple-100" },
    { label: "Sell", darkGradient: "from-amber-700 to-orange-900", lightGradient: "from-green-100 to-emerald-100" },
    { label: "Services", darkGradient: "from-purple-700 to-violet-900", lightGradient: "from-orange-100 to-amber-100" },
    { label: "Chat", darkGradient: "from-cyan-700 to-blue-900", lightGradient: "from-pink-100 to-rose-100" },
    { label: "Analytics", darkGradient: "from-emerald-700 to-green-900", lightGradient: "from-cyan-100 to-sky-100" },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-white dark:bg-[#0d1117] overflow-hidden transition-colors">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/5 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            See Tarra in Action
          </h2>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mx-6 px-6">
          {screens.map((screen, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 snap-center group"
            >
              <div className={`relative aspect-[3/4] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 transition-all duration-500 group-hover:border-gray-300 dark:group-hover:border-white/10 group-hover:scale-[1.02]`}>
                {/* Gradient Background — dark mode */}
                <div className={`absolute inset-0 bg-gradient-to-br ${screen.darkGradient} hidden dark:block`} />
                {/* Gradient Background — light mode */}
                <div className={`absolute inset-0 bg-gradient-to-br ${screen.lightGradient} dark:hidden`} />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-30">
                  <Smartphone className="w-20 h-20 text-gray-900 dark:text-white" />
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {screen.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotShowcase;
