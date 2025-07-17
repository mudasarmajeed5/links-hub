"use server"
import { User } from "@/models";
import connectDB from "@/lib/mongodb";

export const getUser = async (username: string) => {
    try {
        await connectDB();
        const user = await User.findOne({ username });
        if (!user) {
            return null
        }
        const serializedUserData = JSON.parse(JSON.stringify(user))
        return serializedUserData;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};