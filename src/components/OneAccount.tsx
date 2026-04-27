import React from "react";
import { UserCircle2, Building2 } from "lucide-react";

/**
 * One Account. Everything.
 * 
 * Two large side-by-side cards: Students & Brands.
 * Dark mode: #1a2235 cards, Light mode: white cards with border.
 */

const cards = [
  {
    icon: UserCircle2,
    title: "Students",
    description:
      "Sell textbooks, electronics, clothing. Offer tutoring, design, and more.",
  },
  {
    icon: Building2,
    title: "Brands",
    description:
      "Get a storefront with analytics. Still buy and receive services.",
  },
];

const OneAccount: React.FC = () => {
  return (
    <section
      id="one-account"
      className="w-full py-20 md:py-28 bg-[var(--background)] dark:bg-[#0d1117]"
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-center text-gray-900 dark:text-white mb-4 tracking-tight">
          One Account. Everything.
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-base sm:text-lg md:text-xl mb-14 md:mb-20 max-w-2xl mx-auto leading-relaxed">
          Sell products, offer services, or run a brand. All from one account.
        </p>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="p-8 md:p-10 rounded-2xl border bg-white dark:bg-[#1a2235] border-gray-200 dark:border-white/[0.08] hover:border-[#00c6a7]/30 dark:hover:border-[#00c6a7]/20"
              >
                {/* Icon Badge */}
                <div className="w-14 h-14 rounded-xl bg-[#00c6a7] flex items-center justify-center mb-8">
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OneAccount;
