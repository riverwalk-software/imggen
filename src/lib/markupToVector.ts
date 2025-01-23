import satori from 'satori';
import { FontVariantSchema, GoogleFontsResponseBodySchema } from '../schemas/fonts';
import { ConfigurationSchema } from '../schemas/ConfigurationSchema';
import { SatoriOptions } from 'satori';
import { HTTPException } from 'hono/http-exception';

export default async function (
	markup: ReactNode,
	googleFontsApiKey: string,
	fontFamily: string,
	fontVariant: string,
	protocol: string
): Promise<string> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const fontFamiliesResponse = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${googleFontsApiKey}`);
	if (!fontFamiliesResponse.ok) {
		throw new HTTPException(500, { message: 'Failed to fetch font list' });
	}

	const { items } = GoogleFontsResponseBodySchema.parse(await fontFamiliesResponse.json());

	const myItem = items.find((item) => item.family === fontFamily);
	if (myItem === undefined) {
		throw new HTTPException(404, { message: `No '${fontFamily}' font family found` });
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
		// ...protocolToImageDimensions(ConfigurationSchema.parse(protocol)),
		fonts: [
			{
				name: fontFamily,
				data: fontData,
			},
		],
	} as SatoriOptions);
}
