import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Apple, Play, Twitter, Instagram, Linkedin } from "lucide-react";

/**
 * Global Footer Component
 * 
 * Full footer with logo, download buttons, product/support/legal columns,
 * copyright, and social icons. Dark background always (#0d1117).
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Help Center", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0d1117] border-t border-white/5">
      <div className="container mx-auto px-6 py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 mb-4">
              <Image
                src="/assets/favicon_nobg.png"
                alt="Tarra Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span className="text-xl font-black text-white tracking-tight">Tarra</span>
            </Link>

            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              OAU&apos;s marketplace for campus commerce.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-xl hover:border-white/20"
              >
                <Apple className="w-4 h-4 text-white" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] text-gray-400 font-medium">Download on</span>
                  <span className="text-xs text-white font-bold">App Store</span>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-xl hover:border-white/20"
              >
                <Play className="w-4 h-4 text-white fill-white" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] text-gray-400 font-medium">Get it on</span>
                  <span className="text-xs text-white font-bold">Google Play</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium">
            &copy; {currentYear} Tarra. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://x.com/tarra_ng" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/usetarra" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/tarra-digital" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
