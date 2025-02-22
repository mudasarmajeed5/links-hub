import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import OtpModal from "@/app/models/OtpModal";
import connectDB from "@/lib/mongodb";
await connectDB();
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
    },
});

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);
        // Store OTP in database
        await OtpModal.findOneAndUpdate(
            { email },
            { otp: hashedOtp, expiresAt: Date.now() + 5 * 60 * 1000 },
            { upsert: true }
        );

        // Send OTP via email
        await transporter.sendMail({
            from: `"Linkshub Support" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: "🔐 Your OTP for Account Verification",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #333; text-align: center;">🔐 Linkshub OTP Verification</h2>
                    <p style="color: #555; text-align: center; font-size: 16px;">
                        Use the following OTP to verify your account. This code is valid for <strong>5 minutes</strong>.
                    </p>
                    <div style="text-align: center; padding: 15px; font-size: 24px; font-weight: bold; background-color: #007bff; color: #fff; border-radius: 8px;">
                        ${otp}
                    </div>
                    <p style="color: #555; text-align: center; font-size: 14px; margin-top: 10px;">
                        If you didn't request this, please ignore this email.
                    </p>
                    <hr style="border: 0.5px solid #ddd; margin-top: 20px;">
                    <p style="text-align: center; font-size: 12px; color: #888;">
                        © 2025 Linkshub. All rights reserved.
                    </p>
                </div>
            `,
        });
        return NextResponse.json({ message: "OTP sent successfully", status: 201 });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
    }
}

// Verify OTP
export async function PUT(request: NextRequest) {
    try {
        const { email, otp } = await request.json();
        if (!email || !otp) return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });

        const storedOtp = await OtpModal.findOne({ email });
        if (!storedOtp) return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });

        // Compare OTP
        const isMatch = await bcrypt.compare(otp, storedOtp.otp);

        if (!isMatch) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

        // Delete OTP after verification
        await OtpModal.deleteOne({ email });

        return NextResponse.json({ message: "OTP verified successfully", status: 201 });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
    }
}
