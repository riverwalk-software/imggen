import satori from 'satori';
import { OPEN_GRAPH_IMAGE_DIMENSIONS, TWITTER_IMAGE_DIMENSIONS } from '../constants/protocols';
import createMarkup from '../layouts/createMarkup.jsx';
import { FontVariantSchema, GoogleFontsResponseBodySchema } from '../schemas/fonts';
import { ProtocolSchema } from '../schemas/http';
import { ReactNode, SatoriOptions } from 'satori';

export default async function (
	apiKey: string,
	fontFamily: string,
	fontVariant: z.infer<typeof FontVariantSchema>,
	protocol: z.infer<typeof ProtocolSchema>
): Promise<string> {
	const fontFamiliesResponse = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`);
	if (!fontFamiliesResponse.ok) {
		throw new Error('Failed to fetch Google Fonts');
	}

	const { items } = GoogleFontsResponseBodySchema.parse(await fontFamiliesResponse.json());

	const myItem = items.find((item) => item.family === fontFamily);
	if (myItem === undefined) {
		throw new Error(`Font family "${fontFamily}" not found`);
	}

	const fontFile: string = myItem.files[FontVariantSchema.parse(fontVariant)];
	// if (font.files[fontVariant] === undefined) {
	// 	throw new Error(`Font variant "${fontVariant}" not found`);
	// }

	const font = await fetch(fontFile);
	if (!font.ok) {
		throw new Error(`Failed to fetch font file: ${fontFile}`);
	}

	const fontData = await font.arrayBuffer();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const markup = (await createMarkup(fontData, fontFamily)) as ReactNode;
	return await satori(markup, {
		...(protocol === 'Open Graph' ? OPEN_GRAPH_IMAGE_DIMENSIONS : TWITTER_IMAGE_DIMENSIONS),
		fonts: [
			{
				name: fontFamily,
				data: fontData,
			},
		],
	} as SatoriOptions);
}
