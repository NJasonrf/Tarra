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
 * 5. Calculate rank based on verifiedReferralCount in users collection
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
    let currentUserInApp = appUser;

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

    // --- 6. Calculate Rank based on verifiedReferralCount ---
    // If the user isn't in the app users collection yet (only waitlist), 
    // their verifiedReferralCount is 0 for ranking purposes.
    const currentVerifiedCount = currentUserInApp ? currentUserInApp.verifiedReferralCount : verifiedReferralCount;
    
    let rank = 0;
    if (currentVerifiedCount > 0) {
      rank = await User.countDocuments({ 
        verifiedReferralCount: { $gt: currentVerifiedCount } 
      }) + 1;
    }

    const totalOnLeaderboard = await User.countDocuments({ 
      verifiedReferralCount: { $gt: 0 } 
    });

    return NextResponse.json({
      found: true,
      name,
      referralCode: code,
      waitlistReferralCount,
      verifiedReferralCount: currentVerifiedCount,
      isWaitlistUser,
      rank,
      totalOnLeaderboard,
    });
  } catch (error) {
    console.error("[Dashboard Lookup Error]", error);
    return NextResponse.json(
      { found: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
