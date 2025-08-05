"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Target,
  Award,
} from "lucide-react";

const dashboardData = {
  metrics: {
    totalApplicants: 1247,
    activeJobs: 23,
    totalApplications: 3456,
    interviewsScheduled: 45,
    offersExtended: 12,
    hiredThisMonth: 8,
  },
  trends: {
    applicantsGrowth: 12.5,
    applicationsGrowth: 8.3,
    interviewsGrowth: -5.2,
    hiringGrowth: 15.7,
  },
  recentApplications: [
    {
      id: 1,
      applicantName: "John Smith",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-20",
      status: "interview",
      experience: "5 years",
    },
    {
      id: 2,
      applicantName: "Sarah Johnson",
      position: "Product Manager",
      appliedDate: "2024-01-19",
      status: "review",
      experience: "7 years",
    },
    {
      id: 3,
      applicantName: "Mike Chen",
      position: "UX Designer",
      appliedDate: "2024-01-18",
      status: "offer",
      experience: "4 years",
    },
    {
      id: 4,
      applicantName: "Emily Davis",
      position: "Backend Engineer",
      appliedDate: "2024-01-17",
      status: "hired",
      experience: "6 years",
    },
  ],
  topJobs: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applications: 156,
      interviews: 12,
      offers: 3,
      department: "Engineering",
    },
    {
      id: 2,
      title: "Product Manager",
      applications: 89,
      interviews: 8,
      offers: 2,
      department: "Product",
    },
    {
      id: 3,
      title: "UX Designer",
      applications: 134,
      interviews: 15,
      offers: 4,
      department: "Design",
    },
  ],
  hiringFunnel: [
    { stage: "Applications", count: 3456, percentage: 100 },
    { stage: "Screening", count: 1728, percentage: 50 },
    { stage: "Interview", count: 345, percentage: 10 },
    { stage: "Offer", count: 69, percentage: 2 },
    { stage: "Hired", count: 34, percentage: 1 },
  ],
};

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "interview":
        return "bg-blue-100 text-blue-800";
      case "offer":
        return "bg-purple-100 text-purple-800";
      case "hired":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "review":
        return <Clock className="h-3 w-3" />;
      case "interview":
        return <Eye className="h-3 w-3" />;
      case "offer":
        return <Award className="h-3 w-3" />;
      case "hired":
        return <CheckCircle className="h-3 w-3" />;
      case "rejected":
        return <XCircle className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <div className="p-6 mx-auto space-y-6 w-full">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to HR Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor your recruitment activities and manage hiring processes
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applicants
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData.metrics.totalApplicants}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />+
                  {dashboardData.trends.applicantsGrowth}% from last month
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData.metrics.activeJobs}
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Currently hiring
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData.metrics.totalApplications}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />+
                  {dashboardData.trends.applicationsGrowth}% from last month
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Hired This Month
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData.metrics.hiredThisMonth}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />+
                  {dashboardData.trends.hiringGrowth}% from last month
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.hiringFunnel.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {stage.stage}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {stage.percentage}%
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {stage.count}
                      </span>
                    </div>
                  </div>
                  <Progress value={stage.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Jobs */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Top Performing Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-500">{job.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex space-x-4 text-sm">
                      <span className="text-blue-600">
                        {job.applications} apps
                      </span>
                      <span className="text-purple-600">
                        {job.interviews} interviews
                      </span>
                      <span className="text-green-600">
                        {job.offers} offers
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.recentApplications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {application.applicantName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {application.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {application.experience}
                    </p>
                    <p className="text-xs text-gray-400">
                      Applied{" "}
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      application.status
                    )} flex items-center space-x-1`}
                  >
                    {getStatusIcon(application.status)}
                    <span className="capitalize">{application.status}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
