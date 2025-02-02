"use client"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Laptop } from "lucide-react";
import type { User } from "@/app/types/user-account"
import AnalyticsCard from "./analytics-card"
type DashboardContentProps = {
  user: User | undefined
}
export function DashboardContent({ user }: DashboardContentProps) {
  const { setTheme } = useTheme();
  const formatDate = (date?: string) => {
    if (!date) {
      return "Date not available"; // Default fallback
    }
    return new Date(date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  
  const themes = [
    { name: "Light", icon: Sun, value: "light" },
    { name: "Dark", icon: Moon, value: "dark" },
    { name: "System", icon: Laptop, value: "system" },
  ]

  const handleThemeChange = (index: number) => {
    setTheme(themes[index].value)
  }

  return (
    <div className="grid grid-cols-1 m-4 md:grid-cols-2 gap-2">
      <AnalyticsCard isPremiumUser={false}/>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex text-center text-md gap-1 flex-col">
              <div className="flex justify-center">
                <img className="rounded-full object-cover object-center w-44 h-44" src={user?.profilePic} alt="" />
              </div>
              <span>Name: {user?.name}</span>
              <span className="text-md">Username: {user?.username}</span>
            </div>
          </div>
          <p className="flex text-sm text-muted-foreground flex-row gap-2">
            <span>Joined at: </span>
            <span>{formatDate(user?.createdAt)}</span>
          </p>
          <p className="flex text-sm flex-row gap-2 text-muted-foreground">
            <span>Updated at: </span>
            <span>{formatDate(user?.updatedAt)}</span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Theme</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            {themes.map((theme, index) => (
              <Button
                variant={"outline"}
                key={theme.name}
                onClick={() => handleThemeChange(index)}
                className="flex items-center gap-2"
              >
                <theme.icon className="h-4 w-4" />
                {theme.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subscription Status</CardTitle>
          <CardDescription>Your current membership level</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Badge variant={user?.isPremiumUser ? "default" : "secondary"} className="text-lg py-1 px-3">
            {user?.isPremiumUser ? "Premium Member" : "Free User"}
          </Badge>
          {!user?.isPremiumUser && <Button>Upgrade to Premium</Button>}
        </CardContent>
      </Card>

    </div>
  )
}

