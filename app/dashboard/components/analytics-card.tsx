import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

interface AnalyticsCardProps {
  isPremiumUser: boolean;
  viewCount: number;
  viewHistory: { date: string; views: number }[];
}

const AnalyticsCard = ({ isPremiumUser, viewCount, viewHistory }: AnalyticsCardProps) => {
  const sortedData = viewHistory
    ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({
      ...item,
      date: item.date.substring(5)
    })) || [];

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-lg">7-Days Analytics</CardTitle>
        <CardDescription>Total Views: {
        isPremiumUser ? viewCount : "Locked"
        }</CardDescription>
      </CardHeader>
      
      <CardContent className="h-64 relative">
        {isPremiumUser ? (
          sortedData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ fontSize: "12px" }}
                  formatter={(value, name, props) => [`${name}: ${value} `, `Date: ${props.payload.date}`]} 
                />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No analytics data available.</p>
          )
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 text-white p-4 text-center rounded-lg">
            <p className="text-lg">Analytics are only available for premium users.</p>
            <Button variant="destructive" className="mt-3">Upgrade to Premium</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
