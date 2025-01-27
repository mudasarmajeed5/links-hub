import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/app/Database/mongodb";
import User from "@/app/models/User";
const handler = NextAuth({
  providers:[
    GithubProvider({
      clientId:process.env.GITHUB_ID as string,
      clientSecret:process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks:{
    async signIn({user,account}){
      if (account?.provider == "github" || account?.provider =="google"){
        try {
          await connectDB();
          const currentUser = await User.findOne({email:user.email});
          if (!currentUser && user && user.email){
            const newUser = await User.create({
              email:user.email,
              name: user.name,
              username: user.email.split('@')[0],
            });
            if(!newUser){
              console.log('Failed to created user!');
            }
            return true;
          }
        } catch (error) {
          console.error("Error connecting to database: ",error)
          return false;
        }
      }
      return true;
    }
  }
})
export {handler as GET, handler as POST}