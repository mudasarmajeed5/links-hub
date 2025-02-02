"use client"
import { Skeleton } from "@/components/ui/skeleton" // Assuming you have this component in your ShadCN setup
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Laptop } from "lucide-react"

export function DashboardSkeleton() {
  const themes = [
    { name: "Light", icon: Sun, value: "light" },
    { name: "Dark", icon: Moon, value: "dark" },
    { name: "System", icon: Laptop, value: "system" },
  ]

  return (
    <div className="grid grid-cols-1 m-4 md:grid-cols-2 gap-2">
      <Card className="relative">
        <CardHeader>
          <CardTitle className="text-lg">
            <Skeleton className="w-36 h-6" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex text-center text-md gap-1 flex-col">
              <div className="flex justify-center">
                <Skeleton className="w-full h-40" />
              </div>
            </div>
          </div>
          <Skeleton className="w-40 h-4" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            <Skeleton className="w-36 h-6" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex text-center text-md gap-1 flex-col">
              <div className="flex justify-center">
                <Skeleton className="rounded-full w-40 h-40" />
              </div>
              <Skeleton className="w-36 h-6 mt-2" />
              <Skeleton className="w-32 h-5 mt-2" />
            </div>
          </div>
          <div className="flex text-sm text-muted-foreground flex-row gap-2">
            <span>Joined at: </span>
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="flex text-sm flex-row gap-2 text-muted-foreground">
            <span>Updated at: </span>
            <Skeleton className="w-40 h-4" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Theme</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            {themes.map((theme) => (
              <Button variant={"outline"} key={theme.name} className="flex items-center gap-2" disabled>
                <Skeleton className="h-4 w-4" />
                <Skeleton className="w-16 h-5" />
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
          <Skeleton className="w-28 h-8" />
          <Skeleton className="w-40 h-10 mt-2" />
        </CardContent>
      </Card>
    </div>
  )
}
