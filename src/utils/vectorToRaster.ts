import { Resvg } from '@resvg/resvg-wasm';

export default function (vector: string): Uint8Array {
	const resvg = new Resvg(vector);
	const pngData = resvg.render();
	return pngData.asPng();
}
