import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import EmailCampaign from "@/models/EmailCampaign";
export async function POST(req: NextRequest) {
    try {
        const { smtp_email, smtp_app_password, smtp_host, smtp_port, userId } = await req.json();
        if(!userId){
            return NextResponse.json({ message: "User ID not found"}, { status: 404 });
        }
        let campaign = await EmailCampaign.findOne({userId});
        if(!campaign){
            campaign = await EmailCampaign.create({
                userId,
                smtp_config:{
                    smtp_email,
                    smtp_app_password,
                    smtp_host,
                    smtp_port
                },
                campaigns:{email_campaigns:[]}
            });
        }
        else{
            campaign.smtp_config = {
                smtp_email,
                smtp_app_password,
                smtp_host,
                smtp_port
            }
            await campaign.save()
        }
        await User.findByIdAndUpdate(userId, {
            "emailMarketing.emailCampaignsRef":campaign._id
        });
        return NextResponse.json({ message: "SMTP Config saved", campaign }, { status: 200 });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}