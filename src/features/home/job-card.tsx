"use client"

import { ClockIcon, MapPinIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardTitle } from '~/components/ui/card'
import { formatDate, getJobTypeLabel } from '~/lib/utils'
import { IJob } from '../jobs/apis/dto'

interface JobCardProps {
  job: IJob;
}

const JobCard = ({ job }: JobCardProps) => {
  const router = useRouter();
  // console.log("jobdetails", job)

  return (
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
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-2">
              <ClockIcon className="h-4 w-4 mr-1" />
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

          <Button onClick={() => router.push(`/jobs/${job.id}`)}>
            View Details
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}

export default JobCard