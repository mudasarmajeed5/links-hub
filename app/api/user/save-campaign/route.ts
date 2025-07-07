import EmailCampaign from "@/app/models/EmailCampaign";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { campaign_title, campaign_status, campaign_body, userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ message: "User ID not found" }, { status: 404 });
        }
        let campaign = await EmailCampaign.findOne({ userId });
        if (!campaign) {

            return NextResponse.json({ message: "Campaign not found" }, { status: 404 });
        }
        campaign.campaigns.email_campaigns.push(
            {
                campaign_title,
                campaign_body,
                campaign_status
            }
        )
        await campaign.save();
        return NextResponse.json({ message: "Campaign Saved successfully", campaign }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            {
                error: (error as Error).message || "internal server error"
            }, {
            status: 500
        }
        )
    }
}
export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('user-id');
        if (!userId) {
            return NextResponse.json({ message: "UserID header missing" }, { status: 400 });
        }
        const userWithCampaign = await User.findById(userId).populate("emailMarketing.emailCampaignsRef");
        if (!userWithCampaign || !userWithCampaign.emailMarketing?.emailCampaignsRef){
            return NextResponse.json({ message: "No campaign found for this user" }, { status: 404 });
        }
        
        return NextResponse.json({ data: userWithCampaign.emailMarketing.emailCampaignsRef })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 })
    }
}