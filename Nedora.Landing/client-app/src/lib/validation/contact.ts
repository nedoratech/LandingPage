import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  projectType: z.enum(["newApp", "integration", "support", "unsure"]),
  engagement: z.enum(["fixed", "time", "unsure"]),
  message: z.string().min(10),
  timeline: z
    .enum(["asap", "oneToThree", "threeToSix", "exploring"])
    .optional(),
  privacy: z.literal(true),
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
