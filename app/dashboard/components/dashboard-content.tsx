"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/app/types/user-account"
import AnalyticsCard from "./analytics-card"
import { convertToPaisa } from "@/lib/convert-currency/convert-to-paisa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./checkout-page";
import { useState } from "react";
import { plans } from "@/app/constants"
const stripe_public_Key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
type DashboardContentProps = {
  user: User | undefined
}
if (!stripe_public_Key) {
  throw new Error('Key is not available')
}
const stripePromise = loadStripe(stripe_public_Key);
export function DashboardContent({ user }: DashboardContentProps) {
  const [subscriptionPrice, setSubscriptionPrice] = useState<number>(200);
  const [isAnnual, setIsAnnual] = useState(false);
  const selectedPlan = plans.find(plan => plan.priceMonthly === subscriptionPrice) || plans[1];

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
              Render something if the user has not subscribed
              </div>
            
            </> : <>
              <CardContent className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col">
                  {/* Plan Selection Buttons */}
                  <div className="flex gap-2">
                    {[0, 200, 400].map((price, idx) => (
                      <button
                        key={idx}
                        className={`border ${price === subscriptionPrice ? "border-black dark:border-gray-300" : ""
                          } px-3 py-2 rounded-md transition-all`}
                        onClick={() => setSubscriptionPrice(price)}
                      >
                        Plan {idx + 1}: Rs. {price}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant={"outline"}
                    className="mt-3 px-4 text-xs py-2 rounded-md transition-all"
                    onClick={() => setIsAnnual(!isAnnual)}
                  >
                    Switch to {isAnnual ? "Monthly" : "Annual"} Billing
                  </Button>

                  <div className="border rounded-md my-5 p-5 text-center w-full max-w-md shadow-md">
                    <h2 className="text-2xl font-semibold">{selectedPlan.title} Plan</h2>
                    <p className="text-sm text-gray-600">{selectedPlan.caption}</p>
                    <p className="text-lg font-bold">
                      Rs. {isAnnual ? selectedPlan.priceYearly : selectedPlan.priceMonthly} / {isAnnual ? "year" : "month"}
                    </p>
                  </div>
                  <div className="border p-5 rounded-md shadow-md mb-2 w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-3">Features</h3>
                    <ul className="list-disc list-inside text-gray-500">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          ✅ {feature}
                        </li>
                      ))}
                    </ul>
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
                      <div><CheckoutPage
                        amount={
                          isAnnual ? subscriptionPrice * 10 : subscriptionPrice
                        }
                      /></div>
                    </Elements>
                  }

                </div>
              </CardContent>
            </>
          }

        </Card>
      </div>
    </>
  )
}

