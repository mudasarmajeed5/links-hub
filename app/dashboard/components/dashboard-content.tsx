"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/app/types/user-account"
import AnalyticsCard from "./analytics-card"
import Image from "next/image"
type DashboardContentProps = {
  user: User | undefined
}
export function DashboardContent({ user }: DashboardContentProps) {
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

  return (
    <>
      {user && <div className="p-4"><AnalyticsCard viewHistory={user.viewHistory} viewCount={user.viewCount} isPremiumUser={user?.isPremiumUser} />
      </div>}
      <div className="grid grid-cols-1 m-4 md:grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex text-center text-md gap-1 flex-col">
                <div className="flex justify-center">
                  <Image
                    src={user?.profilePic || ''}
                    alt=""
                    width={176} // w-44 = 176px
                    height={176} // h-44 = 176px
                    className="rounded-full object-cover object-center w-44 h-44"
                  />
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
    </>
  )
}

