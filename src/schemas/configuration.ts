import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';

export const ConfigurationSchema = z.enum(['squareAdvertisement', 'verticalAdvertisement', 'banner', 'og', 'twitter', 'thumbnail', 'litest']);
type Configuration = z.infer<typeof ConfigurationSchema>;
interface ImageResolution {
  width: number;
  height: number;
}
export function configurationToImageResolution(configuration: Configuration): ImageResolution {
  switch (configuration) {
    case 'squareAdvertisement':
      return { width: 1080, height: 1080 };
    case 'verticalAdvertisement':
      return { width: 1080, height: 1350 };
    case 'banner':
      return { width: 1200, height: 628 };
    case 'og':
      return { width: 1200, height: 630 };
    case 'twitter':
      return { width: 1200, height: 675 };
    case 'thumbnail':
      return { width: 1500, height: 500 };
    case 'litest':
      return { width: 1600, height: 400 };
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new HTTPException(500, { message: `Unsupported configuration: ${configuration}` });
  }
}
