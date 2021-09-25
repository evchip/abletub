import React, { useEffect } from "react";
let { PlayButton, Timer, Progress } = require("react-soundplayer/components");
let { withCustomAudio } = require("react-soundplayer/addons");
import { Flex, Text } from "@chakra-ui/react";

interface Props {
  streamUrl: string;
  title: string;
  artist: string;
  isPlaying: boolean;
  trackId: number;
}

const AudioPlayer = withCustomAudio((props: any) => {
  const { streamUrl, trackTitle, artist, isPlaying, playing, soundCloudAudio, trackId} =
    props;

    const songInfo = {
      title: trackTitle,
      artist,
      streamUrl,
      trackId,
      isPlaying
    };

  useEffect(() => {

    if (isPlaying) {
      soundCloudAudio.play();
    } else {
      soundCloudAudio.pause();
    }
  }, [isPlaying, trackId]);

  const handleChange = () => {
    if (playing) {
      soundCloudAudio.pause();
      songInfo.isPlaying = false;
    } else {
      soundCloudAudio.play();
      songInfo.isPlaying = true;
    }
    // setTrack(songInfo)
  };

  return (
    <Flex
      zIndex={60}
      position="sticky"
      bottom={0}
      bg="black"
      p={4}
      alignContent="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center" >
        <PlayButton
          style={{ width: "20px", height: "20px", marginLeft: "1rem" }}
          {...props}
          onTogglePlay={() => handleChange()}
        />
        <Flex direction={[ "column", "row"]}>
        <Text
          ml={4}
          width="10rem"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {trackTitle}
        </Text>
        <Text
          ml={4}
          width="10rem"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {artist}
        </Text>
        </Flex>
      </Flex>
      <Flex alignItems="center" width={["20%", "30%", "60%"]}>
        <Progress
          className="progress-bar"
          innerClassName="rounded-left"
          value={(props.currentTime / props.duration) * 100 || 0}
          {...props}
        />
      </Flex>
      <Timer style={{ marginRight: "2rem", marginLeft: "2rem" }} {...props} />
    </Flex>
  );
});

class AudioFooter extends React.Component<Props> {
  

  render() {
    return (
      <AudioPlayer
        streamUrl={this.props.streamUrl}
        trackTitle={this.props.title}
        artist={this.props.artist}
        isPlaying={this.props.isPlaying}
        trackId={this.props.trackId}
      />
    );
  }
}

export default AudioFooter;