"use client";

import React from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Global Navbar Component
 * 
 * Logo "T" in teal square + "Tarra" bold text, dark/light mode toggle,
 * and a teal Dashboard CTA button.
 */
export const Navbar: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 transition-all">
      <nav className="transition-colors">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <div className="w-10 h-10 bg-[#00c6a7] rounded-lg flex items-center justify-center shadow-lg shadow-[#00c6a7]/20 group-hover:shadow-[#00c6a7]/40 transition-shadow">
              <span className="text-white font-black text-xl leading-none">T</span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Tarra</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                id="theme-toggle"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all"
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
              href="/waitlist"
              id="nav-dashboard-cta"
              className="px-5 py-2.5 bg-[#00c6a7] hover:bg-[#00c6a7]/90 text-white font-bold text-sm rounded-lg transition-all hover:shadow-lg hover:shadow-[#00c6a7]/20 active:scale-[0.97]"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
