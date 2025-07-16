import connectDB from "@/lib/mongodb";
import User from "@/app/models/User";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 60;
export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const fetchUser = await User.findOne({ username })
    if (!username) {
      return NextResponse.json({ status: 404, message: "Username not provided" });
    }
    if (!fetchUser) {
      return NextResponse.json({ status: 404, message: "User not found" })
    }
    return NextResponse.json({ fetchedUser: fetchUser, status: 200, message: 'User fetched' })
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ status: 500, message: err.message })
  }
}
export async function PUT(request: NextRequest) {
  await connectDB();

  try {
    const username = request.headers.get("username");
    if (!username) {
      return NextResponse.json({ status: 400, message: "Username is required" });
    }

    const today = moment().format("YYYY-MM-DD");

    // Try updating existing date entry
    const fetchedUser = await User.findOneAndUpdate(
      { username, "viewHistory.date": today },
      {
        $inc: { viewCount: 1, "viewHistory.$.views": 1 },
      },
      { new: true }
    );

    // If no existing record for today, push a new entry
    if (!fetchedUser) {
      await User.findOneAndUpdate(
        { username },
        {
          $inc: { viewCount: 1 },
          $push: { viewHistory: { date: today, views: 1 } },
        },
        { new: true }
      );
    }

    return NextResponse.json({
      message: "View count updated successfully",
      status: 200,
    });

  } catch (error) {
    return NextResponse.json({
      message: "Failed to update view count",
      status: 500,
      error: (error as Error).message,
    });
  }
}