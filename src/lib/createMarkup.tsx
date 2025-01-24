import { ReactNode } from 'satori';
import { z } from 'zod';
import { LayoutSchema } from '../schemas/layouts';
import article1 from '../layouts/article1.jsx';

export default function (parameters: z.infer<LayoutSchema>): ReactNode {
	const parsedParameters = LayoutSchema.parse(parameters);
	switch (parsedParameters.discriminator) {
		case 'article1':
			return article1(parsedParameters.data);
		case 'video1':
		case 'video2':
		default:
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			throw new HTTPException(400, { message: 'Invalid layout' });
	}
}
