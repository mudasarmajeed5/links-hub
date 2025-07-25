"use server"
import User from "@/models/User"
import Subscription from "@/models/Subscription";
import connectDB from "@/services/database/mongodb";

export const getUser = async (username: string) => {
    try {
        await connectDB();
        
        const user = await User.findOne({ username });
        if (!user) {
            return null;
        }

        // Fetch subscription for the user
        const subscription = await Subscription.findOne({ userId: user._id });

        // Determine premium status
        const isPremiumUser =
            subscription?.isLifetime === true ||
            subscription?.status === "active";

        // Serialize and add isPremiumUser
        const serializedUserData = {
            ...JSON.parse(JSON.stringify(user)),
            isPremiumUser,
        };

        return serializedUserData;

    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
