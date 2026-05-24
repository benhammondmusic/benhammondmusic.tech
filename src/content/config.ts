import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
  }),
});

export const collections = { blog };
