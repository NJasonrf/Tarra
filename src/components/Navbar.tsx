"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Global Navbar Component
 * 
 * Actual Tarra TP monogram logo + "Tarra" text, dark/light mode toggle,
 * and a teal Dashboard CTA button.
 */
export const Navbar: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#00b599]/90 backdrop-blur-md border-b border-gray-200/60 dark:border-white/10">
      <nav>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 hover:opacity-90 group">
            <Image
              src="/assets/favicon_nobg.png"
              alt="Tarra Logo"
              width={44}
              height={44}
              className="w-11 h-11 object-contain"
            />
            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Tarra</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                id="theme-toggle"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/30 text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <Sun className="w-[18px] h-[18px]" />
                ) : (
                  <Moon className="w-[18px] h-[18px]" />
                )}
              </button>
            )}

            {/* Dashboard CTA */}
            <Link
              href="/dashboard"
              id="nav-dashboard-cta"
              className="px-5 py-2.5 bg-[#00c6a7] dark:bg-white hover:bg-[#00b39a] dark:hover:bg-white/90 text-white dark:text-[#009e88] font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-[#00c6a7]/20 active:scale-[0.97]"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
