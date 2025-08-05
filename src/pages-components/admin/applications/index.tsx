"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Download,
  Eye,
  Clock,
  CheckCircle,
  Users,
  Briefcase,
  MapPin,
  DollarSign,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { getPriorityColor, getStatusColor, StatusType } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ApplicationDetailsView from "./ApplicationsView";
import ResumeView from "./ResumeView";
import { useUrlFilter } from "@/hooks/useFilters";
import { FilterGroup } from "@/components/filters/FilterGroup";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock applications data
const applicationsData = [
  {
    id: 1,
    applicantName: "John Smith",
    applicantEmail: "john.smith@email.com",
    jobTitle: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    appliedDate: "2024-01-20",
    status: "interview",
    stage: "Technical Interview",
    progress: 75,
    priority: "high",
    recruiter: "Sarah Johnson",
    nextStep: "Final round scheduled",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    resumeUrl: "john_smith_resume.pdf",
    coverLetterUrl: "john_smith_cover.pdf",
  },
  {
    id: 2,
    applicantName: "Sarah Johnson",
    applicantEmail: "sarah.johnson@email.com",
    jobTitle: "Product Manager",
    department: "Product",
    location: "New York, NY",
    salary: "$100k - $140k",
    appliedDate: "2024-01-19",
    status: "review",
    stage: "Application Review",
    progress: 25,
    priority: "medium",
    recruiter: "Mike Chen",
    nextStep: "Initial screening pending",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    resumeUrl: "sarah_johnson_resume.pdf",
    coverLetterUrl: "sarah_johnson_cover.pdf",
  },
  {
    id: 3,
    applicantName: "Mike Chen",
    applicantEmail: "mike.chen@email.com",
    jobTitle: "UX Designer",
    department: "Design",
    location: "Remote",
    salary: "$80k - $100k",
    appliedDate: "2024-01-18",
    status: "offer",
    stage: "Offer Extended",
    progress: 90,
    priority: "high",
    recruiter: "Emma Wilson",
    nextStep: "Awaiting candidate response",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    resumeUrl: "mike_chen_resume.pdf",
    coverLetterUrl: "mike_chen_cover.pdf",
  },
  {
    id: 4,
    applicantName: "Emily Davis",
    applicantEmail: "emily.davis@email.com",
    jobTitle: "Backend Engineer",
    department: "Engineering",
    location: "Austin, TX",
    salary: "$110k - $150k",
    appliedDate: "2024-01-17",
    status: "hired",
    stage: "Hired",
    progress: 100,
    priority: "high",
    recruiter: "John Smith",
    nextStep: "Onboarding scheduled",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    resumeUrl: "emily_davis_resume.pdf",
    coverLetterUrl: "emily_davis_cover.pdf",
  },
  {
    id: 5,
    applicantName: "David Wilson",
    applicantEmail: "david.wilson@email.com",
    jobTitle: "Data Scientist",
    department: "Analytics",
    location: "Boston, MA",
    salary: "$125k - $165k",
    appliedDate: "2024-01-16",
    status: "rejected",
    stage: "Application Rejected",
    progress: 0,
    priority: "low",
    recruiter: "Lisa Brown",
    nextStep: "Rejection email sent",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
    resumeUrl: "david_wilson_resume.pdf",
    coverLetterUrl: "david_wilson_cover.pdf",
  },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "review":
      return <Clock className="h-3 w-3" />;
    case "interview":
      return <Eye className="h-3 w-3" />;
    case "offer":
      return <AlertCircle className="h-3 w-3" />;
    case "hired":
      return <CheckCircle className="h-3 w-3" />;
    case "rejected":
      return <XCircle className="h-3 w-3" />;
    default:
      return <Clock className="h-3 w-3" />;
  }
}

