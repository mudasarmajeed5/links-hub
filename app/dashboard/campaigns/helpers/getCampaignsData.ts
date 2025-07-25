"use server"
import { User } from "@/models";
import connectDB from "@/services/database/mongodb";
export const getCampaigns = async (userId: string | null) => {
    try {
        await connectDB();
        if (!userId) {
            return { status: 400, message: "UserID Missing" };
        }
        const userWithCampaign = await User.findById(userId).populate("emailMarketing.emailCampaignsRef");
        if (!userWithCampaign || !userWithCampaign.emailMarketing?.emailCampaignsRef) {
            return { status: 404, message: "No Campaign Found for this user" };
        }
        const plainDoc = JSON.parse(JSON.stringify(userWithCampaign));
        return { status: 200, data: plainDoc };
    } catch (error) {
        return { error: (error as Error).message, status: 500 }
    }
}
