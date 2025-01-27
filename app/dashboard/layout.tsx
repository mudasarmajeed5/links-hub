"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DashboardNavigation from "./components/dashboard-sidebar";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/toggle-theme";
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
    <div className={`${poppins.className} font-[Poppins] bg-gradient-to-br from-background h-screen to-muted`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="bg-gradient-to-r border-b from-background to-muted supports-[backdrop]:bg-background/90 flex justify-between items-center p-4">
          <div className="font-medium">Welcome <span className="font-bold">{name}</span>, Customize your tree</div>
          <div><ModeToggle /></div>
        </div>
        <div className="h-[calc(100vh-80px)]">
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