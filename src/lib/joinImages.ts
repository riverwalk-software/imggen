import merge from 'merge-img';

export declare type InputImage = Buffer | string | ImageSrc;
export declare type ImageSrc = {
  offsetX?: number;
  offsetY?: number;
  src: InputImage;
};

export default async function Example(images: InputImage[]): Promise<any> {
  const img = await merge(images);
  return await img.png().toBuffer({ resolveWithObject: true });
}
