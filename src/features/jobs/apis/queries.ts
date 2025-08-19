import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateJob,
  IJobResponse,
  IUpdateJob,
  IJobsResponse,
  IGetJobsParams,
} from "./dto";


export const useGetJobsQuery = (filters: IGetJobsParams = {}) => {
  return useQuery<IJobsResponse, Error>({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const response = await apiClient.get<IJobsResponse>("/jobs/get-jobs", {
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

export const useGetJobQuery = (id: string) => {
  return useQuery<IJobResponse, Error>({
    queryKey: ["job", id],
    enabled: !!id,
    queryFn: async () => {
      const response = await apiClient.get<IJobResponse>(`/jobs/${id}`);
      return response.data;
    },
  });
};

export const useCreateJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-job"],
    mutationFn: async (body: ICreateJob) => {
      const response = await apiClient.post<IJobResponse>("/jobs", body);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      console.log("Job created:", data);
    },
    onError: (error) => {
      console.error("Error creating job:", error);
    },
  });
};

export const useUpdateJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-job"],
    mutationFn: async ({ id, ...patch }: IUpdateJob) => {
      const response = await apiClient.put<IJobResponse>(`/jobs/${id}`, patch);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      console.log("Job updated:", data);
    },
    onError: (error) => {
      console.error("Error updating job:", error);
    },
  });
};

export const useDeleteJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-job"],
    mutationFn: async (id: string | number) => {
      const response = await apiClient.delete(`/jobs/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      console.log("Job deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting job:", error);
    },
  });
};
