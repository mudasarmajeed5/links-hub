import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/lib/mongodb";
import type { AuthOptions } from "next-auth";
import Subscription from "@/models/Subscription";
import bcrypt from 'bcryptjs';
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials) => {
                try {
                    await connectDB();

                    const { email, password } = credentials as {
                        email: string;
                        password: string;
                    };

                    if (!email || !password) {
                        throw new Error("Email and password are required!");
                    }
                    await connectDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("User not found");
                    }
                    const isPasswordValid = await bcrypt.compare(password, user.password);

                    if (!isPasswordValid) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        username: user.username,
                        profilePic: 'https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png',
                    };
                } catch (error) {
                    console.error("Error in authorize function:", error);
                    throw error;
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider == "github" || account?.provider == "google") {
                try {
                    await connectDB();

                    const currentUser = await User.findOne({ email: user.email });

                    if (!currentUser && user && user.email) {
                        const extractedUsername = user.email.split('@')[0];
                        let username = extractedUsername;
                        let count = 1;
                        while (await User.findOne({ username })) {
                            username = `${extractedUsername}_${count}`;
                            count++;
                        }
                        const newUser = await User.create({
                            email: user.email,
                            name: user.name,
                            username: username,
                            profilePic: user.image,
                            emailMarketing: { emailList: [] },
                        });

                        if (!newUser) {
                            console.log('Failed to create user!');
                        } else {
                            console.log('User created successfully!');
                        }

                        return true;
                    }

                } catch (error) {
                    console.error("Error connecting to database: ", error)
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (token?.email) {
                try {
                    await connectDB();
                    const user = await User.findOne({ email: token.email });
                    if (user && session.user) {
                        session.user.id = user._id.toString();
                        session.user.name = user.name;
                        session.user.username = user.username;
                        let subscriber = await Subscription.findOne({ userId: user._id });
                        if (!subscriber) {
                            subscriber = await Subscription.create({ userId: user._id });
                        }
                        const isPremium = !!subscriber && (
                            subscriber.isLifetime === true ||
                            subscriber.status === "active"
                        )
                        session.user.isPremiumUser = isPremium;
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
            return session;
        },
    }
}