// /dashboard/layout.tsx
"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { useState, useEffect, useRef } from "react"
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { RiMenu2Line,RiCloseFill } from "react-icons/ri";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);


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
          <div className="hidden md:block font-medium">Welcome <span className="font-bold">{name}</span></div>
          <div
            className="block md:hidden pl-2 text-2xl cursor-pointer"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            {!sidebarOpen ? <RiMenu2Line />: <RiCloseFill />}
          </div>
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
                    onClick={() => signOut({callbackUrl: "/login"})}
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
        <div className="min-h-[calc(100vh-80px)] relative">
          <div
            className={`fixed top-[80px] left-0 h-[calc(100vh-80px)] w-60 z-50 transition-transform bg-background border-r
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
            <DashboardNavigation onLinkClick={() => setSidebarOpen(false)} />
          </div>

          <div className="hidden md:flex w-full h-full">
            <ResizablePanelGroup direction="horizontal" className="w-full">
              <ResizablePanel defaultSize={20}>
                <DashboardNavigation />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className="w-10/12">{children}</ResizablePanel>
            </ResizablePanelGroup>
          </div>
          <div className="block md:hidden px-4 pt-4">{children}</div>
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
