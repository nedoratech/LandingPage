import { z } from "zod";

const sharedPayloadFields = {
  locale: z.enum(["en", "ro"]).optional(),
  website: z.string().max(0).optional(),
};

export const quotePayloadSchema = z.object({
  formType: z.literal("quote"),
  name: z.string().min(2).max(200),
  email: z.string().email().max(320),
  company: z.string().min(2).max(200),
  projectType: z.enum(["newApp", "integration", "support", "unsure"]),
  engagement: z.enum(["fixed", "time", "unsure"]),
  message: z.string().min(10).max(8000),
  timeline: z
    .enum(["asap", "oneToThree", "threeToSix", "exploring"])
    .optional(),
  ...sharedPayloadFields,
});

export const contactMessagePayloadSchema = z.object({
  formType: z.literal("contact"),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email().max(320),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(8000),
  ...sharedPayloadFields,
});

export const contactPayloadSchema = z.discriminatedUnion("formType", [
  quotePayloadSchema,
  contactMessagePayloadSchema,
]);

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
export type QuotePayload = z.infer<typeof quotePayloadSchema>;
export type ContactMessagePayload = z.infer<typeof contactMessagePayloadSchema>;
