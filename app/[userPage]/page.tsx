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
  if (loading || (!data && !error)) {
    return <LoadingSkeleton />;
  }
  if (!data || error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4 text-red-500">404 - User Not Found</h1>
        <p className="mb-8 text-gray-400">The user you are looking for does not exist.</p>
        <div className="flex space-x-4">
          <button 
            onClick={() => window.location.href = '/'} 
            className="px-4 py-2 bg-blue-700 text-white rounded transform -skew-x-12 hover:bg-blue-600 transition hover:shadow-md hover:shadow-blue-500/50"
          >
            Go to Home
          </button>
          <button 
            onClick={() => window.location.href = 'mailto:helpdesk@linkshub.space'} 
            className="px-4 py-2 bg-red-700 text-white rounded transform -skew-x-12 hover:bg-red-500 transition hover:shadow-md hover:shadow-red-500/50"
          >
            Get Help
          </button>
        </div>
      </div>
    );
  }
  if(!pageData) return null;
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
