import * as z from "zod";

export const JobSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .max(255, "Title must be at most 255 characters"),
  description: z.string().nonempty({ message: "Description is required" }),
  responsibilities: z
    .array(z.string().nonempty({ message: "Responsibility must be non-empty" }))
    .min(1, "At least one responsibility is required"),
  benefits: z
    .array(z.string().nonempty({ message: "Benefit must be non-empty" }))
    .min(1, "At least one benefit is required"),
  required_skills: z
    .array(z.string().nonempty({ message: "Skill must be non-empty" }))
    .min(1, "At least one required skill is required"),

  education_requirements: z.string().optional(),
  
  department: z
    .string()
    .nonempty({ message: "Department is required" })
    .max(100, "Department must be at most 100 characters"),
  location: z
    .string()
    .nonempty({ message: "Location is required" })
    .max(255, "Location must be at most 255 characters"),

  job_type: z.enum(["full_time", "part_time", "contract", "internship"]).optional(),
  experience_level: z.enum(["entry", "mid", "senior"]).optional(),
  salary_min: z.number().optional(),
  salary_max: z.number().optional(),
  salary_currency: z.string().max(3, "Currency must be at most 3 characters").optional(),

  is_remote: z.boolean().optional(), // remove this field later, work_mode will be used instead
  // work_mode: z.enum(["remote", "hybrid", "onsite"]),
  application_deadline: z.date().optional(),
  max_applications: z.number().optional(),
  status: z.enum(["active", "inactive", "draft"]).optional(),
  created_by: z.string(),
  updated_by: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
}).refine(
  (data) =>
    // if both provided (not null), ensure max >= min
    data.salary_min === undefined ||
    data.salary_max === undefined ||
    data.salary_max >= data.salary_min,
  {
    message: "salary_max must be greater than or equal to salary_min",
    path: ["salary_max"],
  }
);

export const CreateJobSchema = JobSchema.omit({
  id: true,
  // status: true,
  created_by: true,
  updated_by: true,
  created_at: true,
  updated_at: true,
});

export const UpdateJobSchema = JobSchema.omit({
  // status: true,
  created_at: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
});


export type TJob = z.infer<typeof JobSchema>;
export type TCreateJob = z.infer<typeof CreateJobSchema>;
export type TUpdateJob = z.infer<typeof UpdateJobSchema>;

// suggested schema for job data:

interface IJobData {
  // Identification & Metadata
  id: string,
  slug: string, // senior-frontend-developer
  job_code: string, // SF-001

  // Job Basic Details
  company_overview: string,
  department: string,
  location: string,
  vacancy_count: number,
  priority: "high" | "medium" | "low",
  work_mode: "remote" | "hybrid" | "onsite",
  experience_level: "entry" | "mid" | "senior", // careerLevel
  experience_range: string, // "5-8 years"
  employmentType: "full_time" | "part_time" | "contract" | "internship",
  status: "active" | "inactive" | "draft",

  // Job Detailed Description
  title: string,
  description: string,
  requirements: string[], // requred_skills
  responsibilities: string[],
  education_requirements: string,
  
  // Compensation & Benefits
  salary_min: number,
  salary_max: number,
  salary_currency: string,
  // salary: "$120k - $160k", // salary_min and salary_max, salary_currency
  payPeriod: "hourly" | "daily" | "weekly" | "monthly" | "yearly",
  benefits: string[],
  perks: string[],

  // Lifecycle Dates
  created_at: string,
  updated_at: string,
  published_at: string,
  archived_at: string, // closedAt, if job no longer open

  // Requirement Tracking
  stage: "draft" | "published" | "archived" | "closed",
  application_deadline: string,
  auto_close: boolean, // weather auto close after deadline
  tags: string[],
  source: "LinkedIn" | "Internal" | "Referral", // where job was posted

  // people involved in hiring process
  team: string[],
  recruiter_email: string,
  hiring_manager_email: string,
  created_by: string,
  updated_by: string,

  // Permission and workflow
  visibility: "public" | "internal",
  approval_status: "pending" | "approved" | "rejected",

  // summary stats
  applicationsCount: 156,
  interviewsCount: 12,
  offersCount: 3,
  hiredCount: 1,
}
