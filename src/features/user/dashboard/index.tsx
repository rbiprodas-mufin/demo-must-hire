"use client";


import {
  Activity,
  BarChart3,
  FileText,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Loader } from "~/components/loader";
import { MetricCard } from "~/components/ui/metric-card";

// Mock metrics data
const metrics = {
  totalApplications: 15,
  activeApplications: 8,
  interviews: 3,
  offers: 1,
  responseRate: 67,
  averageResponseTime: 5.2,
  monthlyApplications: [
    { month: "Oct", count: 3 },
    { month: "Nov", count: 5 },
    { month: "Dec", count: 4 },
    { month: "Jan", count: 3 },
  ],
  statusDistribution: [
    { status: "Pending", count: 6, color: "#fbbf24" },
    { status: "Interview", count: 3, color: "#3b82f6" },
    { status: "Accepted", count: 1, color: "#10b981" },
    { status: "Rejected", count: 5, color: "#ef4444" },
  ],
};

const metricsData = [
  {
    title: "Total Applications",
    value: metrics.totalApplications,
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    change: "+12% from last month",
    changeType: "up",
  },
  {
    title: "Active Applications",
    value: metrics.activeApplications,
    icon: Activity,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
    change: "+8% from last month",
    changeType: "up",
  },
  {
    title: "Interviews",
    value: metrics.interviews,
    icon: Users,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    change: "+50% from last month",
    changeType: "up",
  },
  {
    title: "Response Rate",
    value: `${metrics.responseRate}%`,
    icon: TrendingUp,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    change: "-3% from last month",
    changeType: "down",
  },
] as const;

export default function DashboardScreen() {
  const { data } = useSession();
  const user = data?.user as any;

  if (!user) {
    return <Loader mode="icon" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-600">
            Track your job applications and monitor your progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric, idx) => (
            <MetricCard key={idx} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className=" bg-white shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Application Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.monthlyApplications.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {item.month}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(item.count / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-6">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className=" bg-white shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.statusDistribution.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-600">
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(item.count / 15) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-6">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
