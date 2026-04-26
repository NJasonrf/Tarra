import React from "react";
import { DollarSign, Truck, Store, BarChart3, Shield, MessageSquare } from "lucide-react";

/**
 * Features Component
 * 
 * "Built for Campus Life" section with a 3x2 grid of feature cards.
 * Each card has an icon, title, and description.
 * Adaptive styling for dark/light mode.
 */
const Features: React.FC = () => {
  const features = [
    {
      title: "Zero Fees",
      description: "Keep 100% of what you earn.",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: "Hostel Delivery",
      description: "Campus-wide delivery made easy.",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "Brand Storefront",
      description: "Dedicated storefront for campus brands.",
      icon: <Store className="w-6 h-6" />,
    },
    {
      title: "Analytics",
      description: "Track sales and performance.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Escrow Protection",
      description: "Payments held until delivery confirmed.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Safe Chat",
      description: "Ask questions safely on each listing.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#0d1117] transition-colors">
      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/5 to-transparent mb-16 md:mb-24" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Built for Campus Life
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-7 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] hover:border-[#00c6a7]/30 dark:hover:border-[#00c6a7]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#00c6a7]/5"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-[#00c6a7]/10 dark:bg-[#00c6a7]/10 rounded-xl flex items-center justify-center mb-5 text-[#00c6a7] group-hover:bg-[#00c6a7]/15 transition-colors">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
