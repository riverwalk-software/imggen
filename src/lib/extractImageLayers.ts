import { z } from 'zod';
import { LayoutSchema, VideoLayoutSchema2 } from '../schemas/layouts';
import article1 from '../layouts/article1.jsx';
import video1 from '../layouts/video1';
import { InputImage } from './joinImages';

const video2 = ({
  mainImage,
  secondaryImage,
  backgroundImage,
  backgroundColor,
  backgroundOpacity,
}: z.infer<typeof VideoLayoutSchema2>['data']): InputImage[] => {
  return [backgroundImage, mainImage, secondaryImage].filter((image) => image !== undefined) as InputImage[];
}

export default function (parameters: z.infer<LayoutSchema>): InputImage[] {
  const parsedParameters = LayoutSchema.parse(parameters);
  switch (parsedParameters.discriminator) {
    case 'article1':
    case 'video1':
    case 'video2':
      return video2(parsedParameters.data);
    default:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      throw new HTTPException(400, { message: 'Invalid layout' });
  }
}
