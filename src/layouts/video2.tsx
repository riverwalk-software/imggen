import { ReactNode } from 'react';
import { VideoLayoutSchema1, VideoLayoutSchema2 } from '../schemas/layouts';
import { z } from 'zod';

const buildMetadata = (metadata1: string | undefined, metadata2: string | undefined, metadata3: string | undefined) =>
  [metadata1, metadata2, metadata3].filter((metadata) => metadata !== undefined).join(' • ');

const buildText = (maintText: string, mainTextColor: string, mainTextBackgroundColor: string): ReactNode => {
  const lines = maintText.split('\n');

  console.log(lines);

  return (
    <div
      style={{
        height: '100%',
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontSize: 100, fontWeight: 600, color: mainTextColor,
        transform: "rotate(-10deg)",
        overflow: "visible",
        zIndex: 10,
        position: "relative"
      }}
    >
      {lines.map((line, index) => (
        <p style={{
          backgroundColor: mainTextBackgroundColor, transform: "skewX(-10deg)", paddingLeft: "1rem", paddingRight: "1rem", marginTop: "0.1em",
          marginBottom: "0.1em", whiteSpace: 'nowrap'
        }}>{line}</p>
      ))}
    </div>
  );
}

export default ({
  mainImage,
  secondaryImage,
  mainText,
  mainTextColor = "white",
  mainTextBackgroundColor = "black",
  backgroundImage,
  backgroundColor,
  backgroundOpacity,
}: z.infer<typeof VideoLayoutSchema2>['data']): ReactNode => (
  <div style={{ height: '100%', width: '100%', display: "flex", backgroundSize: "cover", position: "relative" }}>
    {mainText && buildText(mainText, mainTextColor, mainTextBackgroundColor)}
  </div>
);


/*
* Test url:

http://localhost:8787/api/snapgen?mainImage=https%3A%2F%2Frockthejvm.com%2Flogos%2Frtjvm.png&secondaryImage=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F6132%2F6132220.png&backgroundImage=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1542831371-29b0f74f9713%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww&backgroundColor=black&backgroundOpacity=0.4&mainText=testing%0Abasic%20thumbnail%0Aimg&fontFamily=Roboto&fontVariant=regular&layout=video&layoutIndex=2&configuration=video

*/



/*

export default ({
  mainImage,
  secondaryImage,
  mainText,
  mainTextColor = "white",
  mainTextBackgroundColor = "black",
  backgroundImage,
  backgroundColor,
  backgroundOpacity,
}: z.infer<typeof VideoLayoutSchema2>['data']): ReactNode => (
  <div style={{ height: '100%', width: '100%', display: "flex", backgroundSize: "cover", position: "relative" }}>
    <div style={{ position: "absolute", width: "100%", height: "100%", filter: "blur(4px)", backgroundImage: `url(${backgroundImage})` }}></div>
    <div style={{ position: "absolute", width: "100%", height: "100%", filter: "blur(4px)", backgroundColor: backgroundColor, opacity: backgroundOpacity }}></div>
    <div
      style={{
        display: 'flex',
        flexDirection: "row-reverse",
        // flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

      }}
    >
      <div style={{
        height: "100%",
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        zIndex: -10,
        position: "relative"
      }}>
        <img src={mainImage} width="100%" style={{ width: '80%', position: "relative", zIndex: -10, maxHeight: '100%', marginLeft: "auto", marginRight: "auto", bottom: '0' }} />
        <img src={secondaryImage} style={{ position: "absolute", width: "10rem", top: "90%", left: "10%", transform: "translateY(-100%)" }} />
      </div>

      {mainText && buildText(mainText, mainTextColor, mainTextBackgroundColor)}
    </div>
  </div>
);

*/
