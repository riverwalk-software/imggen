import { Hono } from 'hono';
import { initWasm } from '@resvg/resvg-wasm';
import wasmModule from './binaries/resvg.wasm';
import markupToVector from './lib/markupToVector';
import vectorToRaster from './lib/vectorToRaster';
import { z } from 'zod';
import createMarkup from './lib/createMarkup.js';
import { zValidator } from '@hono/zod-validator';
import { QueryParametersSchema } from './schemas/queryParameters';
import { HTTPException } from 'hono/http-exception';
import { LayoutSchema } from './schemas/layouts';

const app = new Hono<{ Bindings: Bindings }>();
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
await initWasm(wasmModule);

app.get('/', zValidator('query', QueryParametersSchema), async (c) => {
  const queryParameters = c.req.valid('query');
  const { configuration, fontFamily, fontVariant, layout, layoutIndex } = queryParameters;
  const parsedQueryParamaters = LayoutSchema.parse({
    discriminator: `${layout}${layoutIndex.toString()}`,
    data: queryParameters,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const markup = createMarkup(parsedQueryParamaters);
  const vector = await markupToVector(configuration, fontFamily, fontVariant, c.env.GOOGLE_FONTS, markup);
  const raster = vectorToRaster(vector);
  return c.body(raster, 200, {
    'Content-Type': 'image/png',
    'Access-Control-Allow-Origin': '*',
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
