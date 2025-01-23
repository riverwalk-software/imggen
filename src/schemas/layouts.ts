import { z } from 'zod';

export const LayoutSchema = z.enum(['article1', 'thumbnail1']);

export const Article1LayoutSchema = z.object({
	title: z.string().optional(),
	authorName: z.string().optional(),
	authorImage: z.string().url().optional(),
	tag1: z.string().optional(),
	tag2: z.string().optional(),
	tag3: z.string().optional(),
	metadata1: z.string().optional(),
	metadata2: z.string().optional(),
	metadata3: z.string().optional(),
});

export const Thumbnail1LayoutSchema = z.object({
	title: z.string().optional(),
});
