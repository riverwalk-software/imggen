import satori from 'satori';
import { OPEN_GRAPH_IMAGE_DIMENSIONS, TWITTER_IMAGE_DIMENSIONS } from '../constants/protocols';
import createMarkup from '../layouts/createMarkup.jsx';
import { FontVariantSchema, GoogleFontsResponseBodySchema } from '../schemas/fonts';
import { ProtocolSchema } from '../schemas/http';
import { ReactNode, SatoriOptions } from 'satori';
import MyError from '../types/MyError';
import { QueryParametersSchema } from '../schemas/queryParameters';

export default async function (apiKey: string, queryParameters: object): Promise<string> {
	const { fontFamily, fontVariant, protocol } = QueryParametersSchema.parse(queryParameters);
	const fontFamiliesResponse = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`);
	if (!fontFamiliesResponse.ok) {
		throw new MyError('Failed to fetch Google Fonts', 500);
	}

	const { items } = GoogleFontsResponseBodySchema.parse(await fontFamiliesResponse.json());

	const myItem = items.find((item) => item.family === fontFamily);
	if (myItem === undefined) {
		throw new MyError(`Font family "${fontFamily}" not found`, 404);
	}

	const fontFile: string = myItem.files[FontVariantSchema.parse(fontVariant)];
	// if (font.files[fontVariant] === undefined) {
	// 	throw new Error(`Font variant "${fontVariant}" not found`);
	// }

	const font = await fetch(fontFile);
	if (!font.ok) {
		throw new MyError(`Failed to fetch font file: ${fontFile}`, 500);
	}

	const fontData = await font.arrayBuffer();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const markup = (await createMarkup(fontData, fontFamily)) as ReactNode;
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
