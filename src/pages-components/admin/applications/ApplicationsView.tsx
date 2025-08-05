import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Calendar,
  DollarSign,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

function ApplicationDetailsView({ application }: { application: any }) {
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

  function getPriorityColor(priority: string) {
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
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
        <Avatar className="h-16 w-16">
          <AvatarImage src={application.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {application.applicantName
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {application.applicantName}
          </h3>
          <p className="text-gray-600">{application.applicantEmail}</p>
          <div className="flex items-center space-x-4 mt-2">
            <Badge className={getStatusColor(application.status)}>
              {application.status.charAt(0).toUpperCase() +
                application.status.slice(1)}
            </Badge>
            <Badge className={getPriorityColor(application.priority)}>
              {application.priority.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Application Progress */}
      <div className="space-y-4">
        <h4 className="font-semibold text-lg">Application Progress</h4>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {application.stage}
            </span>
            <span className="text-sm text-gray-500">
              {application.progress}%
            </span>
          </div>
          <Progress value={application.progress} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            Next: {application.nextStep}
          </p>
        </div>
      </div>

      {/* Job Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Job Information</h4>
          <div className="bg-white p-4 rounded-lg border space-y-3">
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{application.jobTitle}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{application.department}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{application.location}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{application.salary}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Timeline</h4>
          <div className="bg-white p-4 rounded-lg border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Applied</span>
              <span className="text-sm font-medium">
                {new Date(application.appliedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Activity</span>
              <span className="text-sm font-medium">
                {new Date(application.appliedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Recruiter</span>
              <span className="text-sm font-medium">
                {application.recruiter}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Interview
        </Button>
        <Button variant="outline">
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </Button>
        <Button>Update Status</Button>
      </div>
    </div>
  );
}

export default ApplicationDetailsView;
