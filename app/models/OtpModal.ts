import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const otpSchema = new Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: "5m" } } // Auto-delete after 5 min
});

export default models.Otp || model("Otp", otpSchema);
