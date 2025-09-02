import apiClient from "~/utils/axios";
import {
  ICreateJob,
  IJobResponse,
  IJobsResponse,
  IUpdateJob,
} from "./dto";

export const getJobs = async () => {
  const res = await apiClient.get<IJobsResponse>("/jobs/get-jobs");
  return res.data;
};

export const getJob = async (jobId: string) => {
  const res = await apiClient.get<IJobResponse>(`/jobs/${jobId}`);
  return res.data;
};

export const createJob = async (data: ICreateJob) => {
  const res = await apiClient.post<IJobResponse>("/jobs",
    data
  );
  return res.data;
};

export const updateJob = async (jobId: string, data: IUpdateJob) => {
  const res = await apiClient.put<IJobResponse>(`/jobs/${jobId}`,
    data
  );
  return res.data;
};

export const deleteJob = async (jobId: string) => {
  const res = await apiClient.delete(`/jobs/${jobId}`);
  return res.data;
};
