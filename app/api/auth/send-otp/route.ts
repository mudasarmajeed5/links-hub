import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import OtpModal from "@/app/models/OtpModal";
import connectDB from "@/lib/mongodb";
import emailTemplate from "@/lib/email-template/otp-theme";
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

        const emailContent = emailTemplate.replace("{{OTP}}", otp);
        await transporter.sendMail({
            from: `"LinksHub Support" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: "🔐 Your OTP for Account Verification",
            html: emailContent
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
