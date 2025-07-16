"use server"
import { User } from "@/models";
import connectDB from "@/lib/mongodb";

export const getUser = async (username: string) => {
    try {
        await connectDB();
        const user = await User.findOne({ username });
        return user ?? null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};