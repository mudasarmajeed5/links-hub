import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request:NextRequest){
    await connectDB();
    try {
        const username = request.headers.get('username')
        const fetchUser = await User.findOne({username})
        if(!fetchUser){
            return NextResponse.json({status:404,message:"User not found"})
        }
        return NextResponse.json({fetchedUser:fetchUser,status:200,message:'User fetched'})
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({status:500,message:err.message})
    }
}