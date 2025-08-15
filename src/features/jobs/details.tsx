"use client";
import { useRouter, useParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  ArrowLeft,
  Building2,
  CheckCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useGetJobById } from "~/apis/jobs";
import { formatDate, getJobTypeLabel } from "~/lib/utils";
import Loader from "~/components/ui/loader";

export default function JobDetails() {
  const { data } = useSession();
  const isLoggedIn = data?.accessToken;
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;
  const { data: jobData, isLoading } = useGetJobById(jobId as string);
  const job = jobData?.data ?? jobData?.data;
  console.log("job", job);
  const handleApply = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/apply/${jobId}`);
    } else {
      router.push(`/apply/${jobId}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 -ml-4 bg-white  cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-3">
                      {job?.title}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Building2 className="h-5 w-5 mr-2" />
                      {/* <span className="font-medium text-lg">{job.company}</span> */}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job?.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{getJobTypeLabel(job?.job_type as string)}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-medium text-green-600">
                          {job?.salary_min} - {job?.salary_max}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          Posted {formatDate(job?.created_at as string)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {/* {job.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))} */}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">
                    {job?.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job?.responsibilities?.map((req: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job?.benefits?.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Ready to Apply?</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleApply} className="w-full mb-4" size="lg">
                  Apply for this Position
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Click to start your application process
                </p>
              </CardContent>
            </Card>

            {/* Company Info */}
            {/* <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader> */}
            {/* <CardTitle>About {job.company}</CardTitle> */}
            {/* </CardHeader> */}
            {/* <CardContent className="space-y-3"> */}
            {/* <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">{job.i}</span>
                </div> */}
            {/* <Separator /> */}
            {/* <div className="flex justify-between">
                  <span className="text-gray-600">Company Size:</span>
                  <span className="font-medium">{job.s}</span>
                </div> */}
            {/* <Separator /> */}
            {/* <div className="flex justify-between">
                  <span className="text-gray-600">Founded:</span>
                  <span className="font-medium">{job.founded}</span>
                </div> */}
            {/* </CardContent> */}
            {/* </Card> */}

            {/* Job Stats */}
            <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <Badge variant="outline">{job?.job_type}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Range:</span>
                  <span className="font-medium text-green-600">
                    {job?.salary_min} - {job?.salary_max}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">
                    {formatDate(job?.created_at as string)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
