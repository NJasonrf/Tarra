import React from "react";
import { Users } from "lucide-react";

/**
 * SocialProof Component
 * 
 * Highlighting the community size.
 */
const SocialProof: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 bg-dark transition-colors overflow-hidden">
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
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-8">
            <Users className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-4xl sm:text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter">
            2,500+
          </h2>
          
          <p className="text-lg sm:text-2xl md:text-3xl text-secondary font-medium max-w-2xl leading-tight">
            OAU students already on the waitlist. 
            <span className="text-white"> Join the movement.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
