import { z } from 'zod';

export const layoutKeys = z.enum(['article', 'video']);

export const ArticleLayoutSchema1 = z.object({
	discriminator: z.literal(`${layoutKeys.enum.article}1`),
	data: z
		.object({
			authorImage: z.string().url(),
			authorName: z.string(),
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

const VideoLayoutSchemas = [
	z.object({
		discriminator: z.literal(`${layoutKeys.enum.video}1`),
		data: z
			.object({
				videoTitle: z.string(),
			})
			.partial(),
	}),
	z.object({
		discriminator: z.literal(`${layoutKeys.enum.video}2`),
		data: z
			.object({
				authorName: z.string(),
			})
			.partial(),
	}),
] as const;

export const LayoutSchema = z.discriminatedUnion('discriminator', [...ArticleLayoutSchemas, ...VideoLayoutSchemas]);
