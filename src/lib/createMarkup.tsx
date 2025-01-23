import { ReactNode } from 'satori';
import { LayoutSchema, Video1LayoutSchema } from '../schemas/layouts';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import { Article1LayoutSchema, Video1LayoutSchema } from '../schemas/layouts';
import { Schema } from '../types/Schema';

export default function (layout: z.infer<typeof LayoutSchema>, parsedQueryParameters: z.infer<Schema>): ReactNode {
	switch (layout) {
		case 'article1':
			return article1(parsedQueryParameters);
		case 'thumbnail1':
			return thumbnail1(parsedQueryParameters);
		default:
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			throw new HTTPException(400, `Invalid layout: ${layout}`);
	}
}

const article1 = ({
	title,
	authorName,
	authorImage,
	tag1,
	tag2,
	tag3,
	metadata1,
	metadata2,
	metadata3,
}: z.infer<typeof Article1LayoutSchema>): ReactNode => (
	<div
		style={{
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#fff',
			fontSize: 32,
			fontWeight: 600,
		}}
	>
		<svg width="75" viewBox="0 0 75 65" fill="#000" style={{ margin: '0 75px' }}>
			<path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
		</svg>
		<div style={{ marginTop: 40 }}>{title}</div>
	</div>
);

const thumbnail1 = ({ title }: z.infer<typeof Video1LayoutSchema>): ReactNode => (
	<div
		style={{
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#fff',
			fontSize: 32,
			fontWeight: 600,
		}}
	>
		<svg width="75" viewBox="0 0 75 65" fill="#000" style={{ margin: '0 75px' }}>
			<path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
		</svg>
		<div style={{ marginTop: 40 }}>{title}</div>
	</div>
);
