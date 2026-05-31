import { z } from "zod";

export const contactPayloadSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email().max(320),
  company: z.string().min(2).max(200),
  projectType: z.enum(["newApp", "integration", "support", "unsure"]),
  engagement: z.enum(["fixed", "time", "unsure"]),
  message: z.string().min(10).max(8000),
  timeline: z
    .enum(["asap", "oneToThree", "threeToSix", "exploring"])
    .optional(),
  locale: z.enum(["en", "ro"]).optional(),
  website: z.string().max(0).optional(),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
