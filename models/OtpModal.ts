import mongoose from "mongoose";
import { IOtpType } from "@/types/Mongoose/OtpModalType";
const { Schema, model, models } = mongoose;
const otpSchema = new Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: "5m" } } // Auto-delete after 5 min
});

export default models.Otp || model<IOtpType>("Otp", otpSchema);
