import React from "react";
import { UserCheck, FileText } from "lucide-react";

/**
 * SocialProof Component
 * 
 * "One Account. Everything." section with Students and Brands cards.
 * Matches the reference design with adaptive dark/light mode.
 */
const SocialProof: React.FC = () => {
  const accounts = [
    {
      title: "Students",
      description: "Sell textbooks, electronics, clothing. Offer tutoring, design, and more.",
      icon: <UserCheck className="w-6 h-6" />,
    },
    {
      title: "Brands",
      description: "Get a storefront with analytics. Still buy and receive services.",
      icon: <FileText className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#0d1117] transition-colors">
      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/5 to-transparent mb-16 md:mb-24" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-5">
            One Account. Everything.
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Sell products, offer services, or run a brand. All from one account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {accounts.map((account) => (
            <div
              key={account.title}
              className="group p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] hover:border-[#00c6a7]/30 dark:hover:border-[#00c6a7]/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-[#00c6a7] rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-[#00c6a7]/20 group-hover:shadow-[#00c6a7]/40 transition-shadow">
                {account.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                {account.title}
              </h3>

              {/* Description */}
              <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                {account.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
