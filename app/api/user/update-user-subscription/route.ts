import User from "@/app/models/User";
import connectDB from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";
export async function PUT(request:NextRequest){
    try {
        await connectDB();
        const {userId} = await request.json();
        console.log(userId);
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { isPremiumUser: true } },
            { new: true } 
        );
        console.log(user);
        
    } catch (error) {
        console.log(error);
    }
    return NextResponse.json({message:"Request Received."});
}