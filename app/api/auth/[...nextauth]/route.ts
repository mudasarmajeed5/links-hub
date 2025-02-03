import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/lib/mongodb";
import bcrypt from 'bcryptjs';
import User from "@/app/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
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
            profilePic: user.profilePic,
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

            // Check if the username exists and keep incrementing until it's unique
            while (await User.findOne({ username })) {
              username = `${extractedUsername}_${count}`;
              count++;
            }

            // Create the new user with a unique username
            const newUser = await User.create({
              email: user.email,
              name: user.name,
              username: username,
              profilePic: user.image,
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
            session.user.name = user.name;
            session.user.username = user.username;
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      return session;
    },
  }
})
export { handler as GET, handler as POST }