"use server";
import { getSession } from "@/app/api/auth/getSessionUser";
import { User } from "@/models";
import connectDB from "@/services/database/mongodb";
export async function getSessionUser() {
    const session = await getSession();
    if (!session) {
        return null;
    }
    try {
        await connectDB();
        const user = await User.findOne({ _id: session.user?.id })
            .populate({
                path: "emailMarketing.emailCampaignsRef",
                strictPopulate: false,
            });
        if (!user) {
            return { message: "User Not logged In", status: 404 }
        }
        const plainDoc = JSON.parse(JSON.stringify(user))
        return plainDoc;
    } catch (error) {
        return (error as Error).message;
    }
}