const statsData = [
  {
    title: "Total Applications",
    value: applicationsData.length,
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "In Review",
    value: applicationsData.filter((a) => a.status === "review").length,
    icon: Clock,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Interviews",
    value: applicationsData.filter((a) => a.status === "interview").length,
    icon: Eye,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Hired",
    value: applicationsData.filter((a) => a.status === "hired").length,
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

interface ApplicationsFilters {
  [key: string]: string | undefined;
  search: string;
  status: string;
  department: string;
  priority: string;
}

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const { filters, setFilters } = useUrlFilter<ApplicationsFilters>();

  const filterConfigs = [
    {
      label: "Status",
      value: filters.status || "all",
      onChange: (val: string) =>
        setFilters((prev) => ({ ...prev, status: val })),
      placeholder: "Filter by status",
      options: [
        { value: "all", label: "All Status" },
        { value: "review", label: "Review" },
        { value: "interview", label: "Interview" },
        { value: "offer", label: "Offer" },
        { value: "hired", label: "Hired" },
        { value: "rejected", label: "Rejected" },
      ],
      className: "w-48",
    },
    {
      label: "Department",
      value: filters.department || "all",
      onChange: (val: string) =>
        setFilters((prev) => ({ ...prev, department: val })),
      placeholder: "Filter by department",
      options: [
        { value: "all", label: "All Departments" },
        { value: "Engineering", label: "Engineering" },
        { value: "Product", label: "Product" },
        { value: "Design", label: "Design" },
        { value: "Analytics", label: "Analytics" },
      ],
      className: "w-48",
    },
    {
      label: "Priority",
      value: filters.priority || "all",
      onChange: (val: string) =>
        setFilters((prev) => ({ ...prev, priority: val })),
      placeholder: "Filter by priority",
      options: [
        { value: "all", label: "All Priority" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
      ],
      className: "w-48",
    },
  ];

  const statusCounts = {
    all: applicationsData.length,
    review: applicationsData.filter((a) => a.status === "review").length,
    interview: applicationsData.filter((a) => a.status === "interview").length,
    offer: applicationsData.filter((a) => a.status === "offer").length,
    hired: applicationsData.filter((a) => a.status === "hired").length,
    rejected: applicationsData.filter((a) => a.status === "rejected").length,
  };

  const filteredApplications = applicationsData.filter((application) => {
    const searchTerm = filters.search?.toLowerCase() || "";

    const matchesSearch =
      application.applicantName.toLowerCase().includes(searchTerm) ||
      application.jobTitle.toLowerCase().includes(searchTerm) ||
      application.department.toLowerCase().includes(searchTerm);

    const matchesStatus =
      filters.status === "all" ||
      !filters.status ||
      application.status === filters.status;

    const matchesDepartment =
      filters.department === "all" ||
      !filters.department ||
      application.department === filters.department;

    const matchesPriority =
      filters.priority === "all" ||
      !filters.priority ||
      application.priority === filters.priority;

    return (
      matchesSearch && matchesStatus && matchesDepartment && matchesPriority
    );
  });

  function setStatusFilter(value: string): void {
    setFilters((prev) => ({ ...prev, status: value }));
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">Track and manage job applications</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.iconBg} p-2 rounded-full`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Complete application information and progress
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <ApplicationDetailsView application={selectedApplication} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isResumeDialogOpen} onOpenChange={setIsResumeDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Resume - {selectedApplication?.applicantName}
            </DialogTitle>
            <DialogDescription>
              View and download candidate resume
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <ResumeView application={selectedApplication} />
          )}
        </DialogContent>
      </Dialog>
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search applications by candidate, job title, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 ">
              <FilterGroup filters={filterConfigs} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-0">
          <Tabs
            value={filters.status || "all"}
            onValueChange={setStatusFilter}
            className="w-full"
          >
            <div className="border-b px-6 pt-[20px] pb-[20px]">
              <TabsList className="grid w-full grid-cols-6 cursor-pointer">
                <TabsTrigger value="all" className="cursor-pointer">
                  All ({statusCounts.all})
                </TabsTrigger>
                <TabsTrigger value="review" className="cursor-pointer">
                  Review ({statusCounts.review})
                </TabsTrigger>
                <TabsTrigger value="interview" className="cursor-pointer">
                  Interview ({statusCounts.interview})
                </TabsTrigger>
                <TabsTrigger value="offer" className="cursor-pointer">
                  Offer ({statusCounts.offer})
                </TabsTrigger>
                <TabsTrigger value="hired" className="cursor-pointer">
                  Hired ({statusCounts.hired})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="cursor-pointer">
                  Rejected ({statusCounts.rejected})
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={application.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {application.applicantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {application.applicantName}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={getPriorityColor(
                                  application.priority
                                )}
                              >
                                {application.priority.toUpperCase()}
                              </Badge>
                              <Badge
                                className={`${getStatusColor(
                                  application.status
                                )} flex items-center space-x-1`}
                              >
                                {getStatusIcon(application.status)}
                                <span className="capitalize">
                                  {application.status}
                                </span>
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center text-gray-600">
                              <Briefcase className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                {application.jobTitle}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                {application.department}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                {application.location}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <DollarSign className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                {application.salary}
                              </span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">
                                {application.stage}
                              </span>
                              <span className="text-sm text-gray-500">
                                {application.progress}%
                              </span>
                            </div>
                            <Progress
                              value={application.progress}
                              className="h-2"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              <p>
                                Applied:{" "}
                                {new Date(
                                  application.appliedDate
                                ).toLocaleDateString()}
                              </p>
                              <p>Recruiter: {application.recruiter}</p>
                              <p>Next: {application.nextStep}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setIsDetailsDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setIsResumeDialogOpen(true);
                                }}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Resume
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No applications found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
