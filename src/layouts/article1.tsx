import { ReactNode } from 'satori';
import { ArticleLayoutSchema1 } from '../schemas/layouts';
import { z } from 'zod';

const buildMetadata = (metadata1: string | undefined, metadata2: string | undefined, metadata3: string | undefined) => {
  if (!metadata1 && !metadata2 && !metadata3) {
    return null;
  }

  return [metadata1, metadata2, metadata3].filter((metadata) => metadata !== undefined).join(' • ');
}

const logoOnly = (
  authorImage: string | undefined,
  authorName: string | undefined,
  metadata1: string | undefined,
  metadata2: string | undefined,
  metadata3: string | undefined,
  tag1: string | undefined,
  tag2: string | undefined,
  tag3: string | undefined,
  title: string | undefined
) => {
  return !authorImage && !authorName && !metadata1 && !metadata2 && !metadata3 && !tag1 && !tag2 && !tag3 && !title;
};

export default ({
  authorImage,
  authorName,
  logo,
  metadata1,
  metadata2,
  metadata3,
  tag1,
  tag2,
  tag3,
  title,
}: z.infer<typeof ArticleLayoutSchema1>['data']): ReactNode => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4em',
    }}
  >
    {logo && <img src={logo} style={{ width: "20em", height: "20em" }} />}

    {!logoOnly(authorImage, authorName, metadata1, metadata2, metadata3, tag1, tag2, tag3, title) && <div
      style={{
        height: '100%',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '1em',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1.2em',
          alignItems: 'center',
        }}
      >
        {authorImage && <img style={{ width: '4em' }} src={authorImage} />}
        {authorName && <span style={{ fontSize: '20px' }}>{authorName}</span>}
      </div>
      {title && <div style={{ fontSize: 48, fontWeight: 600 }}>{title}</div>}
      {buildMetadata(metadata1, metadata2, metadata3) && <div
        style={{
          fontSize: 20,
          fontWeight: 0,
        }}
      >
        {buildMetadata(metadata1, metadata2, metadata3)}
      </div>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5em',
          fontSize: '24px',
        }}
      >
        {tag1 && tag1 !== "" && <div style={{ backgroundColor: '#e0e8ff', padding: '5px 10px 5px 10px', borderRadius: '15px' }}>{tag1}</div>}
        {tag2 && tag2 !== "" && <div style={{ backgroundColor: '#e0e8ff', padding: '5px 10px 5px 10px', borderRadius: '15px' }}>{tag2}</div>}
        {tag3 && tag3 !== "" && <div style={{ backgroundColor: '#e0e8ff', padding: '5px 10px 5px 10px', borderRadius: '15px' }}>{tag3}</div>}
      </div>
    </div>}
  </div>
);
