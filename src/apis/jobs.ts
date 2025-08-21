import axiosInstance from "~/lib/axios";
import { CreateJobPayload, Job, JobsResponse } from "~/types/job";
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

