import User from "@/app/models/User";
import connectDB from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";
export async function POST(request:NextRequest){
    try {
        await connectDB();
        const {email,id} = await request.json();
        const user = await User.findById(id);
        if(user){
            user.emailMarketing.emailList.push({email})
            await user.save();
            return NextResponse.json({status:201,message:"You've been Subscribed"});
        }
    } catch (error) {
        const err = error as Error;
        console.log('Error adding email ',err.message);
    }
    return NextResponse.json({status:200,message:"Request Completed."});
}