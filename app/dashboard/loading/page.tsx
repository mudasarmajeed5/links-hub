"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
     if(status === "loading") return;
     if(!session){
        router.replace('/login');
        return;
     }
     const username = session.user?.email?.split('@')[0];
     router.replace(`/dashboard/${username}`);
    }, [session,router,status])

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Loader2 className='w-8 h-8 animate-spin'/>
        </div>
    )
}

export default Loader