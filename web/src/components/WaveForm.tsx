import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { PureComponent } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";


class WaveForm extends React.Component {
    constructor(props) {
        super(props);
     
      }
  state = {
    playing: false,
  };

  componentDidMount() {
    const track = document.querySelector("#track");
    const waveform = document.querySelector("#waveform");

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      height: 150,
      progressColor: "#ED5BFF",
      responsive: true,
      waveColor: "#1F4FFF",
      cursorColor: "transparent",
    });

    this.waveform.load(
      this.props.audioURL
    );
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

    return (
      <Flex
        className="waveform-cont"
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
        border="0px"
        boxShadow="none"
        borderWidth={0}
        m={0}
        p={0}
      >
        {this.state.playing === true ? (
          <IconButton
            as={FaRegPauseCircle}
            mb={4}
            aria-label="FaRegPauseCircle"
            ml="auto"
            onClick={this.handlePlay}
            variant="solid"
          />
        ) : (
          <IconButton
            as={FaRegPlayCircle}
            mb={4}
            aria-label="FaRegPlayCircle"
            ml="auto"
            onClick={this.handlePlay}
            variant="solid"
          />
        )}
        <Box className="wave" id="waveform" width="90%" height="170px" />
      </Flex>
    );
  }
}

export default WaveForm;
