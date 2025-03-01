// app/api/auth/signup/route.ts

import connectDB from "@/lib/mongodb";
import User from "@/app/models/User"; 
import bcrypt from "bcryptjs";

// Named export for the POST method
export async function POST(req: Request) {
  try {
    const { email, password, confirmPassword } = await req.json();

    if (!email || !password || !confirmPassword) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return new Response(
        JSON.stringify({ message: "Passwords do not match." }),
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists with this email." }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const extracted_username = email.split('@')[0];
    let count = 1;
    let username = extracted_username;
    while (await User.findOne({username})){
      count+=1;
      username = `${extracted_username}_${count}`;
    }
    // Create the new user
    const newUser = await User.create({
      username:username,
      email,
      name:email.split('@')[0],
      profilePic:'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg',
      password: hashedPassword,
      emailMarketing: { emailList: [] },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully", user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
}
