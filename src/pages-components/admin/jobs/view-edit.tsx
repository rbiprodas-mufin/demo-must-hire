"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Edit,
  X,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Label } from "@/components/ui/labels";

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
      "We are looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of our web applications. You'll work closely with our design and backend teams to create exceptional user experiences.",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Team leadership skills",
      "Experience with modern build tools",
      "Strong problem-solving abilities",
    ],
    benefits: [
      "Health insurance",
      "401k matching",
      "Remote work options",
      "Professional development budget",
      "Flexible working hours",
    ],
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
    description:
      "Join our product team to drive innovation and growth. You'll be responsible for defining product strategy, working with cross-functional teams, and ensuring we deliver value to our customers.",
    requirements: [
      "3+ years PM experience",
      "Agile methodology",
      "Analytics skills",
      "Strong communication",
      "Technical background preferred",
    ],
    benefits: [
      "Health insurance",
      "Stock options",
      "Flexible hours",
      "Learning stipend",
      "Team retreats",
    ],
    recruiter: "Mike Chen",
    hiringManager: "Emily Davis",
    createdBy: "HR Admin",
  },
];

export default function JobManage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "view"; // view, edit
  const jobId = Number.parseInt(id as string, 10);
  console.log("Job ID from params:", jobId);
  const [job, setJob] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundJob = jobsData.find((j) => j.id === jobId);
    console.log("Job ID:", foundJob);
    if (foundJob) {
      setJob(foundJob);
      setFormData({
        title: foundJob.title,
        department: foundJob.department,
        location: foundJob.location,
        type: foundJob.type,
        salary: foundJob.salary,
        status: foundJob.status,
        priority: foundJob.priority,
        description: foundJob.description,
        requirements: foundJob.requirements.join("\n"),
        benefits: foundJob.benefits.join("\n"),
        closingDate: foundJob.closingDate,
      });
    }
    setLoading(false);
  }, [jobId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle job update
    console.log("Updating job:", formData);
    router.push("/hr/jobs");
  };

  const handleBack = () => {
    router.push("/hr/jobs");
  };

  const handleEdit = () => {
    router.push(`/hr/jobs/${jobId}?type=edit`);
  };

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
        return <CheckCircle className="h-4 w-4" />;
      case "paused":
        return <AlertCircle className="h-4 w-4" />;
      case "closed":
        return <XCircle className="h-4 w-4" />;
      case "draft":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
        <Button onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>
      </div>
    );
  }

  const isViewMode = type === "view";

  return (
    <div className="p-6 max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isViewMode ? "Job Details" : "Edit Job"}
            </h1>
            <p className="text-gray-600">
              {isViewMode
                ? "View job information and statistics"
                : "Update job details and requirements"}
            </p>
          </div>
          <div>
            <Button
              className="flex justify-center items-center  mt-[6px]"
              variant="outline"
              size="sm"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </div>
        </div>
        {isViewMode && (
          <Button onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Job
          </Button>
        )}
      </div>

      {isViewMode ? (
        // View Mode
        <div className="space-y-6">
          {/* Job Header */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
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

              {/* Statistics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">
                    {job.applicationsCount}
                  </p>
                  <p className="text-sm text-gray-600">Applications</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">
                    {job.interviewsCount}
                  </p>
                  <p className="text-sm text-gray-600">Interviews</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">
                    {job.offersCount}
                  </p>
                  <p className="text-sm text-gray-600">Offers</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {job.hiredCount}
                  </p>
                  <p className="text-sm text-gray-600">Hired</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-semibold">Job Type</Label>
                  <p className="text-gray-600">{job.type}</p>
                </div>
                <div>
                  <Label className="font-semibold">Closing Date</Label>
                  <p className="text-gray-600">
                    {new Date(job.closingDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="font-semibold">Recruiter</Label>
                  <p className="text-gray-600">{job.recruiter}</p>
                </div>
                <div>
                  <Label className="font-semibold">Hiring Manager</Label>
                  <p className="text-gray-600">{job.hiringManager}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  View Applications ({job.applicationsCount})
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interviews
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Job Posting
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Description and Details */}
          <Card className="bg-white shadow-lg mt-6">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-green-600 rounded-full flex-shrink-0"></span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Edit Mode
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Edit Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData({ ...formData, department: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="closingDate">Closing Date</Label>
                <Input
                  id="closingDate"
                  type="date"
                  value={formData.closingDate}
                  onChange={(e) =>
                    setFormData({ ...formData, closingDate: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="requirements">
                  Requirements (one per line)
                </Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits}
                  onChange={(e) =>
                    setFormData({ ...formData, benefits: e.target.value })
                  }
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button type="button" variant="outline" onClick={handleBack}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Update Job
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
