"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  ArrowLeft,
  Building2,
  CheckCircle,
} from "lucide-react";

const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "2 days ago",
    description:
      "We are looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of web applications.",
    fullDescription: `We are seeking a talented Senior Frontend Developer to join our growing engineering team. You will be responsible for developing user-facing features, optimizing applications for maximum speed and scalability, and collaborating with our design and backend teams.

Key Responsibilities:
• Develop new user-facing features using React.js and Next.js
• Build reusable components and front-end libraries for future use
• Translate designs and wireframes into high-quality code
• Optimize components for maximum performance across devices and browsers
• Collaborate with other team members and stakeholders
• Stay up-to-date with emerging technologies and industry trends

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote work options
• Professional development opportunities
• Modern office space in downtown San Francisco
• Catered meals and snacks`,
    skills: ["React", "TypeScript", "Next.js", "JavaScript", "CSS", "Git"],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React.js and its core principles",
      "Experience with TypeScript and modern JavaScript (ES6+)",
      "Familiarity with RESTful APIs and GraphQL",
      "Experience with version control systems (Git)",
      "Strong problem-solving skills and attention to detail",
    ],
    benefits: [
      "Health, Dental & Vision Insurance",
      "401(k) with company matching",
      "Flexible PTO policy",
      "Remote work options",
      "Professional development budget",
      "Stock options",
    ],
    companySize: "100-500 employees",
    industry: "Technology",
    founded: "2015",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    posted: "1 day ago",
    description:
      "Join our product team to drive innovation and growth in our fast-paced startup environment.",
    fullDescription: `We're looking for an experienced Product Manager to join our team and help shape the future of our platform. You'll work closely with engineering, design, and business teams to define product strategy and execute on our roadmap.

Key Responsibilities:
• Define and execute product strategy and roadmap
• Conduct market research and competitive analysis
• Work with engineering teams to prioritize features and requirements
• Analyze user feedback and data to inform product decisions
• Collaborate with design team on user experience improvements
• Present product updates to stakeholders and leadership

What We Offer:
• Fast-paced startup environment with growth opportunities
• Direct impact on product direction and company success
• Collaborative team culture
• Competitive compensation and equity
• Comprehensive benefits package
• Flexible work environment`,
    skills: [
      "Product Strategy",
      "Analytics",
      "Agile",
      "User Research",
      "SQL",
      "Figma",
    ],
    requirements: [
      "3+ years of product management experience",
      "Experience with agile development methodologies",
      "Strong analytical and problem-solving skills",
      "Excellent communication and presentation skills",
      "Experience with product analytics tools",
      "Bachelor's degree in relevant field",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health and wellness benefits",
      "Flexible work arrangements",
      "Learning and development opportunities",
      "Team events and company retreats",
      "Modern office space",
    ],
    companySize: "50-100 employees",
    industry: "SaaS",
    founded: "2020",
  },
];

export default function JobDetails() {
  const [job, setJob] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const jobId = Number.parseInt(params.id as string);
    const foundJob = jobsData.find((j) => j.id === jobId);
    setJob(foundJob || jobsData[0]); // Fallback to first job if not found
  }, [params.id]);

  const handleApply = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const jobId = params.id; // dynamic job ID from route

    if (!isLoggedIn) {
      // Redirect to login with a callback to the apply page
      router.push(`/login?redirect=/apply/${jobId}`);
    } else {
      // User is already logged in, go directly to apply page
      router.push(`/apply/${jobId}`);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
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
                    <CardTitle className="text-2xl mb-3">{job.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Building2 className="h-5 w-5 mr-2" />
                      <span className="font-medium text-lg">{job.company}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-medium text-green-600">
                          {job.salary}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
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
                    {job.fullDescription}
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
                  {job.requirements.map((req: string, index: number) => (
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
                  {job.benefits.map((benefit: string, index: number) => (
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
            <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium">{job.industry}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Size:</span>
                  <span className="font-medium">{job.companySize}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded:</span>
                  <span className="font-medium">{job.founded}</span>
                </div>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card className="bg-white shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Range:</span>
                  <span className="font-medium text-green-600">
                    {job.salary}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">{job.posted}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
