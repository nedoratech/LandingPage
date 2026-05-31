import { z } from "zod";

const sharedFormFields = {
  privacy: z.literal(true),
  website: z.string().max(0).optional(),
};

export const quoteFormSchema = z.object({
  formType: z.literal("quote"),
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  projectType: z.enum(["newApp", "integration", "support", "unsure"]),
  engagement: z.enum(["fixed", "time", "unsure"]),
  message: z.string().min(10),
  timeline: z
    .enum(["asap", "oneToThree", "threeToSix", "exploring"])
    .optional(),
  ...sharedFormFields,
});

export const contactMessageFormSchema = z.object({
  formType: z.literal("contact"),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
  ...sharedFormFields,
});

export const contactSchema = z.discriminatedUnion("formType", [
  quoteFormSchema,
  contactMessageFormSchema,
]);

export type ContactFormData = z.infer<typeof contactSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type ContactMessageFormData = z.infer<typeof contactMessageFormSchema>;
