"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Eye,
  Edit,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Briefcase,
  Building2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { MetricCard } from "@/components/ui/metric-card";
import { FilterGroup } from "@/components/filters/FilterGroup";
import { useUrlFilter } from "@/hooks/useFilters";

// Mock jobs data
const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    status: "active",
    priority: "high",
    postedDate: "2024-01-15",
    closingDate: "2024-02-15",
    applicationsCount: 156,
    interviewsCount: 12,
    offersCount: 3,
    hiredCount: 1,
    description:
      "We are looking for a Senior Frontend Developer to join our dynamic team...",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Team leadership skills",
    ],
    benefits: ["Health insurance", "401k matching", "Remote work options"],
    recruiter: "Sarah Johnson",
    hiringManager: "John Smith",
    createdBy: "HR Admin",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    status: "active",
    priority: "medium",
    postedDate: "2024-01-12",
    closingDate: "2024-02-12",
    applicationsCount: 89,
    interviewsCount: 8,
    offersCount: 2,
    hiredCount: 0,
    description: "Join our product team to drive innovation and growth...",
    requirements: [
      "3+ years PM experience",
      "Agile methodology",
      "Analytics skills",
    ],
    benefits: ["Health insurance", "Stock options", "Flexible hours"],
    recruiter: "Mike Chen",
    hiringManager: "Emily Davis",
    createdBy: "HR Admin",
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $100k",
    status: "paused",
    priority: "low",
    postedDate: "2024-01-10",
    closingDate: "2024-02-10",
    applicationsCount: 134,
    interviewsCount: 15,
    offersCount: 4,
    hiredCount: 2,
    description: "Create beautiful and intuitive user experiences...",
    requirements: [
      "Figma expertise",
      "User research experience",
      "Portfolio required",
    ],
    benefits: ["Health insurance", "Professional development", "Remote work"],
    recruiter: "Emma Wilson",
    hiringManager: "David Wilson",
    createdBy: "HR Admin",
  },
];

interface JobFilters {
  status: string;
  location: string;
  department: string;
  [key: string]: string;
}

