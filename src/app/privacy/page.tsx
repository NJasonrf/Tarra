import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Tarra",
  description:
    "Tarra's Privacy Policy — how we collect, use, share, and retain your data on OAU's campus marketplace.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-white dark:bg-[#0d1117] py-16 md:py-24">
        <article className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Effective Date: April 2026 · Platform: Tarra
          </p>

          {/* 1 */}
          <Section title="1. Data We Collect">
            <ul>
              <li>
                <strong>Personal Identifiers:</strong> Name, phone number, and
                @student.oauife.edu.ng email address for verification.
              </li>
              <li>
                <strong>Financial Data:</strong> Wallet balances, transaction
                history, and linked bank account details for withdrawals.
              </li>
              <li>
                <strong>Location Data:</strong> Your campus location (e.g., Awo
                Hall, Angola Hall, Off-Campus) to facilitate local filtering and
                deliveries.
              </li>
              <li>
                <strong>Platform Activity:</strong> Items listed, search queries,
                ratings, strikes, and chat history for moderation purposes.
              </li>
            </ul>
          </Section>

          {/* 2 */}
          <Section title="2. How We Use Your Data">
            <ul>
              <li>
                To execute secure transactions through our Escrow system.
              </li>
              <li>
                To run Tarra&apos;s search algorithm, which ranks products based
                on text relevance, your seller tier, rating, and engagement.
              </li>
              <li>
                To enforce Community Guidelines by tracking reported listings,
                canceled orders, and disputes.
              </li>
            </ul>
          </Section>

          {/* 3 */}
          <Section title="3. Third-Party Sharing">
            <p>
              Tarra does not sell your data. Information is only shared when
              operationally necessary:
            </p>
            <ul>
              <li>
                <strong>Payment Processors:</strong> Transaction data is securely
                handled by Paystack to manage the Escrow system.
              </li>
              <li>
                <strong>Counterparties:</strong> When an order is placed, the
                seller receives the buyer&apos;s name and delivery address to
                fulfill the order.
              </li>
            </ul>
          </Section>

          {/* 4 */}
          <Section title="4. Data Retention">
            <p>
              Listings are subject to a 45-day ghost protocol timestamp. If an
              account is permanently banned, all listings are deleted
              immediately, but basic transaction logs and audit logs of
              administrative actions are retained for security and legal
              compliance.
            </p>
          </Section>
        </article>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
        {title}
      </h2>
      <div className="prose-content space-y-3 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-gray-900 dark:[&_strong]:text-white">
        {children}
      </div>
    </section>
  );
}
