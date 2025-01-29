"use client";
import { usePathname } from 'next/navigation';
import useGetUserPage from '../hooks/get-userpage-info';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { User } from '../types/user-account';
import MinimalTheme from './components/templates/free/minimal-theme';
import VibrantTheme from './components/templates/free/vibrant';
import CyberPunkTheme from './components/templates/free/cyberpunk-theme';

const UserPage = () => {
  const path = usePathname();
  const username = path.split('/')[1];

  const [pageData, setPageData] = useState<User | null>(null);
  const { data, error, loading } = useGetUserPage({ username });

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  // If loading, show spinner
  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
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
        <p className="text-gray-500">User not found</p>
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
      {templateMapping[pageData.theme as 1 | 2 | 3] || <MinimalTheme user={pageData} />}
    </main>
  );
};

export default UserPage;
