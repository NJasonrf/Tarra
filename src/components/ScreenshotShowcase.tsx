"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * ScreenshotShowcase Component
 * 
 * Premium Slider with a center-focused (bold) effect.
 * Uses IntersectionObserver to detect the centered image and applies
 * scaling and opacity transitions.
 */
const ScreenshotShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Start with center item (3rd)

  const screenshots = [
    { src: "/assets/screenshots/screenshot-1.png", alt: "Marketplace View" },
    { src: "/assets/screenshots/screenshot-2.png", alt: "Product Details" },
    { src: "/assets/screenshots/screenshot-3.png", alt: "Brand Profile" },
    { src: "/assets/screenshots/screenshot-4.png", alt: "Services Booking" },
    { src: "/assets/screenshots/screenshot-5.png", alt: "User Account" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.6, // Higher threshold ensures only the center-most item is "active"
      rootMargin: "0px -25% 0px -25%", // Narrow the observation area to the center
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute("data-index") || "0", 10);
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    const items = containerRef.current?.querySelectorAll(".screenshot-item");
    items?.forEach((item) => observer.observe(item));

    return () => items?.forEach((item) => observer.unobserve(item));
  }, []);

  return (
    <section className="relative py-16 md:py-24 bg-dark/20 border-y border-muted/5 overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'url("/assets/bg.jpeg")',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            Designed for <span className="text-primary">OAU Students.</span>
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            A seamless experience built specifically for the campus life.
          </p>
        </div>

        {/* Slider Container */}
        <div 
          ref={containerRef}
          className="flex flex-nowrap md:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 pt-10 px-[10%] md:px-[35%]"
          style={{ scrollPadding: "0 25%" }}
        >
          {screenshots.map((item, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={index}
                data-index={index}
                className={`screenshot-item flex-shrink-0 w-64 md:w-80 snap-center transition-all duration-700 ease-out transform
                  ${isActive ? "scale-110 md:scale-125 opacity-100 z-20" : "scale-90 opacity-40 blur-[2px] md:blur-none z-10"}
                `}
              >
                <div className={`relative aspect-[9/19] rounded-[2.5rem] p-3 bg-dark/80 border transition-all duration-700
                  ${isActive ? "border-transparent" : "border-transparent opacity-50"}
                  overflow-hidden group
                `}>
                  {/* Screen Content */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-dark">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-w-768px) 256px, 320px"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-dark/80 text-secondary text-[10px] font-bold p-4 text-center z-[-1]">
                      Screenshot Placeholder
                    </div>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {screenshots.map((_, i) => (
            <div 
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${activeIndex === i ? "w-8 bg-primary" : "w-2 bg-secondary/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotShowcase;
