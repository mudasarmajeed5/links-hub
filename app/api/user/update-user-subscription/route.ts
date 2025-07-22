import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Subscription from "@/models/Subscription";
export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const { userId } = await request.json();
        await Subscription.findOneAndUpdate(
            { userId: userId },
            {
                $set: {
                    isLifetime: true,
                    status: "active"
                },
            },
            { new: true }
        );
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({ message: "Request Received." });
}