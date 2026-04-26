"use client";

import React from "react";

/**
 * See Tarra in Action — Slow auto-scrolling marquee showcase cards
 * 
 * 5 tall portrait cards duplicated for seamless infinite scroll.
 * Pauses on hover. Dark gradients / light pastels.
 */

const cards = [
  {
    label: "Browse",
    darkGradient: "from-[#0a4d3f] to-[#0d6b5a]",
    lightBg: "bg-[#e8e0f0]",
  },
  {
    label: "Sell",
    darkGradient: "from-[#4a2518] to-[#6b3d2e]",
    lightBg: "bg-[#d4f0dc]",
  },
  {
    label: "Services",
    darkGradient: "from-[#3a1a5e] to-[#5b2d8a]",
    lightBg: "bg-[#fce0c8]",
  },
  {
    label: "Chat",
    darkGradient: "from-[#1a1a5e] to-[#3a2d8a]",
    lightBg: "bg-[#f4d0e8]",
  },
  {
    label: "Analytics",
    darkGradient: "from-[#0a3d5e] to-[#1a5a7a]",
    lightBg: "bg-[#d0e8f4]",
  },
];

const CardItem = ({ card }: { card: (typeof cards)[number] }) => (
  <div className="relative flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden">
    {/* Dark mode gradient background */}
    <div
      className={`absolute inset-0 bg-gradient-to-b ${card.darkGradient} hidden dark:block`}
    />
    {/* Light mode pastel background */}
    <div
      className={`absolute inset-0 ${card.lightBg} dark:hidden`}
    />

    {/* Card border overlay */}
    <div className="absolute inset-0 rounded-2xl border border-white/10 dark:border-white/[0.08]" />

    {/* Phone/Grid Mockup Icon — centered */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-[2px]"
              style={{
                backgroundColor: [
                  "#f87171", "#fb923c", "#fbbf24",
                  "#4ade80", "#60a5fa", "#a78bfa",
                  "#f472b6", "#34d399", "#f97316",
                ][i],
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Label */}
    <div className="absolute bottom-5 left-5">
      <span className="text-white text-xl font-bold drop-shadow-lg">
        {card.label}
      </span>
    </div>
  </div>
);

const ScreenshotShowcase: React.FC = () => {
  return (
    <section
      id="showcase"
      className="w-full py-20 md:py-28 bg-white dark:bg-[#0d1117] overflow-hidden"
    >
      {/* Section Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-center text-gray-900 dark:text-white mb-12 md:mb-16 px-6 tracking-tight">
        See Tarra in Action
      </h2>

      {/* Marquee container — pauses on hover */}
      <div className="group relative">
        <div className="flex gap-5 md:gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {/* First set */}
          {cards.map((card) => (
            <CardItem key={card.label} card={card} />
          ))}
          {/* Duplicate for seamless loop */}
          {cards.map((card) => (
            <CardItem key={`dup-${card.label}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotShowcase;
