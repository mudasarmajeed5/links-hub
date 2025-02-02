import User from "@/app/models/User";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface ResponseType {
    username: string;
    name: string;
    profilePictureUrl: string;
}

export async function POST(req: NextRequest) {
    const email = req.headers.get('email');

    try {
        await connectDB();

        const { username, profilePictureUrl, name }: ResponseType = await req.json();
        const user = await User.findOne({ email });
        if (username !== user.username) {
            // Check if the new username is already taken
            const isUsedUsername = await User.findOne({ username });
            if (isUsedUsername) {
              return NextResponse.json(
                { message: "Username not available" },
                { status: 400 }
              );
            }
          }
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                username,
                name,
                profilePic: profilePictureUrl
            },
            { new: true },
        )
        if (!user) {
            return NextResponse.json({ message: "user not found", status: 404 })
        }
        return NextResponse.json({ message: "User updated",updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        const err = error as Error;
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
