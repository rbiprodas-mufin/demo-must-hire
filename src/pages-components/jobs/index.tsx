"use client";

import { Search, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useUrlFilter } from "@/hooks/useFilters";
import { FilterGroup, FilterItem } from "@/components/filters/FilterGroup";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "2 days ago",
    description:
      "We are looking for a Senior Frontend Developer to join our team...",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    posted: "1 day ago",
    description: "Join our product team to drive innovation and growth...",
    skills: ["Product Strategy", "Analytics", "Agile"],
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $100k",
    posted: "3 days ago",
    description: "Create beautiful and intuitive user experiences...",
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "DataFlow",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
    posted: "1 week ago",
    description: "Build scalable backend systems and APIs...",
    skills: ["Node.js", "Python", "AWS"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130k - $170k",
    posted: "4 days ago",
    description: "Manage infrastructure and deployment pipelines...",
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125k - $165k",
    posted: "5 days ago",
    description: "Analyze data and build machine learning models...",
    skills: ["Python", "Machine Learning", "SQL"],
  },
];

type JobFilters = {
  search?: string;
  location?: string;
  type?: string;
};

export default function Jobs() {
  const router = useRouter();
  const { filters, setFilters } = useUrlFilter<JobFilters>();

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      !filters.search ||
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(filters.search!.toLowerCase())
      );

    const matchLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchType = !filters.type || job.type === filters.type;

    return matchSearch && matchLocation && matchType;
  });

  const filterItems: FilterItem[] = [
    {
      label: "Location",
      value: filters.location ?? "all", // <- This fixes the label issue
      width: "w-48",
      options: [
        { label: "All Locations", value: "all" },
        { label: "Remote", value: "remote" },
        { label: "San Francisco", value: "san francisco" },
        { label: "New York", value: "new york" },
        { label: "Austin", value: "austin" },
        { label: "Seattle", value: "seattle" },
        { label: "Boston", value: "boston" },
      ],
      onChange: (value: string) =>
        setFilters((prev) => ({
          ...prev,
          location: value === "all" ? undefined : value,
        })),
    },
    {
      label: "Job Type",
      value: filters.type ?? "all",
      width: "w-40",
      options: [
        { label: "All Types", value: "all" },
        { label: "Full-time", value: "Full-time" },
        { label: "Contract", value: "Contract" },
        { label: "Part-time", value: "Part-time" },
      ],
      onChange: (value: string) =>
        setFilters((prev) => ({
          ...prev,
          type: value === "all" ? undefined : value,
        })),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>
      </section>

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute bg-white shadow-lg  left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={filters.search ?? ""}
                  onChange={(e) => setFilters({ search: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <FilterGroup filters={filterItems} />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-md  bg-white  shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="font-medium">{job.company}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{job.posted}</span>
                      <span className="mx-2">•</span>
                      <span>{job.type}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium text-green-600">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <Button onClick={() => router.push(`/job/${job.id}`)}>
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No jobs found matching your criteria.
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
