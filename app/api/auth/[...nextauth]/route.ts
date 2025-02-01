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
          // Connect to the database
          await connectDB();
          // Find user by email
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
            const newUser = await User.create({
              email: user.email,
              name: user.name,
              username: user.email.split('@')[0],
              profilePic: user.image,
            });
            if (!newUser) {
              console.log('Failed to created user!');
            }
            return true;
          }
        } catch (error) {
          console.error("Error connecting to database: ", error)
          return false;
        }
      }
      return true;
    }
  }
})
export { handler as GET, handler as POST }