import { ReactNode } from 'satori';
import { z } from 'zod';
import { LayoutSchema } from '../schemas/layouts';
import article1 from '../layouts/article1.jsx';
import video1 from '../layouts/video1';

export default function (parameters: z.infer<LayoutSchema>): ReactNode {
  const parsedParameters = LayoutSchema.parse(parameters);
  switch (parsedParameters.discriminator) {
    case 'article1':
      return article1(parsedParameters.data);
    case 'video1':
      return video1(parsedParameters.data);
    default:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      throw new HTTPException(400, { message: 'Invalid layout' });
  }
}
