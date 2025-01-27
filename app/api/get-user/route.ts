import connectDB from "@/app/Database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
export async function POST(request:NextRequest){
    await connectDB();
    try {
        const email = request.headers.get('email');
        const user = await User.findOne({email});
        return NextResponse.json({fetchedUser:user,status:200,message:"user found"})
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({status:500,message:err.message})
    }
}