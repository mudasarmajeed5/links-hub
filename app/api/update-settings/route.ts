import User from "@/app/models/User";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const email = req.headers.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email header is missing" }, { status: 400 });
  }

  try {
    await connectDB();
    const {
      username,
      name,
      profilePic,
      bio,
      spotifyUrl,
      theme,
      accentColor,
      cta,
      emailMarketing,
      seoRanking,
    } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (username !== user.username) {
      const isUsedUsername = await User.findOne({ username });
      if (isUsedUsername) {
        return NextResponse.json({ message: "Username not available" }, { status: 400 });
      }
    }
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        username,
        name,
        profilePic,
        bio,
        spotifyUrl,
        theme,
        accentColor,
        cta,
        emailMarketing,
        seoRanking,
      },
      { new: true }
    );

    return NextResponse.json({ message: "User updated", updatedUser }, { status: 200 });

  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
