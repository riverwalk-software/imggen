import { z } from 'zod';

export const ProtocolSchema = z.enum(['og', 'twitter']);
