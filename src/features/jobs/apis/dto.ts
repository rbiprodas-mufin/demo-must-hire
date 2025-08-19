export type JobType = "full_time" | "part_time" | "contract" | "internship";
export type ExperienceLevel = "entry" | "mid" | "senior";
export type JobStatus = "active" | "inactive" | "draft";

export interface IGetJobsParams {
  skip?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
}

export interface IJob {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  benefits: string[];
  required_skills: string[];
  education_requirements: string;
  department: string;
  location: string;
  job_type: JobType;
  experience_level: ExperienceLevel;
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  status: JobStatus;
  is_remote: boolean;
  application_deadline: string;
  max_applications: number;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateJob {
  title: string;
  description: string;
  responsibilities: string[];
  benefits: string[];
  required_skills: string[];
  education_requirements: string;
  department: string;
  location: string;
  job_type: JobType;
  experience_level: ExperienceLevel;
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  status: JobStatus;
  is_remote: boolean;
  application_deadline: string;
  max_applications: number;
}

export interface IUpdateJob {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  benefits: string[];
  required_skills: string[];
  education_requirements: string;
  department: string;
  location: string;
  job_type: JobType;
  experience_level: ExperienceLevel;
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  status: JobStatus;
  is_remote: boolean;
  application_deadline: string;
  max_applications: number;
}

export interface IJobsResponse {
  success: boolean;
  message: string;
  data: IJob[];
}

export interface IJobResponse {
  success: boolean;
  message: string;
  data: IJob;
}
