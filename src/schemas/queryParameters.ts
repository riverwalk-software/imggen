import { z } from 'zod';
import { LayoutSchema } from './layouts';
import { FontVariantSchema } from './fonts';
import { ProtocolSchema } from './protocol';

export const QueryParametersSchema = z.object({
	fontFamily: z.string(),
	fontVariant: FontVariantSchema,
	protocol: ProtocolSchema,
	layout: LayoutSchema,
});
