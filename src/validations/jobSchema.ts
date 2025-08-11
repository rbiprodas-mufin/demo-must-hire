import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().nonempty({ message: "Job title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  responsibilities: z
    .array(z.string())
    .nonempty({ message: "Responsibilities are required" }),
  benefits: z.array(z.string()).nonempty({ message: "Benefits are required" }),
  required_skills: z
    .array(z.string())
    .nonempty({ message: "Skills are required" }),
  education_requirements: z
    .string()
    .nonempty({ message: "Education is required" }),
  department: z.string().nonempty({ message: "Department is required" }),
  location: z.string().nonempty({ message: "Location is required" }),
  job_type: z.enum(["full_time", "part_time", "contract", "internship"]),
  experience_level: z.enum(["entry", "mid", "senior"]),
  salary_min: z.number().min(0, { message: "Salary must be positive" }),
  salary_max: z.number().min(0, { message: "Salary must be positive" }),
  salary_currency: z.string().nonempty({ message: "Currency is required" }),
  is_remote: z.boolean(),
  application_deadline: z
    .string()
    .nonempty({ message: "Deadline is required" }),
  max_applications: z.number().min(1, { message: "Must be at least 1" }),
  status: z.enum(["active", "inactive", "draft"]),
});
