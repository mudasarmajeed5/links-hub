import { Document } from "mongoose";

export interface IOtpType extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
}
