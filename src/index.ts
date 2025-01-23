import { Hono } from 'hono';
import { initWasm } from '@resvg/resvg-wasm';
import wasmModule from './binaries/resvg.wasm';
import markupToVector from './utils/markupToVector';
import vectorToRaster from './utils/vectorToRaster';
import { z } from 'zod';
import createMarkup from './layouts/createMarkup.jsx';
import { ReactNode } from 'satori';
import { zValidator } from '@hono/zod-validator';
import { QueryParametersSchema } from './schemas/queryParameters';
import { HTTPException } from 'hono/http-exception';
import { layoutRecord } from './utils/layoutRecord';

const app = new Hono<{ Bindings: Bindings }>();
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
await initWasm(wasmModule);

app.get('/', zValidator('query', QueryParametersSchema), async (c) => {
	const { fontFamily, fontVariant, layout, protocol } = c.req.valid('query');
	const queryParameters = c.req.query();
	const SelectedLayoutSchema = layoutRecord.get(layout);
	const parsedQueryParamaters = SelectedLayoutSchema.parse(queryParameters);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const markup = (await createMarkup(layout, parsedQueryParamaters)) as ReactNode;
	const vector = await markupToVector(markup, c.env.GOOGLE_FONTS, fontFamily, fontVariant, protocol);
	const raster = vectorToRaster(vector);
	return c.body(raster, 200, {
		'Content-Type': 'image/png',
	});
});

app.onError((error, c) => {
	if (error instanceof z.ZodError) {
		return c.json({ error: error.issues }, 400);
	} else if (error instanceof HTTPException) {
		return c.json({ error: error.message }, error.status);
	} else if (error instanceof Error) {
		return c.json({ error: error.message }, 500);
	} else {
		return c.json({ error: 'Unknown error' }, 500);
	}
});

export default app;
