import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    translations: z.object({
      en: z.string().optional(),
      es: z.string().optional(),
    }),
  }),
});

export const collections = { blog }