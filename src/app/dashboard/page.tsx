"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";

/* ─────────────────────── Types ─────────────────────── */

interface LeaderboardEntry {
  full_name: string;
  referral_code: string;
  referral_count: number;
}

interface DashboardData {
  found: boolean;
  name: string;
  referralCode: string;
  waitlistReferralCount: number;
  verifiedReferralCount: number;
  isWaitlistUser: boolean;
  leaderboard: LeaderboardEntry[];
  error?: string;
}

/* ─────────────────────── Helpers ─────────────────────── */

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

/* ─────────────────────── Main Page ─────────────────────── */

export default function DashboardPage() {
  const [phase, setPhase] = useState<"gate" | "loading" | "dashboard">("gate");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);

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

  // Restore session on mount
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
    <div className="min-h-screen bg-[#0d1117] text-white relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Teal glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00c6a7]/[0.06] rounded-full blur-[180px] pointer-events-none" />

      {/* Header bar */}
      <header className="relative z-20 border-b border-white/5 bg-[#0d1117]/90 backdrop-blur-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-1 hover:opacity-90">
            <Image
              src="/assets/favicon_nobg.png"
              alt="Tarra Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <span className="text-xl font-black text-white tracking-tight">
              Tarra
            </span>
          </Link>

          {phase === "dashboard" && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          )}
        </div>
      </header>

      <div className="relative z-10">
        {/* ─── Gate Phase ─── */}
        {phase === "gate" && (
          <div className="flex items-center justify-center min-h-[calc(100vh-57px)] px-6">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00c6a7]/10 rounded-2xl mb-6">
                  <Trophy className="w-8 h-8 text-[#00c6a7]" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 font-display">
                  Referral Dashboard
                </h1>
                <p className="text-gray-400 text-sm font-medium max-w-xs mx-auto leading-relaxed">
                  Enter your referral code to view your stats, referrals, and
                  leaderboard position.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    id="referral-code-input"
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setError("");
                    }}
                    placeholder="e.g. A3K7P"
                    maxLength={10}
                    autoFocus
                    className="w-full px-5 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-center text-2xl font-black tracking-[0.3em] text-white placeholder:text-gray-600 placeholder:tracking-[0.2em] placeholder:font-medium placeholder:text-lg focus:outline-none focus:border-[#00c6a7]/50 focus:ring-2 focus:ring-[#00c6a7]/20 transition-all"
                  />
                </div>

                {error && (
                  <div className="text-center animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-red-400 text-sm font-semibold">
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!code.trim()}
                  className="w-full py-4 bg-[#00c6a7] hover:bg-[#00b39a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-[#00c6a7]/20 hover:shadow-xl hover:shadow-[#00c6a7]/30 active:scale-[0.98] transition-all"
                >
                  Access Dashboard
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 font-medium transition-colors"
                >
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
              <p className="text-sm text-gray-400 font-medium">
                Looking up your profile…
              </p>
            </div>
          </div>
        )}

        {/* ─── Dashboard Phase ─── */}
        {phase === "dashboard" && data && (
          <div className="container mx-auto px-6 py-10 md:py-16 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Welcome */}
            <div className="mb-10">
              <p className="text-xs font-bold text-[#00c6a7] uppercase tracking-[0.25em] mb-2">
                Welcome back
              </p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-display">
                {data.name}
              </h1>
              <p className="text-gray-400 text-sm mt-1 font-medium">
                {data.isWaitlistUser
                  ? "Waitlist Member"
                  : "Tarra App User"}
              </p>
            </div>

            {/* Referral Code Block */}
            <ReferralCodeBlock code={data.referralCode} />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatCard
                icon={<Users className="w-5 h-5 text-[#00c6a7]" />}
                value={
                  data.isWaitlistUser
                    ? data.waitlistReferralCount + data.verifiedReferralCount
                    : data.verifiedReferralCount
                }
                label="Total Referred"
                sublabel={
                  data.isWaitlistUser
                    ? `${data.waitlistReferralCount} waitlist · ${data.verifiedReferralCount} verified`
                    : undefined
                }
              />
              <StatCard
                icon={<CheckCircle2 className="w-5 h-5 text-[#00c6a7]" />}
                value={data.verifiedReferralCount}
                label="Verified Users"
                sublabel="Joined the app"
              />
            </div>

            {/* Referral Link */}
            <ReferralLinkBlock code={data.referralCode} />

            {/* Leaderboard */}
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <Crown className="w-5 h-5 text-[#00c6a7]" />
                <h2 className="text-lg font-black tracking-tight font-display">
                  Leaderboard
                </h2>
                <span className="text-xs text-gray-500 font-medium ml-1">
                  Top 10
                </span>
              </div>

              <DashboardLeaderboard
                entries={data.leaderboard}
                currentCode={data.referralCode}
              />
            </div>

            {/* Footer note */}
            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-[11px] text-gray-600 font-medium">
                Stats update in real-time. Keep sharing to climb the
                leaderboard.
              </p>
            </div>
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
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const ta = document.createElement("textarea");
        ta.value = code;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mb-8">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
        Your Referral Code
      </p>
      <button
        onClick={handleCopy}
        className="group relative w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-[#00c6a7]/30 hover:bg-[#00c6a7]/[0.04] transition-all"
      >
        <span className="text-3xl sm:text-4xl font-black tracking-[0.4em] text-white font-display">
          {code}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-[#00c6a7] transition-colors">
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#00c6a7]" />
              <span className="text-[#00c6a7] font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="font-medium">Copy</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  sublabel,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="p-5 sm:p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl transition-colors hover:border-white/10">
      <div className="flex items-center gap-2 mb-3">{icon}</div>
      <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">
        {value}
      </div>
      <div className="text-[10px] sm:text-[11px] uppercase font-bold text-gray-500 tracking-[0.15em] mt-1">
        {label}
      </div>
      {sublabel && (
        <div className="text-[10px] text-gray-600 font-medium mt-1.5">
          {sublabel}
        </div>
      )}
    </div>
  );
}

function ReferralLinkBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://tarra.ng/waitlist?ref=${code}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
        Your Referral Link
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow px-4 py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-gray-400 text-sm truncate font-mono">
          {url}
        </div>
        <button
          onClick={handleCopy}
          className={`px-6 py-3.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
            copied
              ? "bg-[#00c6a7] text-white"
              : "bg-[#00c6a7] text-white hover:bg-[#00b39a] active:scale-[0.97] shadow-lg shadow-[#00c6a7]/20"
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      {copied && (
        <p className="text-[10px] font-bold text-[#00c6a7] uppercase tracking-[0.15em] mt-2 animate-in fade-in slide-in-from-top-1 duration-300">
          ✨ Link copied to clipboard
        </p>
      )}
    </div>
  );
}

function DashboardLeaderboard({
  entries,
  currentCode,
}: {
  entries: LeaderboardEntry[];
  currentCode: string;
}) {
  if (!entries.length) {
    return (
      <div className="text-center py-16 text-gray-500 text-sm font-medium">
        The leaderboard is empty. Be the first to refer!
      </div>
    );
  }

  const currentRank = entries.findIndex(
    (e) => e.referral_code === currentCode
  );

  return (
    <div className="border border-white/[0.06] rounded-2xl overflow-hidden bg-white/[0.02]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/[0.06]">
            <th className="px-5 py-4 text-[10px] font-black text-[#00c6a7] uppercase tracking-[0.3em] w-16">
              Rank
            </th>
            <th className="px-5 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
              Name
            </th>
            <th className="px-5 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] text-right">
              Referrals
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {entries.map((entry, i) => {
            const isMe = entry.referral_code === currentCode;
            const firstName = entry.full_name.split(" ")[0];

            return (
              <tr
                key={entry.referral_code}
                className={`transition-all ${
                  isMe
                    ? "bg-[#00c6a7]/[0.06] border-l-2 border-l-[#00c6a7]"
                    : "hover:bg-white/[0.02]"
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <td className="px-5 py-3.5">
                  <span
                    className={`text-sm font-black ${
                      i < 3
                        ? "text-[#00c6a7]"
                        : "text-gray-500"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold ${
                        isMe ? "text-[#00c6a7]" : "text-white/90"
                      }`}
                    >
                      {firstName}
                    </span>
                    {isMe && (
                      <span className="text-[9px] font-black bg-[#00c6a7]/20 text-[#00c6a7] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        You
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="text-sm font-black text-[#00c6a7] tabular-nums">
                    {entry.referral_count}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {currentRank >= 0 && (
        <div className="px-5 py-4 border-t border-[#00c6a7]/20 bg-[#00c6a7]/[0.06] text-center">
          <p className="text-sm font-bold text-white">
            You are ranked{" "}
            <span className="text-[#00c6a7] font-black text-lg">
              #{currentRank + 1}
            </span>
          </p>
        </div>
      )}

      {currentRank < 0 && (
        <div className="px-5 py-4 border-t border-white/[0.04] text-center">
          <p className="text-xs text-gray-500 font-medium">
            You&apos;re not in the top 10 yet. Keep referring!
          </p>
        </div>
      )}
    </div>
  );
}
