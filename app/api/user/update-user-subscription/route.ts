import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";
export async function PUT(request:NextRequest){
    try {
        await connectDB();
        const {userId} = await request.json();
        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { isPremiumUser: true } },
            { new: true } 
        );
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({message:"Request Received."});
}