import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Tarra | OAU Commerce Without the Chaos",
  description: "Buy, sell, and discover trusted student brands and services in OAU. Join the Tarra waitlist and climb the referral leaderboard.",
  keywords: ["Tarra", "OAU", "Obafemi Awolowo University", "Campus Commerce", "Student Marketplace", "Buy and Sell OAU", "Campus Services", "Student Brands", "OAU Waitlist", 'Samkiel'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://tarra.ng"),
  authors: [{ name: "SAMKIEL" }],
  creator: "SAMKIEL",
  publisher: "SAMKIEL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tarra | OAU Commerce Without the Chaos",
    description: "Buy, sell, and discover trusted student brands and services in OAU. Join the Tarra waitlist and climb the referral leaderboard.",
    url: "https://tarra.ng",
    siteName: "Tarra",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tarra.ng/assets/favicon_nobg.png",
        width: 512,
        height: 512,
        alt: "Tarra - OAU Commerce Without the Chaos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarra | OAU Commerce Without the Chaos",
    description: "Buy, sell, and discover trusted student brands and services in OAU. Join the Tarra waitlist and climb the referral leaderboard.",
    images: ["https://tarra.ng/assets/favicon_nobg.png"],
    creator: "@tarra_ng",
  },
  icons: {
    icon: "/assets/favicon_nobg.png",
    apple: "/assets/favicon_nobg.png",
  },
};

import { Providers } from "@/components/Providers";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link 
          rel="preload" 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" 
          as="style" 
        />
        <link 
          rel="stylesheet" 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" 
        />
        <link rel="preload" href="/assets/favicon_nobg.png" as="image" />
      </head>
      <body className="antialiased selection:bg-primary/30 transition-colors duration-200 font-sans overflow-x-hidden">
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://tarra.ng/#organization",
                  "name": "Tarra",
                  "url": "https://tarra.ng",
                  "logo": "https://tarra.ng/assets/favicon_nobg.png",
                  "description": "Campus commerce platform for OAU students"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://tarra.ng/#website",
                  "url": "https://tarra.ng",
                  "name": "Tarra",
                  "publisher": {
                    "@id": "https://tarra.ng/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://tarra.ng/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            }),
          }}
        />
        {/* Global grid background */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)] pointer-events-none z-0" />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Providers>
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
