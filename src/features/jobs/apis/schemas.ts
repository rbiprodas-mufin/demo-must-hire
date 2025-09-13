import * as z from "zod";

export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  responsibilities: z.array(z.string()),
  benefits: z.array(z.string()),
});