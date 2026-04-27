import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Apple, Play, Linkedin, Instagram, Mail } from "lucide-react";

/**
 * Global Footer Component
 * 
 * Full footer with logo, download buttons, simplified link columns,
 * copyright, and social icons (X, GitHub, Instagram, Gmail).
 * Dark background always (#0d1117).
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "mailto:hello@tarra.ng" },
    { label: "FAQs", href: "/faqs" },
    { label: "Rules", href: "/rules" },
  ];

  return (
    <footer className="bg-[#0d1117] border-t border-white/5">
      <div className="container mx-auto px-6 py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div>
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

          {/* Links Column */}
          <div className="flex flex-col justify-center">
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Links
            </h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
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
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium">
            &copy; {currentYear} Tarra. All rights reserved.
          </p>

          {/* Social Icons: X, GitHub, Instagram, Gmail */}
          <div className="flex items-center gap-4">
            {/* X (formerly Twitter) */}
            <a href="https://x.com/usetarra" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white" aria-label="X (Twitter)">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/tarra-digital" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            {/* Instagram */}
            <a href="https://instagram.com/usetarra" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            {/* Gmail / Email */}
            <a href="mailto:hello@tarra.ng" className="text-gray-500 hover:text-white" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
