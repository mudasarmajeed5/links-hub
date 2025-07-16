import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
export async function GET(request: NextRequest) {
    await connectDB();
    try {
        const email = request.headers.get('email');
        if (!email) {
            return NextResponse.json({ status: 400, message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ status: 404, message: "User not found" });
        }
        return NextResponse.json({ fetchedUser: user, status: 200, message: "User found" });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ status: 500, message: err.message });
    }
}
