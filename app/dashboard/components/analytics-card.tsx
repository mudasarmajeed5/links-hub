import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
interface AnalyticsCardProps {
  isPremiumUser: boolean;
}

const AnalyticsCard = ({ isPremiumUser }: AnalyticsCardProps) => {
  const data = [
    { name: 'Jan', views: 4000, subscribers: 2400, impressions: 1200 },
    { name: 'Feb', views: 3500, subscribers: 2100, impressions: 1100 },
    { name: 'Mar', views: 5000, subscribers: 3000, impressions: 1500 },
    { name: 'Apr', views: 6000, subscribers: 3500, impressions: 1800 },
  ];


  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-lg">Analytics</CardTitle>
        <CardDescription>View your site statistics</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />  
            <Line type="monotone" dataKey="views" stroke="#8884d8" />
            <Line type="monotone" dataKey="subscribers" stroke="#82ca9d" />
            <Line type="monotone" dataKey="impressions" stroke="#ff7300" />
          </LineChart>

        </ResponsiveContainer>
        <CardFooter>
          {!isPremiumUser && (
            <div className="absolute bottom-2 translate-x-[-50%] left-1/2 flex items-center justify-center bg-overlay">
              <Button variant="destructive">Subscribe to Enable Statistics</Button>
            </div>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
