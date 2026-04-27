import React from "react";
import {
  DollarSign,
  Truck,
  Store,
  BarChart3,
  Shield,
  MessageSquare,
} from "lucide-react";

/**
 * Built for Campus Life — 2×3 Feature Grid
 * 
 * Six feature cards with teal icon badges, bold titles, and muted descriptions.
 * Dark mode: semi-transparent dark cards. Light mode: white cards with border.
 */

const features = [
  {
    icon: DollarSign,
    title: "Zero Fees",
    description: "No commission. No hidden charges. Ever.",
  },
  {
    icon: Truck,
    title: "Hostel Delivery",
    description: "Delivered straight to your hostel door.",
  },
  {
    icon: Store,
    title: "Brand Storefront",
    description: "Dedicated storefront for campus brands.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track sales and performance.",
  },
  {
    icon: Shield,
    title: "Escrow Protection",
    description: "Payments held until delivery confirmed.",
  },
  {
    icon: MessageSquare,
    title: "Safe Chat",
    description: "Ask questions safely on each listing.",
  },
];

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="w-full py-20 md:py-28 bg-white dark:bg-[#00c6a7]"
    >
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-center text-gray-900 dark:text-white mb-14 md:mb-20 tracking-tight">
          Built for Campus Life
        </h2>

        {/* 2×3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-7 md:p-8 rounded-2xl border bg-white dark:bg-[#009e88] border-gray-200 dark:border-white/[0.12] hover:border-[#00c6a7]/30 dark:hover:border-white/25"
              >
                {/* Icon Badge */}
                <div className="w-12 h-12 rounded-xl bg-[#00c6a7]/10 dark:bg-white/15 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#00c6a7] dark:text-white" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
