import { z } from 'zod';
import { Article1LayoutSchema, LayoutSchema, Thumbnail1LayoutSchema } from '../schemas/layouts';
import { Schema } from '../types/Schema';

// export const layoutRecord: Record<z.infer<typeof LayoutSchema>, Schema> = {
// 	article1: Article1LayoutSchema,
// 	thumbnail1: Thumbnail1LayoutSchema,
// };

export const layoutRecord = new Map<z.infer<typeof LayoutSchema>, Schema>([
	['article1', Article1LayoutSchema],
	['thumbnail1', Thumbnail1LayoutSchema],
]);
