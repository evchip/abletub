import React from 'react';
import AudioFooter from './AudioFooter';
import NavBar from './NavBar';
import { Wrapper, WrapperVariant } from './Wrapper';

interface LayoutProps {
    variant?: WrapperVariant
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    variant
}) => {

    const songInfo = {audioURL: "f", title: "hi", artist: "me", trackId: 4}
    const playPause = false;

    return (
        <>
        <NavBar/>
        <Wrapper variant={variant}>
            {children}
        </Wrapper>
        {songInfo.audioURL !== "" ? (
        <AudioFooter
          streamURL={songInfo.audioURL}
          trackTitle={songInfo.title}
          artist={songInfo.artist}
          playPause={playPause}
          trackId={songInfo.trackId}
        />
      ) : null}
        </>
    )
}