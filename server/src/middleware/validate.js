import { z } from "zod";

const baseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email")
    .max(120),
  description: z
    .string()
    .trim()
    .min(10, "Please give us a bit more detail (min 10 characters)")
    .max(2000, "Description is too long"),
});

const mhSchema = baseSchema.extend({
  source: z.literal("MH"),
  projectType: z
    .string()
    .trim()
    .min(1, "Please select a project type")
    .max(60),
});

const jeSchema = baseSchema.extend({
  source: z.literal("JE"),
  videoType: z
    .string()
    .trim()
    .min(1, "Please select a video type")
    .max(60),
  fileLink: z
    .string()
    .trim()
    .url("File link must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export const submissionSchema = z.discriminatedUnion("source", [mhSchema, jeSchema]);

export function validateSubmission(body) {
  return submissionSchema.safeParse(body);
}
