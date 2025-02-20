import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
export async function POST(request:NextRequest){
    await connectDB();
    const email = request.headers.get('email');
    const received_data = await request.json();
    const array = received_data.filteredData
    
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { userLinks: array } },
            { new: true, upsert: true }
        );
        if(!updatedUser){
            return NextResponse.json({status:404,message:"User not found"})
        }
        return NextResponse.json({updatedUser,status:200,message:'Links Updated'});
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({error:err.message,status:500})
    }
}
export async function PUT(request:NextRequest){
    await connectDB();
    const email = request.headers.get('email');
    const themeNo = await request.json();
    try {
        const updatedUser = await User.findOneAndUpdate(
            {email},
            {userTheme:themeNo}
        )
        return NextResponse.json({updatedUser,status:200,message:"Theme updated"})
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({status:err.message});
    }
}