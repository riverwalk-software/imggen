import { Hono } from 'hono';
import { initWasm } from '@resvg/resvg-wasm';
import wasmModule from './binaries/resvg.wasm';
import markupToVector from './lib/markupToVector';
import vectorToRaster from './lib/vectorToRaster';
import { string, z } from 'zod';
import createMarkup from './lib/createMarkup.js';
import { zValidator } from '@hono/zod-validator';
import { QueryParametersSchema } from './schemas/queryParameters';
import { HTTPException } from 'hono/http-exception';
import { LayoutSchema } from './schemas/layouts';
import { DurableObject } from "cloudflare:workers";

export class StoredImage extends DurableObject {

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async putImage(value: string): Promise<string> {
    console.log("working 5")
    const existingImage: string | undefined = await this.ctx.storage.get("image");
    console.log("working 6")

    if (existingImage) {
      return existingImage;
    }

    await this.ctx.storage.put("image", value);

    return value;
  }

  async getImage(): Promise<string | undefined> {
    return this.ctx.storage.get("image");
  }

  async deleteImage(): Promise<void> {
    await this.ctx.storage.delete("image");
  }
}

export interface Env {
  IMAGE_QUEUE_PUBLISH: Queue<any>;
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api/snapgen');
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
await initWasm(wasmModule);

app.get('/', zValidator('query', QueryParametersSchema), async (c) => {
  console.log("tesing 1");
  const queryParameters = c.req.valid('query');
  const { configuration, fontFamily, fontVariant, layout, layoutIndex } = queryParameters;
  const parsedQueryParamaters = LayoutSchema.parse({
    discriminator: `${layout}${layoutIndex.toString()}`,
    data: queryParameters,
  });
  console.log("tesing 2");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const markup = createMarkup(parsedQueryParamaters);
  console.log("tesing 3");

  const vector = await markupToVector(configuration, fontFamily, fontVariant, c.env.GOOGLE_FONTS, markup);
  console.log("tesing 4");

  const raster = vectorToRaster(vector);
  console.log("tesing 5");

  return c.body(raster, 200, {
    'Content-Type': 'image/png',
    'Access-Control-Allow-Origin': '*',
  });
});

app.post('/', zValidator('query', QueryParametersSchema), async (c) => {
  const userId = "wkenend1";

  const queryParameters = c.req.valid('query');
  const { configuration, fontFamily, fontVariant, layout, layoutIndex } = queryParameters;
  const parsedQueryParamaters = LayoutSchema.parse({
    discriminator: `${layout}${layoutIndex.toString()}`,
    data: queryParameters,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const markup = createMarkup(parsedQueryParamaters);

  const vector = await markupToVector(configuration, fontFamily, fontVariant, c.env.GOOGLE_FONTS, markup);

  const imageKey = `${userId}:${c.req.url.split('?')[1]}`;

  console.log("working1");
  const imageId = c.env.SVG_CACHE.idFromName(imageKey);
  console.log("working2");

  const obj = c.env.SVG_CACHE.get(imageId);

  console.log("working3");

  await obj.putImage(vector);

  await c.env.IMAGE_QUEUE_PUBLISH.send({ userData: { username: "wkenned1" }, imageMetadata: parsedQueryParamaters, imageKey: imageKey });

  return c.body(vector, 200, {
    'Content-Type': 'image/svg+xml',
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

export default {
  fetch: app.fetch,
  async queue(batch: MessageBatch<any>, env: Environment) {
    console.log(`MESSAGE: ${JSON.stringify(batch.messages[0].body)}`);
    const body = batch.messages[0].body;

    const imageId = env.SVG_CACHE.idFromName(body.imageKey);
    const obj = env.STRING_STORE.get(imageId);

    const image = await obj.getImage();

    const encoder = new TextEncoder();
    const imageData = encoder.encode(image);

    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "image/svg+xml", // Change if needed (e.g., "image/png")
      },
      body: imageData, // Send the raw binary data
    });

    console.log(`RESPONSE: ${response.status}`);
  },
}
