import { z } from 'zod';

export default z.object({
	height: z.number(),
	width: z.number(),
});
