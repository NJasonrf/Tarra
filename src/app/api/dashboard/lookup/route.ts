import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Waitlist from "@/models/Waitlist";
import User from "@/models/User";

/**
 * POST /api/dashboard/lookup
 *
 * Body: { referralCode: string }
 *
 * Flow:
 * 1. Validate input
 * 2. Search waitlists collection (field: referral_code)
 * 3. If not found, search users collection (field: referralCode)
 * 4. Count verified referrals (users where referredBy = code)
 * 5. Fetch top 10 leaderboard from waitlists (non-ghost, sorted by referral_count desc)
 * 6. Return unified response
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { referralCode } = body;

    if (!referralCode || typeof referralCode !== "string") {
      return NextResponse.json(
        { found: false, error: "Referral code is required" },
        { status: 400 }
      );
    }

    const code = referralCode.trim().toUpperCase();

    await dbConnect();

    // --- 1. Search waitlists collection ---
    const waitlistUser = await Waitlist.findOne({ referral_code: code });

    // --- 2. Search users collection ---
    const appUser = await User.findOne({ referralCode: code });

    // --- 3. If neither found, bail ---
    if (!waitlistUser && !appUser) {
      return NextResponse.json(
        { found: false, error: "We couldn't find that code" },
        { status: 404 }
      );
    }

    // --- 4. Count verified referrals (users where referredBy = code) ---
    const verifiedReferralCount = await User.countDocuments({
      referredBy: code,
    });

    // --- 5. Determine name and referral stats ---
    let name: string;
    let waitlistReferralCount = 0;
    let isWaitlistUser = false;

    if (waitlistUser) {
      // Waitlist user — has both waitlist + verified referral counts
      name = waitlistUser.full_name;
      waitlistReferralCount = waitlistUser.referral_count || 0;
      isWaitlistUser = true;
    } else {
      // App-only user — only verified referral count
      name = `${appUser!.firstName || ""} ${appUser!.lastName || ""}`.trim();
      waitlistReferralCount = appUser!.waitlistReferralCount || 0;
      isWaitlistUser = false;
    }

    // --- 6. Leaderboard — top 10 from waitlists, non-ghost, sorted desc ---
    const leaderboardRaw = await Waitlist.find({ is_ghost: { $ne: true } })
      .sort({ referral_count: -1 })
      .limit(10)
      .lean();

    const leaderboard = leaderboardRaw.map((entry) => ({
      full_name: entry.full_name,
      referral_code: entry.referral_code,
      referral_count: entry.referral_count,
    }));

    return NextResponse.json({
      found: true,
      name,
      referralCode: code,
      waitlistReferralCount,
      verifiedReferralCount,
      isWaitlistUser,
      leaderboard,
    });
  } catch (error) {
    console.error("[Dashboard Lookup Error]", error);
    return NextResponse.json(
      { found: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
