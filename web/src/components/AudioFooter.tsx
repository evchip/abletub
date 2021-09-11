import { useGetAudioFileQuery } from "generated/graphql";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { PlayButton, Timer, Progress } from "react-soundplayer/components";
import { withCustomAudio } from "react-soundplayer/addons";
import { Flex, Text } from "@chakra-ui/react";

interface Props {
  streamURL: string;
  trackTitle: string;
  artist: string;
  playPause: boolean;
  trackId: number;
  togglePausePlayOnPost(postId: number): void;
}

const AudioPlayer = withCustomAudio((props) => {
    console.log(props)
  const { trackTitle, artist, playPause, playing, soundCloudAudio, track, trackId, togglePausePlayOnPost } = props;


  useEffect(() => {
    if (playPause) {
        soundCloudAudio.play();
    } else {
        soundCloudAudio.pause();
    }
  }, [playPause])

  const handleChange = () => {
    if (playing) {
        soundCloudAudio.pause();
    } else {
        soundCloudAudio.play();
    }
    togglePausePlayOnPost(trackId)
  }
  

  return (
    <Flex zIndex={60} position="sticky" bottom={0} bg="black" p={4} alignContent="center" justifyContent="space-between">
        <Flex alignItems="center">
      <PlayButton style={{ width: "20px", height: "20px", marginLeft:"2rem" }} {...props} onTogglePlay={() => handleChange()}/>
      <Text ml={8}>{trackTitle}</Text>
      <Text ml={8}>{artist}</Text>
      </Flex>
      <Flex alignItems="center" width="50%">
      <Progress
        className="progress-bar"
        innerClassName="rounded-left"
        value={(props.currentTime / props.duration) * 100 || 0}
        {...props}
      />
      </Flex>
    <Timer style={{ marginRight:"2rem" }} {...props} />
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
        togglePausePlayOnPost={this.props.togglePausePlayOnPost}
      />
    );
  }
}

export default AudioFooter;
