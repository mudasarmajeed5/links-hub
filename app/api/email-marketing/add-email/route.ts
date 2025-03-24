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
                // If the email exists but is unsubscribed, change it to subscribed
                if (!existingEmailEntry.subscribed) {
                    existingEmailEntry.status = 'subscribed';
                    await user.save();
                    return NextResponse.json({ status: 200, message: "You've been resubscribed" });
                } else {
                    return NextResponse.json({ status: 200, message: "You're already subscribed" });
                }
            } else {
                user.emailMarketing.emailList.push({ email, subscribed: true });
                await user.save();
                return NextResponse.json({ status: 201, message: "You've been subscribed" });
            }
        }
    } catch (error) {
        const err = error as Error;
        console.log('Error adding email ', err.message);
    }
    return NextResponse.json({status:200,message:"Request Completed."});
}