export default function JobsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3" />;
      case "paused":
        return <AlertCircle className="h-3 w-3" />;
      case "closed":
        return <XCircle className="h-3 w-3" />;
      case "draft":
        return <Clock className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const statusCounts = {
    all: jobsData.length,
    active: jobsData.filter((j) => j.status === "active").length,
    paused: jobsData.filter((j) => j.status === "paused").length,
    closed: jobsData.filter((j) => j.status === "closed").length,
    draft: jobsData.filter((j) => j.status === "draft").length,
  };

  const metrics = [
    {
      title: "Total Jobs",
      value: jobsData.length,
      icon: Briefcase,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      change: "+5.2%",
      changeType: "up",
    },
    {
      title: "Active Jobs",
      value: statusCounts.active,
      icon: CheckCircle,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      change: "-2.1%",
      changeType: "down",
    },
    {
      title: "Total Applications",
      value: jobsData.reduce((sum, job) => sum + job.applicationsCount, 0),
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      change: "+12.4%",
      changeType: "up",
    },
    {
      title: "Total Hired",
      value: jobsData.reduce((sum, job) => sum + job.hiredCount, 0),
      icon: CheckCircle,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      change: "+0.8%",
      changeType: "up",
    },
  ] as const;

  const { filters, setFilters } = useUrlFilter<JobFilters>();

  const filteredJobs = jobsData.filter((job) => {
    const searchTerm = filters.search?.toLowerCase().trim();
    const locationFilter = filters.location?.toLowerCase();
    const typeFilter = filters.type?.toLowerCase();
    const statusFilter = filters.status?.toLowerCase();
    const departmentFilter = filters.department?.toLowerCase();

    const matchSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm) ||
      job.requirements?.some((skill: string) =>
        skill.toLowerCase().includes(searchTerm)
      );

    const matchLocation =
      !locationFilter ||
      job.location.toLowerCase().includes(locationFilter) ||
      job.department.toLowerCase().includes(locationFilter) ||
      job.type.toLowerCase().includes(locationFilter);

    const matchType = !typeFilter || job.type.toLowerCase() === typeFilter;

    const matchStatus =
      !statusFilter || job.status?.toLowerCase() === statusFilter;

    const matchDepartment =
      !departmentFilter || job.department?.toLowerCase() === departmentFilter;

    return (
      matchSearch &&
      matchLocation &&
      matchType &&
      matchStatus &&
      matchDepartment
    );
  });

  console.log("Filtered Jobs:", filteredJobs);

  const filtersOptions = [
    {
      label: "Status",
      value: filters.status ?? "all",
      onChange: (val: string) =>
        setFilters((prev) => ({
          ...prev,
          status: val === "all" ? undefined : val,
        })),
      options: [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Paused", value: "paused" },
        { label: "Closed", value: "closed" },
        { label: "Draft", value: "draft" },
      ],
    },
    {
      label: "Location",
      value: filters.location ?? "all",
      onChange: (val: string) =>
        setFilters((prev) => ({
          ...prev,
          location: val === "all" ? undefined : val,
        })),
      options: [
        { label: "All", value: "all" },
        { label: "San Francisco, CA", value: "San Francisco, CA" },
        { label: "New York, NY", value: "New York, NY" },
        { label: "Remote", value: "Remote" },
        { label: "Austin, TX", value: "Austin, TX" },
      ],
    },
    {
      label: "Department",
      value: filters.department ?? "all",
      onChange: (val: string) =>
        setFilters((prev) => ({
          ...prev,
          department: val === "all" ? undefined : val,
        })),
      options: [
        { label: "All", value: "all" },
        { label: "Engineering", value: "Engineering" },
        { label: "Product", value: "Product" },
        { label: "Design", value: "Design" },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jobs Management</h1>
          <p className="text-gray-600">
            Create, manage, and track job postings
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            href={"/admin/jobs/create"}
            className="bg-blue-primary hover:bg-blue-primary/90 flex flex-row py-[6px] px-[20px] rounded-md items-center text-lg text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            iconColor={metric.iconColor}
            iconBg={metric.iconBg}
            change={metric.change}
            changeType={metric.changeType}
          />
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-lg ">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search jobs by title, department, or location..."
                  value={filters.search ?? ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      search:
                        e.target.value.trim() === ""
                          ? undefined
                          : e.target.value,
                    }))
                  }
                  className="pl-10"
                />
              </div>
            </div>
            <FilterGroup filters={filtersOptions} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-0">
          <Tabs
            value={filters.status ?? "all"}
            onValueChange={(val) =>
              setFilters((prev) => ({ ...prev, status: val }))
            }
            className="w-full pb-[10px] pt-[10px]"
          >
            <div className="border-b px-6 pt-[14px] pb-[14px]">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all" className="cursor-pointer">
                  All ({statusCounts.all})
                </TabsTrigger>
                <TabsTrigger value="active" className="cursor-pointer">
                  Active ({statusCounts.active})
                </TabsTrigger>
                <TabsTrigger value="paused" className="cursor-pointer">
                  Paused ({statusCounts.paused})
                </TabsTrigger>
                <TabsTrigger value="closed" className="cursor-pointer">
                  Closed ({statusCounts.closed})
                </TabsTrigger>
                <TabsTrigger value="draft" className="cursor-pointer">
                  Draft ({statusCounts.draft})
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {job.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(job.priority)}>
                              {job.priority.toUpperCase()}
                            </Badge>
                            <Badge
                              className={`${getStatusColor(
                                job.status
                              )} flex items-center space-x-1`}
                            >
                              {getStatusIcon(job.status)}
                              <span className="capitalize">{job.status}</span>
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Building2 className="h-4 w-4 mr-2" />
                            <span className="text-sm">{job.department}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2" />
                            <span className="text-sm">{job.salary}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              Posted{" "}
                              {new Date(job.postedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">
                              {job.applicationsCount}
                            </p>
                            <p className="text-xs text-gray-600">
                              Applications
                            </p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">
                              {job.interviewsCount}
                            </p>
                            <p className="text-xs text-gray-600">Interviews</p>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-600">
                              {job.offersCount}
                            </p>
                            <p className="text-xs text-gray-600">Offers</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                              {job.hiredCount}
                            </p>
                            <p className="text-xs text-gray-600">Hired</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <p>Recruiter: {job.recruiter}</p>
                            <p>Hiring Manager: {job.hiringManager}</p>
                          </div>
                          <div className="flex space-x-2 mt-[10px]">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center bg-transparent"
                            >
                              <Link
                                href={`/admin/jobs/${job.id}?type=view`}
                                className="flex items-center"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Link>
                            </Button>
                            <Link href={`/admin/jobs/${job.id}?type=edit`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </Link>

                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-1" />
                              Applications
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Briefcase className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search criteria or create a new job.
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
