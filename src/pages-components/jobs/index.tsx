"use client";

import { Search, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useUrlFilter } from "@/hooks/useFilters";
import { FilterGroup, FilterItem } from "@/components/filters/FilterGroup";
import { useFetchJobs } from "@/apis/jobs";
import { formatDate, getJobTypeLabel } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

type JobFilters = {
  search?: string;
  location?: string;
  type?: string;
};

export default function Jobs() {
  const router = useRouter();
  const { filters, setFilters } = useUrlFilter<JobFilters>();
  const [searchValue, setSearchValue] = useState(filters.search ?? "");

  const { data, isLoading } = useFetchJobs({
    limit: 10,
    search: searchValue ?? "",
    skip: 0,
    status: "active",
    ...(filters.type && { type: filters.type }),
  });

  const filteredJobs = data?.data.jobs;
  const debouncedSetSearch = useMemo(() => {
    return debounce((value: string) => {
      setFilters((prev) => ({
        ...prev,
        search: value || undefined,
      }));
    }, 200);
  }, [setFilters]);

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const filterItems: FilterItem[] = [
    {
      label: "Job Type",
      value: filters.type ?? "all",
      width: "w-40",
      options: [
        { label: "All Types", value: "all" },
        { label: "Full time", value: "full_time" },
        { label: "Contract", value: "contract" },
        { label: "Part-time", value: "part_time" },
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
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchValue(val);
                    debouncedSetSearch(val);
                  }}
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
            {filteredJobs?.length} job{filteredJobs?.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        <div className="grid gap-6">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 bg-white shadow-md animate-pulse rounded-md space-y-4"
              >
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : filteredJobs && filteredJobs?.length > 0 ? (
            filteredJobs?.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-md bg-white shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {job.title}
                      </CardTitle>

                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDate(job.created_at)}</span>
                        <span className="mx-2">•</span>
                        <span>{getJobTypeLabel(job.job_type)}</span>
                        <span className="mx-2">•</span>
                        <span className="font-medium text-green-600">
                          {job.salary_min} - {job.salary_max}
                        </span>
                      </div>

                      {job.required_skills &&
                        job.required_skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {job.required_skills.map(
                              (skill: string, index: number) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        )}
                    </div>

                    <Button onClick={() => router.push(`/job/${job.id}`)}>
                      View Details
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No jobs found matching your criteria.
              </p>
              <p className="text-gray-400 mt-2">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
