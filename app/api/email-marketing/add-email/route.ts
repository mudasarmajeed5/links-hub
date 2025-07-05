import User from "@/app/models/User";
import connectDB from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";
import { EmailSubscriber } from "@/app/types/emailSubscriber";
export async function POST(request:NextRequest){
    try {
        await connectDB();
        const { email, id } = await request.json();
        const user = await User.findById(id);
        
        if (user) {
            const existingEmailEntry = user.emailMarketing.emailList.find((entry:EmailSubscriber) => entry.email === email);
            if (existingEmailEntry) {
                if(existingEmailEntry.status == "subscribed"){
                    existingEmailEntry.status = "unsubscribed";
                    await user.save();
                    return NextResponse.json({status:200,message:"Unsubscribed from Mailing list."})
                }
                else{
                    existingEmailEntry.status = "subscribed";
                    existingEmailEntry.subscriptionDate = Date.now();
                    await user.save();
                    return NextResponse.json({status:201,message:"You've been Subscribed"});
                }  
            } else {
                user.emailMarketing.emailList.push({ email, status:"subscribed" });
                await user.save();
                return NextResponse.json({ status: 202, message: "You've been subscribed" });
            }
        }
    } catch (error) {
        const err = error as Error;
        console.log('Error adding email ', err.message);
    }
    return NextResponse.json({status:200,message:"Request Completed."});
}