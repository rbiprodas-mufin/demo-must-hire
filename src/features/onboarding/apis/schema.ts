import * as z from "zod";

export const CandidateSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  current_position: z.string().min(1, "Current position is required"),
  years_experience: z.string().min(1, "Years experience is required"),
  stack: z.array(z.string()).min(1, "Stack is required"),
  skills: z.array(z.string()).min(1, "Skills are required"),
  linkedin_url: z.string().optional(),
  summary: z.string().optional(),
  expected_salary: z.string().optional(),
  last_education: z.string().optional(),
  joining_availability: z.enum([
    "immediately",
    "1 week",
    "2 weeks",
    "1 month",
    "more than 1 month",
  ]),
  resume_url: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  user_id: z.string().optional(),
  user_email: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const CreateCandidateSchema = CandidateSchema.omit({
  id: true,
  user_id: true,
  user_email: true,
  created_at: true,
  updated_at: true,
}).extend({
  stack: z.string().optional(),
  skills: z.string().optional(),
});

export const UpdateCandidateSchema = CandidateSchema.omit({
  created_at: true,
  updated_at: true,
});

export type TCreateCandidate = z.infer<typeof CreateCandidateSchema>;
export type TUpdateCandidate = z.infer<typeof UpdateCandidateSchema>;

