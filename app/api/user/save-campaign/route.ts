import { CampaignType } from "@/app/dashboard/[username]/campaigns/helpers/types/campaign-types";
import EmailCampaign from "@/app/models/EmailCampaign";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { campaign_title, campaign_status, campaign_body, userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ message: "User ID not found" }, { status: 404 });
        }

        const campaign = await EmailCampaign.findOne({ userId });
        if (!campaign) {
            return NextResponse.json({ message: "Campaign not found" }, { status: 404 });
        }

        const existingCampaign = campaign.campaigns.email_campaigns.find(
            (c: CampaignType) => c.campaign_title === campaign_title
        );
        
        if (existingCampaign) {
            existingCampaign.campaign_status = campaign_status;
            existingCampaign.campaign_body = campaign_body;
        } else {
            campaign.campaigns.email_campaigns.push({
                campaign_title,
                campaign_body,
                campaign_status
            });
        }

        await campaign.save();

        return NextResponse.json(
            { message: existingCampaign ? "Campaign updated successfully" : "Campaign saved successfully", campaign },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                error: (error as Error).message || "Internal server error"
            },
            {
                status: 500
            }
        );
    }
}
