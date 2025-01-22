import { z } from 'zod';

export const QueryParametersSchema = z.object({
	// authorImage: z.string(),
	// authorName: z.string(),
	// category: z.string(),
	// date: z.string(),
	fontFamily: z.string(),
	fontVariant: z.string(),
	// heroImage: z.string(),
	// minutesRead: z.string(),
	protocol: z.string(),
	// tags: z.string(),
	// title: z.string(),
});
