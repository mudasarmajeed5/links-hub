"use client";

import React, { useState, useEffect } from "react";
import useFetchUser from "@/app/hooks/get-user-info";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

interface UserData {
  name: string;
  username: string;
  email: string;
  Userlinks: {
    instagram: string;
    facebook: string;
    discord: string;
    linkedIn: string;
    medium: string;
    x: string;
    youtube: string;
    snapchat: string;
    pinterest: string;
    github: string;
    tiktok: string;
  };
}

const Dashboard = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const { error, data, loading } = useFetchUser(email ? { email } : { email: '' });

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-[80vh]">
      {error && <div className="text-white">{error}</div>}
      {userData && (
        <div className="text-white">
          <h1>{userData.name}</h1>
          <p>{userData.email}</p>
          <ul>
            {Object.entries(userData.Userlinks).map(([key, link]) => (
              <li key={key}>
                <strong>{key}:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              </li>
            ))}
          </ul>
        </div>

      )}
    </main>
  );
};

export default Dashboard;
