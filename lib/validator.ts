import * as z from "zod";

export const raidFormSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters."),
  description: z
    .string()
    .min(4, "Description must be at least 4 characters.")
    .max(1000, "Description must be less than 1000 characters."),
  environment: z
    .string()
    .min(4, "Environment must be at least 4 characters.")
    .max(100, "Environment must be less than 100 characters."),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFeatured: z.boolean(),
  url: z.string().url(),
});
