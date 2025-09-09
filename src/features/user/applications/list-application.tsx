"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Building2, Calendar, DollarSign, MapPin } from "lucide-react";
import { Progress } from "~/components/ui/progress";
import { FileText } from "lucide-react";

export const ApplicationsList = ({
  applications,
  getStatusColor,
  getStatusIcon,
}: {
  applications: any[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
}) => {
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
