"use client";

import {
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Plus,
  XCircle
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "~/components/loader";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ApplicationsList } from "./list-application";

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

export default function ApplicationsScreen() {
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
    return <Loader mode="icon" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Card className="bg-white shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Applications</CardTitle>
              <Button
                onClick={() => router.push("/")}
                className="bg-primary hover:bg-primary/90"
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

