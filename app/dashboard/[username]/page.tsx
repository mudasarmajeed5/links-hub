"use client";

import React, { useState, useEffect } from "react";
import useFetchUser from "@/app/hooks/get-user-info";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import type { User } from "@/app/types/user-account";
import { DashboardContent } from "../components/dashboard-content";
const Dashboard = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [userData, setUserData] = useState<User | undefined>();
  const { error, data, loading } = useFetchUser(email ? { email } : { email: '' });

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
    if (data) {
      setUserData(data);
    }
  }, [session,userData,data]);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-[80vh]">
      {error && <div>{error}</div>}
      <div>
        <DashboardContent user={userData} />
      </div>
    </main >
  );
};

export default Dashboard;
