import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Download, Eye } from "lucide-react";

function ResumeView({ application }: { application: any }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={application.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {application.applicantName
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{application.applicantName}</h3>
            <p className="text-sm text-gray-600">{application.jobTitle}</p>
          </div>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download Resume
        </Button>
      </div>

      {/* Resume Preview Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Download className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Resume Preview
            </h3>
            <p className="text-gray-600">
              {application.resumeUrl || "resume.pdf"}
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View in Browser
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">
            {application.jobTitle.includes("Senior") ? "5+" : "3+"}
          </p>
          <p className="text-sm text-gray-600">Years Experience</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">
            {Math.floor(application.rating * 20)}%
          </p>
          <p className="text-sm text-gray-600">Match Score</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">
            {application.department === "Engineering" ? "8+" : "5+"}
          </p>
          <p className="text-sm text-gray-600">Key Skills</p>
        </div>
      </div>
    </div>
  );
}

export default ResumeView;
