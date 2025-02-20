import { z } from 'zod';
import { ImageMessageSchema } from './imageMessage';

export const PullConsumerMessageSchema = z
  .object({
    success: z.boolean(),
    errors: z.array(z.string()),
    result: z.object({
      message_backlog_count: z.number(),
      messages: z.array(z.object({ body: z.string().transform((str: string) => ImageMessageSchema.parse(JSON.parse(str))) })),
    }),
  });
