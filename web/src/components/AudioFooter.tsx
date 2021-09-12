import { useGetAudioFileQuery } from "generated/graphql";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { PlayButton, Timer, Progress } from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";
import { Flex, Text } from "@chakra-ui/react";
import { useSpring, animated, Spring } from "react-spring";

interface Props {
  streamURL: string;
  trackTitle: string;
  artist: string;
  playPause: boolean;
  trackId: number;
}

const AudioPlayer = withCustomAudio((props) => {
  const { trackTitle, artist, playPause, playing, soundCloudAudio, track } =
    props;

  useEffect(() => {
    if (playPause) {
      soundCloudAudio.play();
    } else {
      soundCloudAudio.pause();
    }
  }, [playPause]);

  const handleChange = () => {
    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play();
    }
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
      <Flex alignItems="center">
        <PlayButton
          style={{ width: "20px", height: "20px", marginLeft: "1rem" }}
          {...props}
          onTogglePlay={() => handleChange()}
        />
        <Text
          ml={8}
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
      <Flex alignItems="center" width={["20%", "30%", "60%"]}>
        <Progress
          className="progress-bar"
          innerClassName="rounded-left"
          value={(props.currentTime / props.duration) * 100 || 0}
          {...props}
        />
      </Flex>
      <Timer style={{ marginRight: "2rem", marginLeft:"2rem" }} {...props} />
    </Flex>
  );
});

class AudioFooter extends React.Component<Props> {
  render() {
    return (
      <AudioPlayer
        streamUrl={this.props.streamURL}
        trackTitle={this.props.trackTitle}
        artist={this.props.artist}
        playPause={this.props.playPause}
        playing={this.props.playPause}
      />
    );
  }
}

export default AudioFooter;
