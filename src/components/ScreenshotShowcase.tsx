"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * ScreenshotShowcase Component
 * 
 * Displays app screenshots with a subtle fade-in animation on scroll.
 */
const ScreenshotShowcase: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const screenshots = [
    { src: "/assets/screenshots/screenshot-1.png", alt: "Marketplace View" },
    { src: "/assets/screenshots/screenshot-2.png", alt: "Product Details" },
    { src: "/assets/screenshots/screenshot-3.png", alt: "Brand Profile" },
    { src: "/assets/screenshots/screenshot-4.png", alt: "Services Booking" },
    { src: "/assets/screenshots/screenshot-5.png", alt: "User Account" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("translate-y-0", "opacity-100");
            entry.target.classList.remove("translate-y-12", "opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = scrollRef.current?.querySelectorAll(".screenshot-item");
    items?.forEach((item) => observer.observe(item));

    return () => items?.forEach((item) => observer.unobserve(item));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-dark/20 border-y border-muted/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            Designed for <span className="text-primary">OAU Students.</span>
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            A seamless experience built specifically for the campus life.
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="flex flex-nowrap md:flex-wrap justify-center gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 scrollbar-hide"
        >
          {screenshots.map((item, index) => (
            <div 
              key={index}
              className="screenshot-item flex-shrink-0 w-64 md:w-72 lg:w-80 transition-all duration-700 delay-[200ms] opacity-0 translate-y-12"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[9/19] rounded-[2.5rem] p-3 bg-dark/80 border border-muted/10 shadow-2xl overflow-hidden group">
                {/* Screen Content */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-dark">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-w-768px) 256px, 320px"
                  />
                  
                  {/* Placeholder overlay if image fails to load */}
                  <div className="absolute inset-0 flex items-center justify-center bg-dark/80 text-secondary text-xs font-bold p-4 text-center z-[-1]">
                    Screenshot Placeholder
                  </div>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotShowcase;
