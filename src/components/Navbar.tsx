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
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md border-b border-gray-200/60 dark:border-white/5">
      <nav>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 hover:opacity-90 group">
            <Image
              src="/assets/favicon_nobg.png"
              alt="Tarra Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
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
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white"
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
              className="px-5 py-2.5 bg-[#00c6a7] hover:bg-[#00b39a] text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-[#00c6a7]/20 active:scale-[0.97]"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
