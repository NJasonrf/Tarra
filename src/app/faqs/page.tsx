import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Tarra",
  description:
    "Frequently Asked Questions about Tarra — accounts, selling, payments, escrow, moderation, and more for OAU students.",
};

const faqSections = [
  {
    category: "General",
    questions: [
      {
        q: "What is Tarra?",
        a: "Tarra is a centralized mobile marketplace application exclusively for Obafemi Awolowo University (OAU) students. It allows you to securely buy goods, sell products, and offer services within the campus community.",
      },
      {
        q: "Do I need two accounts if I want to sell different things?",
        a: "No. You only need one account for everything. Your single verified account allows you to buy goods, sell items, offer various services (like tutoring or photography), and even manage a dedicated Brand Store if you are on the Supreme tier.",
      },
      {
        q: "How do I verify my account?",
        a: "To unlock selling privileges, you must verify your account using your official @student.oauife.edu.ng email address.",
      },
    ],
  },
  {
    category: "Selling & Listings",
    questions: [
      {
        q: "What are the monthly upload credits?",
        a: "Upload credits dictate the number of new listings you can publish each month. If you have 5 credits, you can list 5 new items. These credits reset on the 1st of every month.",
      },
      {
        q: "What is the active items limit?",
        a: 'Your active capacity is the maximum number of listings you can have "live" on the platform at the exact same time. This is a permanent limit based on your tier and does not reset monthly. If you delete or sell an item, it frees up a spot in your active capacity.',
      },
      {
        q: "Can I edit my listing after publishing?",
        a: "Yes. You can edit the price, description, or photos at any time before the item is sold. Editing a listing does not consume additional upload credits. However, you cannot edit an item if an order is currently pending.",
      },
      {
        q: "What happens if I downgrade my subscription tier?",
        a: "If you downgrade (e.g., from Supreme to Standard), all of your current active listings will remain visible and active. However, you will not be able to list any new items until your active items fall below the limit of your new, lower tier.",
      },
    ],
  },
  {
    category: "Money & Payments",
    questions: [
      {
        q: "Is my money safe?",
        a: "Absolutely. Tarra uses a secure Escrow system managed by Paystack. When a buyer pays, the money is held by the platform. The seller only receives the funds after the buyer confirms they have received the item.",
      },
      {
        q: "How much is the service fee?",
        a: "Tarra takes a small commission on completed sales. The exact fee depends on the price of your item and is automatically calculated and shown to you transparently before you publish your listing, so you always know exactly what you will receive.",
      },
      {
        q: "Can I pay outside the app?",
        a: "No. Attempting to conduct transactions or pay outside the Tarra app is a severe violation of our policies and will result in a moderation strike. More importantly, paying off-platform completely voids our Escrow protection. If you pay outside the app, you are fully exposing yourself to scams, and Tarra cannot help you recover your money.",
      },
      {
        q: "Is withdrawal free and how long does it take?",
        a: "Yes, there are zero withdrawal fees. You can withdraw your available balance directly to your bank account (minimum ₦1,000), and it takes 1–3 business days to process.",
      },
    ],
  },
  {
    category: "Orders & Support",
    questions: [
      {
        q: "What happens if the seller doesn't deliver or ships a bad item?",
        a: "Because your money is in Escrow, the seller isn't paid yet. You have a 24-hour window upon delivery to inspect the item. If it is fake, broken, or never arrives, you can open a dispute. If the seller is found at fault, they will receive a moderation strike and you will be refunded.",
      },
      {
        q: "What happens if I forget to confirm I received the item?",
        a: "If the buyer takes no action for 24 hours after the seller marks the item as shipped, the system will automatically confirm delivery and release the funds to the seller. Silence implies acceptance.",
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-white dark:bg-[#0d1117] py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-400 mb-14">
            Everything you need to know about using Tarra on campus.
          </p>

          {faqSections.map((section) => (
            <div key={section.category} className="mb-12">
              <h2 className="text-lg font-bold text-[#00c6a7] mb-6 uppercase tracking-wider">
                {section.category}
              </h2>

              <div className="space-y-6">
                {section.questions.map((faq) => (
                  <div
                    key={faq.q}
                    className="p-5 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-gray-50/50 dark:bg-[#1a2235]"
                  >
                    <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
