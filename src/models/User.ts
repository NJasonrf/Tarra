import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Minimal User model for the master `users` collection.
 * Only surfaces fields required by the referral dashboard.
 * Does NOT modify the production schema — read-only intent.
 */
export interface IUser extends Document {
  referralCode: string;
  referredBy: string | null;
  verifiedReferralCount: number;
  waitlistReferralCount: number;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    referralCode: { type: String, trim: true },
    referredBy: { type: String, default: null },
    verifiedReferralCount: { type: Number, default: 0 },
    waitlistReferralCount: { type: Number, default: 0 },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
  },
  {
    // Read from the existing `users` collection
    collection: "users",
    strict: false,
    versionKey: false,
  }
);

// Prevent model overwrite errors during HMR
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
