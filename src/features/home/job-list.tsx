'use client'

import { Loader2, SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FilterGroup, FilterItem } from '~/components/filters/FilterGroup'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { IJob } from '../jobs/apis/dto'
import { useGetJobsQuery } from '../jobs/apis/queries'
import JobCard from './job-card'
import JobSkeleton from './job-skeleton'

type JobFilters = {
  search?: string;
  location?: string;
  type?: string;
};

const JobList = () => {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    location: "",
    type: "",
  });

  const { data: jobs, isLoading, isError, refetch } = useGetJobsQuery();

  const filteredJobs = useMemo(() => {
    return jobs?.data.filter((job: IJob) => {
      const titleMatch = job.title.toLowerCase().includes(filters.search?.toLowerCase() ?? "")
      const typeMatch = filters.type ? job.job_type.toLowerCase().includes(filters.type.toLowerCase()) : true
      const locationMatch = filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true
      return titleMatch && typeMatch && locationMatch
    })
  }, [jobs, filters.search, filters.type, filters.location])

  const filterItems: FilterItem[] = [
    {
      label: "Location",
      value: filters.location ?? "all",
      width: "w-40",
      options: [
        { label: "All Locations", value: "all" },
        { label: "Remote", value: "remote" },
        { label: "On-site", value: "on_site" },
        { label: "Hybrid", value: "hybrid" },
        { label: "Freelance", value: "freelance" },
        { label: "Internship", value: "internship" },
        { label: "Temporary", value: "temporary" },
        { label: "Volunteer", value: "volunteer" },
        { label: "Other", value: "other" },
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
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex-1">
          <div className="relative">
            <SearchIcon className="absolute bg-white shadow-lg  left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              value={filters.search ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setFilters((prev) => ({
                  ...prev,
                  search: val || undefined,
                }));
              }}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <FilterGroup filters={filterItems} />
        </div>
      </div>
      {isLoading ? (
        <JobSkeleton />
      ) : isError ? (
        <div className="flex flex-col gap-2 justify-center items-center h-full">
          <p className="text-gray-500">Error fetching jobs</p>
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {filteredJobs?.length && filteredJobs?.length > 0 ? filteredJobs?.map((job: IJob) => (
            <JobCard key={job.id} job={job} />
          )) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">No jobs found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobList