"use client";
import { notFound, usePathname } from 'next/navigation';
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
  useTitle(data?.name);
  const updateViews = async(username:string) => {
    if(!data?.isPremiumUser) return;
    await fetch('/api/get-user-page',
      {
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'username':username,
        }
      }
    ).then((res)=>res.json()).catch((error)=>console.log(error))
  }
  useEffect(() => {
    if (data) {
      setPageData(data);
      if(data.isPremiumUser){
        updateViews(username);
      }
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
    notFound();
  }

  // If no user data is found, display a user not found message
  if (!pageData) {
    notFound();
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
