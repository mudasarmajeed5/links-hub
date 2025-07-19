"use client"
import Link from 'next/link'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Plus, Settings, Zap, MailMinus } from 'lucide-react';
import { MdCampaign } from "react-icons/md";

const DashboardNavigation = () => {
  const router = useRouter();
  const { status } = useSession();
  const path = usePathname();
  const dashboard_buttons_style = "flex items-center gap-2 text-sm mb-2 w-4/5 mx-auto underline hover:underline-offset-4 transition-all hover:text-blue-600 hover:bg-blue-100 duration-200 ease-in-out p-2 rounded-md";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login')
    }
  }, [status, router])
  const Links = [
    {
      name: 'Dashboard',
      link: `/dashboard`,
      icon: <LayoutDashboard />
    },
    {
      name: 'Add Links',
      link: `/dashboard/add`,
      icon: <Plus />
    },
    {
      name: "Templates",
      link: `/dashboard/theme`,
      icon: <Zap />
    },
    {
      name: 'Settings',
      link: `/dashboard/settings`,
      icon: <Settings />
    },
    {
      name: "Manage Users",
      link: `/dashboard/emailmarketing`,
      icon: <MailMinus />
    },
    {
      name: "Campaigns",
      link: `/dashboard/campaigns`,
      icon: <MdCampaign />
    }
  ]

  return (
    <div className="flex sticky top-0 flex-col justify-between h-full p-4">
      <div>
        {Links.map((link, idx) => {
          const isVisitPage = link.name == "Visit Page";
          const isActive = isVisitPage ? path == link.link : path.toLowerCase() === link.link.toLowerCase();
          return (
            <Link
              href={link.link}
              key={idx}

              className={`${isActive ? "bg-blue-200 text-blue-600" : ""} ${dashboard_buttons_style}`}
            >
              <span className="text-2xl">{link.icon}</span>
              <span className='whitespace-nowrap text-ellipsis overflow-hidden'>{link.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardNavigation