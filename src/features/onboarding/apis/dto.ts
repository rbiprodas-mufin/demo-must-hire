export type Stack = "frontend" | "backend" | "fullstack" | "mobile" | "devops" | "qa" | "data" | "ai" | "ux" | "pm" | "other";
export type Availability = "full_time" | "part_time" | "contract" | "internship";

export interface IGetCandidatesParams {
  skip?: number;
  limit?: number;
  search?: string;
}

export interface ICandidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  current_position: string;
  years_experience: string;
  stack: string[];
  skills: string[];
  linkedin_url: string;
  summary: string;
  expectation_salary: string;
  education: string;
  availability: string;
  resume_url: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  user_id: number;
  user_email: string;
}

interface ICreateCandidate {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  current_position: string;
  years_experience: string;
  stack: string[];
  skills: string[];
  linkedin_url?: string;
  summary?: string;
  expectation_salary?: string;
  education?: string;
  availability?: string;
  metadata?: Record<string, any>;
}

export interface IUpdateCandidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  current_position: string;
  years_experience: string;
  stack: string[];
  skills: string[];
  linkedin_url: string;
  summary: string;
  expectation_salary: string;
  education: string;
  availability: string;
  resume_url: string;
  metadata: Record<string, any>;
  user_email: string;
  user_id: number;
}

export interface ICandidatesResponse {
  success: boolean;
  message: string;
  data: ICandidate[];
}

export interface ICandidateResponse {
  success: boolean;
  message: string;
  data: ICandidate;
}
