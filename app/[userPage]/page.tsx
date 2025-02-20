"use client";
import { usePathname } from 'next/navigation';
import useGetUserPage from '../hooks/get-userpage-info';
import { useState, useEffect } from 'react';
import { User } from '../types/user-account';
import MinimalTheme from './components/templates/free/minimal-theme';
import VibrantTheme from './components/templates/free/vibrant';
import CyberPunkTheme from './components/templates/free/cyberpunk-theme';
import { useTitle } from '../hooks/get-user-title';
import LoadingSkeleton from "./components/LoadingSkeleton";
const UserPage = () => {
  const path = usePathname();
  const username = path.split('/')[1];
  const [pageData, setPageData] = useState<User | null>(null);
  const { data, error, loading } = useGetUserPage({ username });
  useTitle(data?.name)
  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);
  if (loading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }

  // If there's an error, show error message
  if (error) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // If no user data is found, display a user not found message
  if (!pageData) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Map theme ID to corresponding template
  const templateMapping = {
    1: <MinimalTheme user={pageData} />,
    2: <VibrantTheme user={pageData} />,
    3: <CyberPunkTheme user={pageData} />
  };
 
  return (
    <main className="min-h-screen relative flex justify-center items-center">
      {templateMapping[pageData.userTheme as 1 | 2 | 3] || <MinimalTheme user={pageData} />}
    </main>
  );
};

export default UserPage;
