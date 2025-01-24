import { z } from 'zod';
import { ConfigurationSchema } from './configuration';
import { FontVariantSchema } from './fonts';
import { layoutKeys } from './layouts';

export const QueryParametersSchema = z
	.object({
		configuration: ConfigurationSchema,
		fontFamily: z.string(),
		fontVariant: FontVariantSchema,
		layout: layoutKeys,
		layoutIndex: z.coerce.number().int().positive(),
	})
	.passthrough();
