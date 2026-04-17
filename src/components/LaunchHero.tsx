import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";

/**
 * LaunchHero Component
 * 
 * Announcement-style hero section for the live product.
 */
const LaunchHero: React.FC = () => {
  return (
    <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden transition-colors">
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center max-w-4xl">
            {/* Launch Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now Live at OAU
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight transition-colors">
              OAU Commerce.<br />
              <span className="text-primary">Without the Chaos.</span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-secondary font-medium mb-1 transition-colors leading-relaxed">
              The verified marketplace. Join the waitlist for the
            </p>
            <p className="text-base sm:text-xl md:text-2xl font-black text-primary uppercase tracking-wider mb-10 transition-colors">
              ₦300,000 CASH PRIZE POOL.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="#" // TODO: Add app store link
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-black py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                <Smartphone className="w-5 h-5" />
                Download the App
              </Link>
              
              <Link
                href="/waitlist"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-dark/40 hover:bg-dark/60 border border-muted/10 text-white font-bold py-4 px-8 rounded-xl transition-all"
              >
                Already on the waitlist? 
                <span className="flex items-center gap-1 text-primary">
                  Check status <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'url("/assets/bg.jpeg")',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
};

export default LaunchHero;
