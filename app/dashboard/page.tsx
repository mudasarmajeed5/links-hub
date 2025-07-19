"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { DashboardContent } from "./components/dashboard-content";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { useTitle } from "@/hooks/useTitle";
import { useUserStore } from "@/store/useUserStore";
const Dashboard = () => {
  const { user, loading, fetchUser } = useUserStore();
  const { data: session, status } = useSession();
  useTitle(`${session?.user.username} - Dashboard`);

  useEffect(() => {
    if (status == "authenticated") {
      fetchUser()
    }
  }, [status]);
  if (loading) {
    return <DashboardSkeleton />
  }
  return (
    <main className="min-h-[80vh]">
      <div>
        <DashboardContent user={user} />
      </div>
    </main >
  );
};

export default Dashboard;
