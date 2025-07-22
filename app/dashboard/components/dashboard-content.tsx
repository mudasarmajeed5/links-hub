"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/types/user-account"
import AnalyticsCard from "./analytics-card"
import { convertToPaisa } from "@/lib/convert-currency/convert-to-paisa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./checkout-page";
import { useState } from "react";
import { plans } from "@/constants"
import { useSession } from "next-auth/react"
const stripe_public_Key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
type DashboardContentProps = {
  user: User | undefined
}
if (!stripe_public_Key) {
  throw new Error('Key is not available')
}
const stripePromise = loadStripe(stripe_public_Key);
export function DashboardContent({ user }: DashboardContentProps) {
  const [subscriptionPrice, setSubscriptionPrice] = useState<number>(10000);
  const { data: session } = useSession();
  const formatDate = (date?: string) => {
    if (!date) {
      return "Date not available";
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
      {user && <div className="md:p-4"><AnalyticsCard viewHistory={user.viewHistory} viewCount={user.viewCount} isPremiumUser={session?.user.isPremiumUser} />
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
                  <img
                    src={user?.profilePic}
                    alt=""
                    width={176}
                    height={176}
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
            <CardTitle className="text-lg flex justify-between"><div>
              Subscription Status
            </div>
              <Badge variant={user?.isPremiumUser ? "secondary" : "outline"} className="text-sm font-semibold py-1 px-2">
                {user?.isPremiumUser ? "Premium Member" : "Free User"}
              </Badge>
            </CardTitle>
          </CardHeader>
          {
            user?.isPremiumUser ? <>
              <div className="mt-1/5 text-center">
                User has subscribed
              </div>

            </> : <>
              <CardContent className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <button
                      className="border text-xs border-black dark:border-gray-300 px-3 py-2 rounded-md transition-all"
                      onClick={() => setSubscriptionPrice(10000)}
                    >
                      🔒 One-Time Payment, Lifetime Access: Rs. 10,000
                    </button>
                  </div>
                  <div className="mb-5">
                    {plans
                      .filter((plan) => plan.priceMonthly === 400 && plan.priceYearly === 4000)
                      .map((plan) => (
                        <div key={plan.id} className="space-y-3">
                          <h2 className="text-sm mt-3 font-semibold">{plan.title}</h2>
                          <ul className="list-disc pl-5 text-xs text-gray-700 dark:text-gray-300">
                            {plan.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                  {
                    subscriptionPrice > 10 && <Elements
                      options={{
                        mode: "payment",
                        amount: convertToPaisa(subscriptionPrice),
                        currency: "pkr",
                      }}
                      stripe={stripePromise}
                    >
                      <div>
                        <CheckoutPage
                          amount={subscriptionPrice}
                        />
                      </div>
                    </Elements>
                  }
                  <div className="flex flex-col gap-2">
                    <div className="mt-3">
                      Subscription based Payments ? View Plans
                    </div>
                    <div className="flex gap-2">
                      <Button>Yearly</Button>
                      <Button>Monthly</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          }

        </Card>
      </div>
    </>
  )
}

