import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Tarra",
  description:
    "Tarra's Terms of Service — rules, escrow system, fees, moderation, and account policies for OAU's campus marketplace.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-white dark:bg-[#0d1117] py-16 md:py-24">
        <article className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Effective Date: April 2026 · Platform: Tarra (Operated exclusively
            for Obafemi Awolowo University)
          </p>

          {/* 1 */}
          <Section title="1. Account Eligibility & Verification">
            <p>
              Anyone can create a basic account to browse and purchase items.
              However, to sell products, offer services, or open a Brand Store,
              you must verify your identity using a valid{" "}
              <strong>@student.oauife.edu.ng</strong> email address. You are
              strictly responsible for all activity under your account.
            </p>
          </Section>

          {/* 2 */}
          <Section title="2. Transactions & Off-Platform Payments (Zero Tolerance)">
            <p>
              Tarra provides a secure Escrow system to protect buyers and
              sellers.
            </p>
            <ul>
              <li>
                <strong>Prohibition:</strong> Attempting to conduct transactions,
                pay, or request payment outside of the Tarra application is
                strictly prohibited.
              </li>
              <li>
                <strong>Liability:</strong> Tarra assumes absolutely zero
                liability for scams, lost funds, or undelivered goods resulting
                from off-platform agreements. If you bypass our Escrow, you
                forfeit all buyer and seller protections.
              </li>
              <li>
                <strong>Penalty:</strong> Suggesting or engaging in off-platform
                payments is a direct violation of our policy and will result in
                an immediate moderation strike against your account.
              </li>
            </ul>
          </Section>

          {/* 3 */}
          <Section title="3. The Escrow System & Disputes">
            <p>
              All payments are held securely by our third-party payment processor
              (Paystack).
            </p>
            <ul>
              <li>
                Sellers do not receive funds until the buyer confirms receipt of
                the item.
              </li>
              <li>
                Buyers have a <strong>24-hour inspection window</strong> upon
                delivery. If the buyer takes no action within 24 hours, the
                system will automatically confirm delivery and release the funds
                to the seller.
              </li>
              <li>
                In the event of a dispute, Tarra&apos;s Admin team holds final
                authority to mediate, review evidence, and manually release funds
                to either party.
              </li>
            </ul>
          </Section>

          {/* 4 */}
          <Section title="4. Fees & Limits">
            <ul>
              <li>
                <strong>Pricing:</strong> All listed items must be priced between
                a minimum of ₦500 and a maximum of ₦2,000,000.
              </li>
              <li>
                <strong>Service Fees:</strong> Buyers pay no platform fees.
                Sellers are charged a service fee automatically deducted from the
                final sale amount.
              </li>
              <li>
                <strong>Withdrawals:</strong> Sellers can withdraw available
                balances to their linked bank accounts without any withdrawal
                fee, subject to a ₦1,000 minimum limit. Withdrawals take 1–3
                business days to process.
              </li>
            </ul>
          </Section>

          {/* 5 */}
          <Section title="5. Subscription Tiers & Capabilities">
            <ul>
              <li>
                <strong>Starter (Free):</strong> Limited to 5 new upload credits
                per month and a maximum of 20 active listings.
              </li>
              <li>
                <strong>Standard (₦1,000/month or ₦3,000/semester):</strong>{" "}
                Limited to 20 new upload credits per month and 50 active
                listings.
              </li>
              <li>
                <strong>Supreme (₦2,500/month or ₦7,000/semester):</strong>{" "}
                Unlimited upload credits, unlimited active listings, verified
                badges, and Brand Store creation.
              </li>
            </ul>
          </Section>

          {/* 6 */}
          <Section title="6. Strike-Based Moderation System">
            <p>
              Tarra enforces a strict 5-stage moderation system to maintain
              platform integrity.
            </p>
            <ul>
              <li>
                <strong>1 Strike:</strong> Initial warning.
              </li>
              <li>
                <strong>2 Strikes:</strong> Final warning; search ranking is
                actively penalized.
              </li>
              <li>
                <strong>3 Strikes:</strong> 30-day account suspension. All
                listings are hidden, and buying/selling is disabled.
              </li>
              <li>
                <strong>5th Strike:</strong> Permanent account ban. All listings
                are permanently deleted, and any available funds are immediately
                withdrawn.
              </li>
            </ul>
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
