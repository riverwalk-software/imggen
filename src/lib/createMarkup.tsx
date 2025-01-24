import { ReactNode } from 'satori';
import { z } from 'zod';
import { HTTPException } from 'hono/http-';
import { LayoutSchema } from '../schemas/layouts';

export default function (parameters: z.infer<LayoutSchema>): ReactNode {
	return article1(parameters);
	// const parsedParameters = LayoutSchema.parse(parameters);
	// switch (parsedParameters) {
	// 	case 'article1':
	// 		return article1(parsedParameters);
	// 	case 'video1':
	// 		return video1(parsedParameters);
	// 	case 'video2':
	// 		return video2(parsedParameters);
	// 	default:
	// 		throw new HTTPException(400, { message: 'Invalid layout' });
	// }
}

const article1 = ({
	authorImage,
	authorName,
	metadata1,
	metadata2,
	metadata3,
	tag1,
	tag2,
	tag3,
	title,
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

const video1 = ({
	authorImage,
	authorName,
	metadata1,
	metadata2,
	metadata3,
	tag1,
	tag2,
	tag3,
	title,
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

const video2 = ({
	authorImage,
	authorName,
	metadata1,
	metadata2,
	metadata3,
	tag1,
	tag2,
	tag3,
	title,
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
