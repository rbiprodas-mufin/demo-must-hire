import { TJob } from "./schemas";

export type TJobType = "full_time" | "part_time" | "contract" | "internship";
export type TExperienceLevel = "entry" | "mid" | "senior";
export type TJobStatus = "active" | "inactive" | "draft";


export interface IGetJobsParams {
  skip?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}

export interface IJobsResponse {
  success: boolean;
  message: string;
  data: TJob[];
}

export interface IJobResponse {
  success: boolean;
  message: string;
  data: TJob;
}
