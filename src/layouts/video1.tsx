import { ReactNode } from 'react';
import { VideoLayoutSchema1 } from '../schemas/layouts';
import { z } from 'zod';

const buildMetadata = (metadata1: string | undefined, metadata2: string | undefined, metadata3: string | undefined) =>
  [metadata1, metadata2, metadata3].filter((metadata) => metadata !== undefined).join(' • ');

export default ({
  mainImage,
  mainText,
  mainTextColor = "white",
  flipped = false,
  secondaryText,
  secondaryTextColor = "red",
  backgroundImage,
  gradient,
  backgroundColor,
  backgroundOpacity,
}: z.infer<typeof VideoLayoutSchema1>['data']): ReactNode => (
  <div style={{ width: "1280px", height: "720px", display: "flex", backgroundSize: "cover", position: "relative" }}>
    <div style={{ position: "absolute", width: "100%", height: "100%", filter: "blur(4px)", backgroundImage: `url(${backgroundImage})` }}></div>
    {backgroundColor && backgroundOpacity && <div style={{ position: "absolute", width: "100%", height: "100%", filter: "blur(4px)", backgroundColor: backgroundColor, opacity: backgroundOpacity }}></div>}
    {gradient && <div style={{
      position: "absolute", width: "100%", height: "100%", filter: "blur(4px)",
      background: gradient,
    }}></div>}
    <div
      style={{
        display: 'flex',
        flexDirection: flipped ? "row-reverse" : "row",
        // flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4em',
      }}
    >
      <div style={{
        height: "100%",
        width: "50%",
        display: "flex",
        alignItems: flipped ? "flex-start" : "flex-end"
      }}><img src={mainImage} width="100%" height="100%" style={{ width: '100%', maxHeight: '100%', bottom: '0', transform: 'translateY(1%)', }} /></div>


      <div
        style={{
          height: '100%',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: flipped ? "flex-end" : 'flex-start',
          justifyContent: 'center',
          gap: '0',
          lineHeight: "",
          fontSize: 100, fontWeight: 600, color: "white"
        }}
      >
        <p style={{ color: mainTextColor }}>{mainText}</p>
        <p style={{ color: secondaryTextColor, fontSize: "120" }}>{secondaryText}</p>
      </div>
    </div>
  </div>
);
