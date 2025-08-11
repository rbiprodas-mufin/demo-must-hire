export interface CreateJobPayload {
  title: string;
  description: string;
  responsibilities: string[]; // each element is a single responsibility
  benefits: string[]; // each element is a single benefit
  required_skills: string[]; // each element is a single skill
  education_requirements: string;
  department: string;
  location: string;
  job_type: "full_time" | "part_time" | "contract" | "internship";
  experience_level: "entry" | "mid" | "senior";
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  is_remote: boolean;
  application_deadline: string; // ISO string
  max_applications: number;
  status: "active" | "inactive" | "draft";
}

export type JobType = "full_time" | "part_time" | "contract" | "internship";
export type ExperienceLevel = "entry" | "mid" | "senior";
export type JobStatus = "active" | "inactive" | "draft";

export interface Job extends CreateJobPayload {
  id: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface JobsData {
  jobs: Job[];
  total_count: number;
  page: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data: JobsData;
}
