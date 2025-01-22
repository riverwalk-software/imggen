import { Hono } from 'hono';
import { initWasm } from '@resvg/resvg-wasm';
import wasmModule from './binaries/resvg.wasm';
import markupToVector from './utils/markupToVector';
import vectorToRaster from './utils/vectorToRaster';

const app = new Hono<{ Bindings: Env }>();
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
await initWasm(wasmModule);

// app.post('/', zValidator('json', RequestBodySchema), async (c) => {
// 	const { title, description, logo, fontFamily, fontVariant, protocol } = c.req.valid('json');
// 	const vector = await markupToVector(c.env.GOOGLE_FONTS, fontFamily, fontVariant, protocol);
// 	const raster = await vectorToRaster(vector);
// 	return c.body(raster, 200, {
// 		'Content-Type': 'image/png',
// 	});
// });

app.get('/', async (c) => {
	const { authorImage, authorName, category, date, fontFamily, fontVariant, heroImage, minutesRead, protocol, tags, title } = c.req.query();
	const vector = await markupToVector(c.env.GOOGLE_FONTS, fontFamily, fontVariant, protocol);
	const raster = vectorToRaster(vector);
	return c.body(raster, 200, {
		'Content-Type': 'image/png',
	});
});

export default app;
