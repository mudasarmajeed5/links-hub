import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username: string;
      isPremiumUser: boolean
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
  }
}
