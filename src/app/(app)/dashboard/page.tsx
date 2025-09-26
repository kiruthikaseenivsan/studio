import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usageStats } from '@/lib/mock-data';
import { StatCard } from '@/components/dashboard/stat-card';
import UsageChart from '@/components/dashboard/usage-chart';
import MapChart from '@/components/dashboard/map-chart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {usageStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>
              An overview of ChatGPT queries over the last 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <UsageChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Usage by Country</CardTitle>
            <CardDescription>
              Heatmap of top countries by query volume.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MapChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
