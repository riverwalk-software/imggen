import { z } from 'zod';
import { LayoutSchema } from './layouts';

export const ImageMessageSchema = z
  .object({
    userData: z.object({
      userId: z.string(),
    }),
    imageMetadata: LayoutSchema,
    imageKey: z.string(),
  });
