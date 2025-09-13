import {
  AlertCircleIcon,
  ArrowLeftIcon,
  Building2Icon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  DollarSignIcon,
  EditIcon,
  MapPinIcon,
  TrashIcon,
  UsersIcon,
  XCircleIcon
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { useGetJobQuery } from '~/features/admin/jobs/apis/queries';
import { AdminHeading } from '../../_components/heading';
import { TJob } from '../apis/schemas';
import { useState } from 'react';

interface JobDetailsProps {
  jobData: TJob;
}

export const JobDetails = ({ jobData }: JobDetailsProps) => {

  
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
        return <CheckCircleIcon className="h-4 w-4" />;
      case "paused":
        return <AlertCircleIcon className="h-4 w-4" />;
      case "closed":
        return <XCircleIcon className="h-4 w-4" />;
      case "draft":
        return <ClockIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
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

  
  return (
    <div className="space-y-6">
      {/* Job Header */}
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {jobData.title}
              </h2>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Building2Icon className="h-4 w-4 mr-2" />
                  <span>{jobData.department}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span>{jobData.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSignIcon className="h-4 w-4 mr-2" />
                  <span>{jobData.salary_min}k - {jobData.salary_max}k {jobData.salary_currency}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>
                    Posted {new Date(jobData.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* <Badge className={getPriorityColor(jobData?.priority)}>
                  {jobData?.priority.toUpperCase()}
                </Badge> */}
              <Badge
                className={`${getStatusColor(jobData?.status || '')} flex items-center space-x-1`}
              >
                {getStatusIcon(jobData.status || '')}
                <span className="capitalize">{jobData.status}</span>
              </Badge>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">
                {/* {jobData.applicationsCount} */}
                -
              </p>
              <p className="text-sm text-gray-600">Applications</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">
                {/* {jobData.interviewsCount} */}
                -
              </p>
              <p className="text-sm text-gray-600">Interviews</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">
                {/* {jobData.offersCount} */}
                -
              </p>
              <p className="text-sm text-gray-600">Offers</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {/* {jobData.hiredCount} */}
                -
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
              <p className="text-gray-600">{jobData.job_type}</p>
            </div>
            <div>
              <Label className="font-semibold">Closing Date</Label>
              <p className="text-gray-600">
                {new Date(jobData.application_deadline || '').toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="font-semibold">Recruiter</Label>
              <p className="text-gray-600">
                {/* {jobData.recruiter} */}
                -
              </p>
            </div>
            <div>
              <Label className="font-semibold">Hiring Manager</Label>
              <p className="text-gray-600">
                {/* {jobData.hiringManager} */}
                -
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              <UsersIcon className="h-4 w-4 mr-2" />
              View Applications ({/* {jobData.applicationsCount} */} -)
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule Interviews
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              <EditIcon className="h-4 w-4 mr-2" />
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
          <p className="text-gray-700 leading-relaxed">{jobData.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {jobData.required_skills.map((req: string, index: number) => (
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
              {jobData.benefits.map((benefit: string, index: number) => (
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
  )
}