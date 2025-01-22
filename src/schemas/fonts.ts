import { z } from 'zod';

export const FontVariantSchema = z.enum([
	'100',
	'200',
	'300',
	'regular',
	'500',
	'600',
	'700',
	'800',
	'900',
	'100italic',
	'200italic',
	'300italic',
	'italic',
	'500italic',
	'600italic',
	'700italic',
	'800italic',
	'900italic',
]);

export const GoogleFontsResponseBodySchema = z.object({
	items: z.array(
		z.object({
			family: z.string(),
			variants: z.array(FontVariantSchema),
			files: z.record(FontVariantSchema, z.string().url()),
		})
	),
});
