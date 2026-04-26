"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Copy,
  Check,
  Users,
  CheckCircle2,
  Trophy,
  ArrowLeft,
  Loader2,
  LogOut,
  Crown,
  Share2,
  Apple,
  Play,
  Sun,
  Moon,
  TrendingUp,
  Smartphone,
} from "lucide-react";

/* ─────────────────────── Types ─────────────────────── */

interface DashboardData {
  found: boolean;
  name: string;
  referralCode: string;
  waitlistReferralCount: number;
  verifiedReferralCount: number;
  isWaitlistUser: boolean;
  rank: number;
  totalOnLeaderboard: number;
  error?: string;
}

/* ─────────────────────── Session Helpers ─────────────────────── */

const SESSION_KEY = "tarra_dashboard_code";

function getSessionCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function setSessionCode(code: string) {
  try {
    sessionStorage.setItem(SESSION_KEY, code);
  } catch {}
}

function clearSessionCode() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

/* ─────────────────────── Clipboard Helper ─────────────────────── */

async function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function DashboardPage() {
  const [phase, setPhase] = useState<"gate" | "loading" | "dashboard">("gate");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const lookup = useCallback(async (referralCode: string) => {
    setPhase("loading");
    setError("");
    try {
      const res = await fetch("/api/dashboard/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralCode }),
      });
      const json = await res.json();
      if (!json.found) {
        setError(json.error || "We couldn't find that code");
        setPhase("gate");
        return;
      }
      setData(json);
      setSessionCode(referralCode.trim().toUpperCase());
      setPhase("dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setPhase("gate");
    }
  }, []);

  useEffect(() => {
    const saved = getSessionCode();
    if (saved) {
      setCode(saved);
      lookup(saved);
    }
  }, [lookup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    lookup(code.trim());
  };

  const handleLogout = () => {
    clearSessionCode();
    setData(null);
    setCode("");
    setError("");
    setPhase("gate");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white relative overflow-hidden transition-colors">
      {/* Teal glow — top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#00c6a7]/5 dark:bg-[#00c6a7]/[0.07] rounded-full blur-[180px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md border-b border-gray-200/60 dark:border-white/5">
        <nav>
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-1 hover:opacity-90 group">
              <Image src="/assets/favicon_nobg.png" alt="Tarra Logo" width={36} height={36} className="w-9 h-9 object-contain" />
              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Tarra</span>
            </Link>
            <div className="flex items-center gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </button>
              )}
              {phase === "dashboard" && (
                <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Exit</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className="relative z-10">
        {/* ─── Gate Phase ─── */}
        {phase === "gate" && (
          <div className="flex items-center justify-center min-h-[calc(100vh-57px)] px-6">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00c6a7]/10 dark:bg-[#00c6a7]/15 rounded-2xl mb-6">
                  <Trophy className="w-8 h-8 text-[#00c6a7]" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium text-gray-900 dark:text-white tracking-tight mb-4">
                  User Dashboard
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium max-w-xs mx-auto leading-relaxed">
                  Enter your referral code to view your stats and leaderboard position.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  id="referral-code-input"
                  type="text"
                  value={code}
                  onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
                  placeholder="e.g. SAM4F2"
                  maxLength={10}
                  autoFocus
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-2xl text-center text-2xl font-black tracking-[0.3em] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 placeholder:tracking-[0.15em] placeholder:font-medium placeholder:text-lg focus:outline-none focus:border-[#00c6a7]/50 focus:ring-2 focus:ring-[#00c6a7]/20 transition-all"
                />

                {error && (
                  <div className="text-center animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-red-500 dark:text-red-400 text-sm font-semibold">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!code.trim()}
                  className="w-full py-4 bg-[#00c6a7] hover:bg-[#00b39a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#00c6a7]/20 hover:shadow-xl hover:shadow-[#00c6a7]/30 active:scale-[0.98] transition-all"
                >
                  Access Dashboard
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 font-medium transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ─── Loading Phase ─── */}
        {phase === "loading" && (
          <div className="flex items-center justify-center min-h-[calc(100vh-57px)]">
            <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
              <Loader2 className="w-8 h-8 text-[#00c6a7] animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Looking up your profile…</p>
            </div>
          </div>
        )}

        {/* ─── Dashboard Phase ─── */}
        {phase === "dashboard" && data && (
          <div className="container mx-auto px-6 py-10 md:py-16 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Welcome Header */}
            <div className="mb-10">
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium mb-2">
                Welcome back,
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-gray-900 dark:text-white tracking-tight mb-2">
                {data.name}
              </h1>
              <p className="text-sm font-medium text-[#00c6a7]">Tarra Member</p>
            </div>

            {/* Referral Code Block */}
            <ReferralCodeBlock code={data.referralCode} />

            {/* Rank Display */}
            <div className="mb-8">
              <RankCard rank={data.rank} totalOnLeaderboard={data.totalOnLeaderboard} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-8">
              <StatCard
                icon={<Users className="w-5 h-5 text-[#00c6a7]" />}
                value={data.waitlistReferralCount + data.verifiedReferralCount}
                label="People Invited"
              />
              <StatCard
                icon={<CheckCircle2 className="w-5 h-5 text-[#00c6a7]" />}
                value={data.verifiedReferralCount}
                label="Joined Tarra"
              />
            </div>

            {/* How to Refer Instructions */}
            <HowToReferBlock code={data.referralCode} />

            {/* Download CTA */}
            <DownloadCTA />

            {/* Spacer for global footer */}
            <div className="h-10" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────── Sub-Components ─────────────────────── */

function ReferralCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mb-8">
      <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">
        Your Referral Code
      </p>
      <button
        onClick={handleCopy}
        className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 sm:px-12 py-5 bg-gray-50 dark:bg-[#1a2235] border border-gray-200 dark:border-white/[0.08] rounded-2xl hover:border-[#00c6a7]/30 dark:hover:border-[#00c6a7]/20 transition-all"
      >
        <span className="text-3xl sm:text-4xl font-black tracking-[0.35em] text-gray-900 dark:text-white font-display">
          {code}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-[#00c6a7] transition-colors">
          {copied ? (
            <><Check className="w-4 h-4 text-[#00c6a7]" /><span className="text-[#00c6a7] font-bold">Copied</span></>
          ) : (
            <><Copy className="w-4 h-4" /><span className="font-medium">Copy</span></>
          )}
        </span>
      </button>
    </div>
  );
}

function RankCard({ rank, totalOnLeaderboard }: { rank: number; totalOnLeaderboard: number }) {
  const isRanked = rank > 0;

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
      isRanked 
        ? "bg-[#00c6a7]/5 border-[#00c6a7]/20 dark:bg-[#00c6a7]/10 dark:border-[#00c6a7]/30" 
        : "bg-gray-50 dark:bg-[#1a2235] border-gray-200 dark:border-white/[0.08]"
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isRanked ? "bg-[#00c6a7] text-white" : "bg-gray-200 dark:bg-white/10 text-gray-400"
        }`}>
          {isRanked ? <Trophy className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
        </div>
        <div className="flex-grow">
          {isRanked ? (
            <>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                You&apos;re ranked <span className="text-[#00c6a7]">#{rank}</span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Based on verified app signups
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                Not ranked yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Invite people to join the app to earn your spot
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="p-6 sm:p-7 rounded-2xl border bg-white dark:bg-[#1a2235] border-gray-200 dark:border-white/[0.08] hover:border-[#00c6a7]/30 dark:hover:border-[#00c6a7]/20 transition-all">
      <div className="w-10 h-10 rounded-xl bg-[#00c6a7]/10 dark:bg-[#00c6a7]/15 flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tabular-nums">{value}</div>
      <div className="text-[11px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-[0.15em] mt-1.5">{label}</div>
    </div>
  );
}

function HowToReferBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const shareText = `Join me on Tarra — OAU's campus marketplace! Use my code ${code} when you sign up on the app.`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Join Tarra", text: shareText });
      } catch {}
    } else {
      try {
        await copyToClipboard(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-gray-50/50 dark:bg-[#1a2235]/50">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#00c6a7]/10 dark:bg-[#00c6a7]/15 flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-5 h-5 text-[#00c6a7]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">How to Refer</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Ask your friends to enter your referral code <span className="text-[#00c6a7] font-black">{code}</span> when they sign up on the Tarra mobile app.
          </p>
        </div>
      </div>
      
      <button
        onClick={handleShare}
        className="w-full py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
      >
        <Share2 className="w-4 h-4" />
        {copied ? "Copied Share Text!" : "Share Referral Code"}
      </button>
    </div>
  );
}

function DownloadCTA() {
  return (
    <div className="mt-14 p-8 sm:p-10 rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-gray-50/50 dark:bg-[#1a2235]/50 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#00c6a7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white tracking-tight mb-3">
          Ready to trade?
        </h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium mb-8 max-w-md mx-auto">
          Download Tarra and start buying, selling, or offering services on campus.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="#"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3.5 px-7 rounded-2xl hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all"
          >
            <Apple className="w-5 h-5" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] font-medium opacity-80 uppercase tracking-wider">Download on the</span>
              <span className="text-sm font-bold -mt-0.5">App Store</span>
            </div>
          </Link>
          <Link
            href="#"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3.5 px-7 rounded-2xl hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[9px] font-medium opacity-80 uppercase tracking-wider">Get it on</span>
              <span className="text-sm font-bold -mt-0.5">Google Play</span>
            </div>
          </Link>
        </div>
        <p className="mt-6 text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.25em] text-[10px]">
          OAU Commerce. Without the Chaos.
        </p>
      </div>
    </div>
  );
}
