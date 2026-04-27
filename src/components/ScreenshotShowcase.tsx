"use client";

import React, { useRef, useState, useCallback } from "react";

/**
 * See Tarra in Action — Auto-scrolling marquee with drag/swipe support
 * 
 * Slow infinite scroll right-to-left.
 * Pauses on hover or touch. Supports mouse drag and touch swipe.
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
  <div className="relative flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden select-none">
    <div className={`absolute inset-0 bg-gradient-to-b ${card.darkGradient} hidden dark:block`} />
    <div className={`absolute inset-0 ${card.lightBg} dark:hidden`} />
    <div className="absolute inset-0 rounded-2xl border border-white/10 dark:border-white/[0.08]" />

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

    <div className="absolute bottom-5 left-5">
      <span className="text-white text-xl font-bold drop-shadow-lg pointer-events-none">
        {card.label}
      </span>
    </div>
  </div>
);

const ScreenshotShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(el.scrollLeft);
    el.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !containerRef.current) return;
      const dx = e.clientX - startX;
      containerRef.current.scrollLeft = scrollLeft - dx;
    },
    [isDragging, startX, scrollLeft]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section
      id="showcase"
      className="w-full py-20 md:py-28 bg-[var(--background)] dark:bg-[#0d1117] overflow-hidden"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-center text-gray-900 dark:text-white mb-12 md:mb-16 px-6 tracking-tight">
        See Tarra in Action
      </h2>

      {/* Scrollable + auto-marquee container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`overflow-x-auto scrollbar-hide cursor-grab group ${
          isDragging ? "cursor-grabbing" : ""
        }`}
      >
        <div
          className={`flex gap-5 md:gap-6 w-max px-6 md:px-12 ${
            isDragging ? "" : "animate-marquee group-hover:[animation-play-state:paused]"
          }`}
        >
          {cards.map((card) => (
            <CardItem key={card.label} card={card} />
          ))}
          {cards.map((card) => (
            <CardItem key={`dup-${card.label}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotShowcase;
