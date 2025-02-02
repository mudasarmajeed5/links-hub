"use client"
import Link from 'next/link'
import { useEffect } from 'react';
import { useSession,signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, LayoutDashboard, LogOutIcon, Plus, Eye,Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
const DashboardNavigation = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const username = session?.user.username
  const path = usePathname();
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
      name:"Set Template",
      link:`/dashboard/${username}/theme`,
      icon:<Zap/>
    },
    {
      name: 'Settings',
      link: `/dashboard/${username}/settings`,
      icon: <Settings />
    },
    {
      name:"Website",
      link:"/",
      icon:<ArrowLeft/>
    },
    {
      name:"Visit Page",
      link:`/${username}`,
      icon:<Eye/>
    }

  ]

  return (
    <div className="flex sticky top-0 flex-col justify-between h-full p-4">
      <div>{Links.map((link, idx) => (
        <Link
          href={link.link}
          key={idx}

          className={`${path.endsWith(link.link.toLocaleLowerCase())? "bg-blue-200 text-blue-600":""} flex items-center gap-2 text-sm mb-2 w-4/5 mx-auto underline hover:underline-offset-4 transition-all hover:text-blue-600 hover:bg-blue-100 duration-200 ease-in-out p-2 rounded-md`}
        >
          <span className="text-lg">{link.icon}</span>
          <span className='whitespace-nowrap text-ellipsis overflow-hidden'>{link.name}</span>
        </Link>
      ))}</div>

      <Button
        onClick={()=>signOut()}
        variant={"outline"}
        className="flex w-4/5 mx-auto items-center gap-2 justify-start text-sm mb-2 underline hover:underline-offset-4 transition-all hover:text-blue-600 hover:bg-blue-100 duration-200 ease-in-out rounded-md"
      >
        <span className="text-lg"><LogOutIcon /></span>
        <span className='whitespace-nowrap text-ellipsis overflow-hidden'>Logout</span>
      </Button> 


    </div>
  )
}

export default DashboardNavigation