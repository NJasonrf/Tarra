import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Waitlist from "@/models/Waitlist";

export const dynamic = "force-dynamic";

/**
 * Admin CSV Export Action
 * 
 * Logic:
 * 1. Security: Strict validation of lighthouse_session cookie.
 * 2. Data Retrieval: Fetches all waitlist records (lean) for efficiency.
 * 3. Aggregation: Calculates referral counts efficiently.
 * 4. Formatting: Generates Excel-compatible CSV with BOM.
 * 
 * Operational Intent:
 * Enables the ops team to perform bulk analysis in Excel/Sheets without direct DB access.
 * CSV is preferred over JSON because it is natively supported by spreadsheet software
 * used by non-technical stakeholders.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const minReferrals = parseInt(searchParams.get('min_referrals') || '0');
  const filterReferrer = searchParams.get('referred_by');
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  const columnsParam = searchParams.get('columns');
  
  // If no columns specified, it's a "Full Audit" export
  const requestedColumns = columnsParam ? columnsParam.split(',') : [];
  const isFullExport = requestedColumns.length === 0;

  const cookieStore = await cookies();
  const session = cookieStore.get("lighthouse_session");

  // 1. Security Check
  if (!session || session.value !== "authorized") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await dbConnect();

  // 2. Build secure query object
  const query: any = {};
  
  if (filterReferrer) {
    query.referred_by = filterReferrer;
  }
  
  if (startDate || endDate) {
    query.created_at = {};
    if (startDate) query.created_at.$gte = new Date(startDate);
    // Adjust end date to include the full day
    if (endDate) {
      const date = new Date(endDate);
      date.setHours(23, 59, 59, 999);
      query.created_at.$lte = date;
    }
  }

  // 3. Optimized Data Retrieval
  const users = await Waitlist.aggregate([
    { $match: { ...query, is_ghost: { $ne: true } } },
    {
      $lookup: {
        from: "waitlists",
        localField: "referral_code",
        foreignField: "referred_by",
        as: "referral_details",
      },
    },
    {
      $addFields: {
        referral_count: { $size: "$referral_details" }
      }
    },
    // Only perform the deep join if we need the full audit data
    ...(isFullExport ? [
      {
        $lookup: {
          from: "waitlists",
          localField: "referred_by",
          foreignField: "referral_code",
          as: "referrer_data"
        }
      },
      {
        $addFields: {
          referrer_email: { $arrayElemAt: ["$referrer_data.email", 0] }
        }
      }
    ] : []),
    { $sort: { created_at: -1 } }
  ]);

  // 4. Dynamic CSV Formatting logic
  const csvHeaders: string[] = [];
  if (isFullExport) {
    csvHeaders.push("Full Name", "Email Address", "Phone Number", "Referral Count", "Own Referral Code", "Actually Referred By", "Referrer Email", "Joined At");
  } else {
    if (requestedColumns.includes("name")) csvHeaders.push("Full Name");
    if (requestedColumns.includes("email")) csvHeaders.push("Email Address");
    if (requestedColumns.includes("phone")) csvHeaders.push("Phone Number");
  }

  const csvRows: string[] = [];

  for (const user of users) {
    const count = user.referral_count || 0;
    
    // Server-side filtering for min referrals
    if (count < minReferrals) continue;

    const row: string[] = [];
    if (isFullExport) {
        row.push(
            user.full_name || "",
            user.email || "",
            user.phone_number || "",
            count.toString(),
            user.referral_code || "",
            user.referred_by || "DIRECT",
            user.referrer_email || "N/A",
            user.created_at ? new Date(user.created_at).toISOString() : ""
        );
    } else {
        if (requestedColumns.includes("name")) row.push(user.full_name || "");
        if (requestedColumns.includes("email")) row.push(user.email || "");
        if (requestedColumns.includes("phone")) row.push(user.phone_number || "");
    }

    // Escape and quote each field
    const escapedRow = row.map(field => {
      const escaped = String(field).replace(/"/g, '""');
      return `"${escaped}"`;
    });

    csvRows.push(escapedRow.join(","));
  }

  const csvContent = [
    "sep=,",
    csvHeaders.join(","),
    ...csvRows
  ].join("\n");
  
  const bom = "\uFEFF";
  const finalCsv = bom + csvContent;

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = isFullExport 
    ? `tarra_full_audit_${timestamp}.csv`
    : `tarra_custom_export_${timestamp}.csv`;

  return new NextResponse(finalCsv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
