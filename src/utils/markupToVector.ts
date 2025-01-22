import satori from 'satori';
import { OPEN_GRAPH_IMAGE_DIMENSIONS, TWITTER_IMAGE_DIMENSIONS } from '../constants/protocols';
import { FontVariantSchema, GoogleFontsResponseBodySchema } from '../schemas/fonts';
import { ProtocolSchema } from '../schemas/http';
import { SatoriOptions } from 'satori';
import { QueryParametersSchema } from '../schemas/queryParameters';
import { HTTPException } from 'hono/http-exception';

export default async function (markup, googleFontsApiKey: string, queryParameters: z.infer<typeof QueryParametersSchema>): Promise<string> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { fontFamily, fontVariant, protocol } = QueryParametersSchema.parse(queryParameters);
	const fontFamiliesResponse = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${googleFontsApiKey}`);
	if (!fontFamiliesResponse.ok) {
		throw new HTTPException(500, { message: 'Failed to fetch font list' });
	}

	const { items } = GoogleFontsResponseBodySchema.parse(await fontFamiliesResponse.json());

	const myItem = items.find((item) => item.family === fontFamily);
	if (myItem === undefined) {
		throw new HTTPException(404, { message: `No "${fontFamily}" not found` });
	}

	const fontFile: string = myItem.files[FontVariantSchema.parse(fontVariant)];
	// if (font.files[fontVariant] === undefined) {
	// 	throw new Error(`Font variant "${fontVariant}" not found`);
	// }

	const font = await fetch(fontFile);
	if (!font.ok) {
		throw new HTTPException(500, {
			message: `Failed to fetch font file for fontFamily: "${fontFamily}" and fontVariant: "${fontVariant}"
      `,
		});
	}

	const fontData = await font.arrayBuffer();
	return await satori(markup, {
		...(ProtocolSchema.parse(protocol) === 'og' ? OPEN_GRAPH_IMAGE_DIMENSIONS : TWITTER_IMAGE_DIMENSIONS),
		fonts: [
			{
				name: fontFamily,
				data: fontData,
			},
		],
	} as SatoriOptions);
}
