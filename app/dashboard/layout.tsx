"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import Link from "next/link";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DashboardNavigation from "./components/dashboard-sidebar";
import { useSession } from "next-auth/react";
interface DashboardLayoutProps {
  children: React.ReactNode
}
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const name = session?.user?.name;
  useEffect(() => {
    setMounted(true);
  }, [])
  if (!mounted) return null;

  return (
    <div className={`${poppins.className} font-[Poppins] bg-gradient-to-br from-background to-muted`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="bg-gradient-to-r z-10 sticky top-0 border-b from-background to-muted supports-[backdrop]:bg-background/10 flex justify-between items-center p-4">
          <div className="font-medium">Welcome <span className="font-bold">{name}</span></div>
          <Link className="border px-2 py-1 border-black rounded-md hover:bg-black hover:text-white" target="_blank" href={"https://github.com/mudasarmajeed5"}>Follow me</Link>
        </div>
        <div className="min-h-[calc(100vh-80px)]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20}>
              <DashboardNavigation />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="w-10/12">{children}</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default DashboardLayout