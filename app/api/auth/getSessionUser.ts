import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // adjust this path if needed
import { getServerSession } from "next-auth";

export const getSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return session;
};
