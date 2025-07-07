import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface AnalyticsCardProps {
  isPremiumUser: boolean;
  viewCount: number;
  viewHistory: { date: string; views: number }[];
}

const AnalyticsCard = ({ isPremiumUser, viewHistory }: AnalyticsCardProps) => {
  const [range, setRange] = useState(7);
  const [sortedData, setSortedData] = useState(viewHistory)
  const [views, setViews] = useState(0);
  const handleAnalyticsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRange(parseInt(value));
  }
  useEffect(() => {
    const sliced = viewHistory
      .slice(0, range)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const sortedDataAll = sliced.map(item => ({
      ...item,
      date: item.date.substring(5),
    }));

    const totalViews = sliced.reduce((acc, item) => acc + item.views, 0);

    setSortedData(sortedDataAll);
    setViews(totalViews);
  }, [range, views]);


  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between">
          <div>Analytics</div>
          <select name="analytics-value" className="text-xs" onChange={handleAnalyticsChange}>
            <option value="3">3 Days</option>
            <option value="7">1 Week</option>
            <option value="15">2 Weeks</option>
          </select>
        </CardTitle>
        <CardDescription>Total Views: {
          isPremiumUser ? views : "Locked"
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
                <Line type="monotone" dataKey="views" className="text-xs" stroke="#8884d8" />
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
