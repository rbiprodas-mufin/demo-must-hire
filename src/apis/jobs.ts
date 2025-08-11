import axiosInstance from "@/lib/axios";
import { CreateJobPayload, Job, JobsResponse } from "@/types/job";
import { useMutation, useQuery } from "@tanstack/react-query";

interface GetJobsParams {
  skip?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}

interface JobResponse {
  data: Job;
}

export const useCreateJob = () => {
  return useMutation({
    mutationFn: async (payload: CreateJobPayload) => {
      const response = await axiosInstance.post("/jobs", payload);
      return response.data;
    },
  });
};

export const useFetchJobs = (filters: GetJobsParams) => {
  return useQuery<JobsResponse>({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const response = await axiosInstance.get("/jobs/", {
        params: {
          skip: filters.skip ?? 0,
          limit: filters.limit ?? 10,
          status: filters.status ?? "active",
          ...(filters.search ? { search: filters.search } : {}),
          ...(filters.type ? { type: filters.type } : {}),
        },
      });
      return response.data;
    },
  });
};

export const useGetJobById = (id?: string) => {
  return useQuery<JobResponse>({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/jobs/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
