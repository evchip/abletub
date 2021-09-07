import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { createRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "utils/createUrqlClient";

type WaveFormPropTypes = {
  audioURL: string
}

class WaveForm extends React.Component<WaveFormPropTypes, { playing: boolean }> {
  constructor(props: WaveFormPropTypes) {
    super(props);

    this.state = {
      playing: false,
    };
  }


    //const track = document.querySelector("#track");
    
    componentDidMount() {
      this.waveform = WaveSurfer.create({
        barWidth: 3,
        cursorWidth: 1,
        container: '#waveform',
        backend: "WebAudio",
        height: 150,
        progressColor: "#ED5BFF",
        responsive: true,
        waveColor: "#1F4FFF",
        cursorColor: "transparent",
      });
  
      this.waveform.load(this.props.audioURL);
      // this.state.playing = false;
    }
      

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    return (
      <Box
        variant="small"
        className="waveform-cont"
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
      >
        {this.state.playing === true ? (
          <IconButton
            as={FaRegPauseCircle}
            mb={4}
            aria-label="FaRegPauseCircle"
            ml="5px"
            onClick={this.handlePlay}
            variant="solid"
          />
        ) : (
          <IconButton
            as={FaRegPlayCircle}
            mb={4}
            aria-label="FaRegPlayCircle"
            ml="5px"
            onClick={this.handlePlay}
            variant="solid"
          />
        )}
        <Box className="wave" ref={this.audioRef} id="waveform" width="90%" height="170px" />
        <audio id="track" src={this.props.audioURL}/>
      </Box>
    );
  }
}

export default WaveForm;
