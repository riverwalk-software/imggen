import { z } from 'zod';

export const layoutKeys = z.enum(['article', 'video']);

export const ArticleLayoutSchema1 = z.object({
  discriminator: z.literal(`${layoutKeys.enum.article}1`),
  data: z
    .object({
      authorImage: z.string().url(),
      authorName: z.string(),
      logo: z.string().url(),
      metadata1: z.string(),
      metadata2: z.string(),
      metadata3: z.string(),
      tag1: z.string(),
      tag2: z.string(),
      tag3: z.string(),
      title: z.string(),
    })
    .partial(),
});

const ArticleLayoutSchemas = [ArticleLayoutSchema1] as const;

export const VideoLayoutSchema1 = z.object({
  discriminator: z.literal(`${layoutKeys.enum.video}1`),
  data: z
    .object({
      mainImage: z.string().url(),
      mainText: z.string().max(30),
      secondaryText: z.string().max(15),
      backgroundImage: z.string().url(),
      gradient: z.string().optional(),
      backgroundColor: z.string().optional(),
      backgroundOpacity: z.string().optional(),
    })
    .partial(),
});

const VideoLayoutSchemas = [
  VideoLayoutSchema1,
] as const;

export const LayoutSchema = z.discriminatedUnion('discriminator', [...ArticleLayoutSchemas, ...VideoLayoutSchemas]);
