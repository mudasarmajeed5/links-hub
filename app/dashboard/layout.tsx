// /dashboard/layout.tsx
"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DashboardNavigation from "./components/dashboard-sidebar";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/toggle-theme";
import { FaGithub, FaPowerOff } from "react-icons/fa";
import SessionWrapper from "@/components/SessionWrapper";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
interface DashboardLayoutProps {
  children: React.ReactNode
}

// 🧠 Move all useSession-related logic into an inner component
const InnerDashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const name = session?.user?.name;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") return null;
  return (
    <div className="font-poppins text-black dark:text-white bg-gradient-to-br from-background to-muted">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="bg-gradient-to-r z-50 sticky top-0 border-b from-background to-muted supports-[backdrop]:bg-background/10 flex justify-between items-center p-4">
          <div className="font-medium">Welcome <span className="font-bold">{name}</span></div>
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center gap-1">
              {/* GitHub */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="https://github.com/mudasarmajeed5/links-hub/" target="_blank">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <FaGithub className="text-xl" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Contribute</TooltipContent>
              </Tooltip>

              {/* Theme Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>Switch Theme</TooltipContent>
              </Tooltip>

              {/* Logout */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => signOut()}
                    className="rounded-full"
                  >
                    <FaPowerOff className="text-lg" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>

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
  );
};

// ✅ Outer wrapper applies SessionProvider *before* anything calls useSession
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SessionWrapper>
      <InnerDashboardLayout>{children}</InnerDashboardLayout>
    </SessionWrapper>
  );
};

export default DashboardLayout;
