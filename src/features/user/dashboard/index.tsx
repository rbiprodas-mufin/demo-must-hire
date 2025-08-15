"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  MapPin,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Building2,
  DollarSign,
  Activity,
  Users,
  BarChart3,
  PieChart,
  Plus,
} from "lucide-react";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MetricCard } from "~/components/ui/metric-card";
import { useSession } from "next-auth/react";
import Loader from "~/components/ui/loader";

const applications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    appliedDate: "2024-01-15",
    status: "interview",
    stage: "Technical Interview",
    progress: 75,
    logo: "/placeholder.svg?height=40&width=40&text=TC",
    nextStep: "Final round scheduled for Jan 25",
    recruiter: "Sarah Johnson",
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100k - $140k",
    appliedDate: "2024-01-12",
    status: "pending",
    stage: "Application Review",
    progress: 25,
    logo: "/placeholder.svg?height=40&width=40&text=SX",
    nextStep: "Waiting for initial screening",
    recruiter: "Mike Chen",
  },
  {
    id: 3,
    jobTitle: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    salary: "$80k - $100k",
    appliedDate: "2024-01-10",
    status: "accepted",
    stage: "Offer Accepted",
    progress: 100,
    logo: "/placeholder.svg?height=40&width=40&text=DS",
    nextStep: "Start date: Feb 1, 2024",
    recruiter: "Emma Wilson",
  },
  {
    id: 4,
    jobTitle: "Backend Engineer",
    company: "DataFlow",
    location: "Austin, TX",
    salary: "$110k - $150k",
    appliedDate: "2024-01-08",
    status: "rejected",
    stage: "Application Rejected",
    progress: 0,
    logo: "/placeholder.svg?height=40&width=40&text=DF",
    nextStep: "Application not selected",
    recruiter: "John Smith",
  },
  {
    id: 5,
    jobTitle: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    salary: "$130k - $170k",
    appliedDate: "2024-01-05",
    status: "interview",
    stage: "Phone Screening",
    progress: 50,
    logo: "/placeholder.svg?height=40&width=40&text=CT",
    nextStep: "Technical assessment pending",
    recruiter: "Lisa Brown",
  },
];

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

export default function DashboardPage() {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user as any;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "interview":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "interview":
        return <Eye className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
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
                          className="bg-blue-primary h-2 rounded-full"
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

        <Card className="bg-white shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Applications</CardTitle>
              <Button
                onClick={() => router.push("/")}
                className="bg-blue-primary hover:bg-blue-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Apply to New Job
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" className="cursor-pointer">
                  All ({applications.length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="cursor-pointer">
                  Pending (
                  {applications.filter((a) => a.status === "pending").length})
                </TabsTrigger>
                <TabsTrigger value="interview" className="cursor-pointer">
                  Interview (
                  {applications.filter((a) => a.status === "interview").length})
                </TabsTrigger>
                <TabsTrigger value="accepted" className="cursor-pointer">
                  Accepted (
                  {applications.filter((a) => a.status === "accepted").length})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="cursor-pointer">
                  Rejected (
                  {applications.filter((a) => a.status === "rejected").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <ApplicationsList
                  applications={applications}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <ApplicationsList
                  applications={applications.filter(
                    (a) => a.status === "pending"
                  )}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              </TabsContent>

              <TabsContent value="interview" className="mt-6">
                <ApplicationsList
                  applications={applications.filter(
                    (a) => a.status === "interview"
                  )}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              </TabsContent>

              <TabsContent value="accepted" className="mt-6">
                <ApplicationsList
                  applications={applications.filter(
                    (a) => a.status === "accepted"
                  )}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              </TabsContent>

              <TabsContent value="rejected" className="mt-6">
                <ApplicationsList
                  applications={applications.filter(
                    (a) => a.status === "rejected"
                  )}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ApplicationsList({
  applications,
  getStatusColor,
  getStatusIcon,
}: {
  applications: any[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No applications found in this category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card
          key={app.id}
          className="hover:shadow-md  shadow-lg transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={app.logo || "/placeholder.svg"} />
                  <AvatarFallback>{app.company.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {app.jobTitle}
                    </h3>
                    <Badge className={`${getStatusColor(app.status)} border`}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1 capitalize">{app.status}</span>
                    </Badge>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span className="text-sm">{app.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{app.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="text-sm">{app.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        Applied {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {app.stage}
                      </span>
                      <span className="text-sm text-gray-500">
                        {app.progress}%
                      </span>
                    </div>
                    <Progress value={app.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{app.nextStep}</p>
                    <p className="text-sm text-gray-500">
                      Recruiter: {app.recruiter}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
