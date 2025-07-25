import User from "@/models/User";
import connectDB from "@/services/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { EmailSubscriber } from "@/types/emailSubscriber";
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { email,subscriberMail } = await request.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ status: 404, message: 'Email not found' });
        }
        const subscriber = user.emailMarketing.emailList.find(
            (item: EmailSubscriber) => item.email === subscriberMail
        );
        
        if (!subscriber) {
            return NextResponse.json({ status: 404, message: 'Subscriber email not found' });
        }
        if (subscriber.status === 'unsubscribed') {
            return NextResponse.json({ status: 200, message: "You've already been unsubscribed" });
        }
        
        subscriber.status = 'unsubscribed';
        subscriber.subscriptionDate = new Date(); 
        await user.save();
        
        return NextResponse.json({status:200,message:"You've been unsubscribed"});

    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ status: 500, message: err.message })
    }
}