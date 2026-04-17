import React from "react";
import Link from "next/link";
import { Smartphone } from "lucide-react";

/**
 * LaunchCTA Component
 * 
 * Final call to action at the bottom of the page.
 */
const LaunchCTA: React.FC = () => {
  return (
    <section className="py-24 md:py-40 bg-dark relative overflow-hidden border-t border-muted/5">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'url("/assets/bg.jpeg")',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tight">
            Ready to trade?
          </h2>
          
          <Link
            href="#" // TODO: Add app store link
            className="flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-black py-5 px-10 rounded-2xl text-lg transition-all hover:scale-[1.05] active:scale-[0.95] shadow-2xl shadow-primary/30 mb-8"
          >
            <Smartphone className="w-6 h-6" />
            Download Tarra Now
          </Link>
          
          <p className="text-secondary font-bold uppercase tracking-[0.3em] text-sm">
            OAU Commerce. Without the Chaos.
          </p>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default LaunchCTA;
