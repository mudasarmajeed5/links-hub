"use client"
import Link from 'next/link'
import { useEffect } from 'react';
import { useSession,signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, LayoutDashboard, LogOutIcon, Plus, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
const DashboardNavigation = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const username = session?.user?.email?.split("@")[0];
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login')
    }
  }, [status,router])
  const Links = [
    {
      name: 'Dashboard',
      link: `/dashboard/${username}`,
      icon: <LayoutDashboard />
    },
    {
      name: 'Add Links',
      link: `/dashboard/${username}/add`,
      icon: <Plus />
    },
    {
      name:"Select Theme",
      link:`/dashboard/${username}/theme`,
      icon:<Zap/>
    },
    {
      name: 'Preview',
      link: `https://followtree.vercel.app/${username}`,
      icon: <Eye />
    },
    {
      name: 'Settings',
      link: `https://followtree.vercel.app/${username}`,
      icon: <Settings />
    },
    {
      name:"Website",
      link:"/",
      icon:<ArrowLeft/>
    }

  ]

  return (
    <div className="flex flex-col justify-between relative h-full p-4">
      <div>{Links.map((link, idx) => (
        <Link
          href={link.link}
          key={idx}
          className="flex items-center gap-2 text-sm mb-2 w-4/5 mx-auto underline hover:underline-offset-4 transition-all hover:text-blue-600 hover:bg-blue-100 duration-200 ease-in-out p-2 rounded-md"
        >
          <span className="text-lg">{link.icon}</span>
          <span>{link.name}</span>
        </Link>
      ))}</div>

      <Button
        onClick={()=>signOut()}
        variant={"outline"}
        className="flex w-4/5 mx-auto items-center gap-2 justify-start text-sm mb-2 underline hover:underline-offset-4 transition-all hover:text-blue-600 hover:bg-blue-100 duration-200 ease-in-out p-4 rounded-md"
      >
        <span className="text-lg"><LogOutIcon /></span>
        <span>Logout</span>
      </Button>



    </div>
  )
}

export default DashboardNavigation