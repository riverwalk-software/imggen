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
      mainTextColor: z.string().optional(),
      flipped: z.string().optional(), // z.string().optional().transform((value) => value === 'true'),
      secondaryText: z.string().max(15),
      secondaryTextColor: z.string().optional(),
      backgroundImage: z.string().url(),
      gradient: z.string().optional(),
      backgroundColor: z.string().optional(),
      backgroundOpacity: z.string().optional(),
    })
    .partial(),
});

export const VideoLayoutSchema2 = z.object({
  discriminator: z.literal(`${layoutKeys.enum.video}2`),
  data: z
    .object({
      mainImage: z.string().url(),
      secondaryImage: z.string().url(),
      mainText: z.string().max(30),
      mainTextColor: z.string().optional(),
      mainTextBackgroundColor: z.string().optional(),
      backgroundImage: z.string().url(),
      backgroundColor: z.string().optional(),
      backgroundOpacity: z.string().optional(),
    })
    .partial(),
});

const VideoLayoutSchemas = [
  VideoLayoutSchema1,
  VideoLayoutSchema2,
] as const;

export const LayoutSchema = z.discriminatedUnion('discriminator', [...ArticleLayoutSchemas, ...VideoLayoutSchemas]);
