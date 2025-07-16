"use server"
import EmailCampaign from "@/models/EmailCampaign"
import connectDB from "@/lib/mongodb"

export async function deleteCampaign(campTitle: string, sessionId: string | undefined) {
    if (!sessionId) {
        return;
    }
    try {
        await connectDB();
        const result = await EmailCampaign.updateOne(
            { userId: sessionId },
            {
                $pull: { "campaigns.email_campaigns": { campaign_title: campTitle } }
            }
        )
        if (result.modifiedCount > 0) {
            return { message: "Email Campaign Deleted", success: true };
        } else {
            return { message: "No campaign was deleted", success: false };
        }

    } catch (error) {
        return { message: (error as Error).message, success: false }
    }
}