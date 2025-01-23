import { z } from 'zod';
import { Article1LayoutSchema, Thumbnail1LayoutSchema } from '../schemas/layouts';

// export type Schema = typeof Article1LayoutSchema | typeof Thumbnail1LayoutSchema;

export type Schema = z.ZodEnum<[z.infer<typeof Article1LayoutSchema>, z.infer<typeof Thumbnail1LayoutSchema>]>;
