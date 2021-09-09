import React from 'react'
import ReactHowler from 'react-howler'
import {Button, Box, IconButton, Icon } from "@chakra-ui/react"
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa"
import { useGetAudioFileQuery, useSetAudioFileMutation } from 'generated/graphql'

interface PlayPauseButtonProps {
  audioURL: string;
  postId: number;
  assignPostPlaying(postId: number): any
}

class PlayPauseButton extends React.Component<PlayPauseButtonProps> {
  constructor (props: PlayPauseButtonProps) {
    super(props)

    this.state = {
      playing: false,
      audioURL: props.audioURL,
      getStatus: () => {console.log('this state', this.state)}
    }

    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }



  handlePlay () {
      this.setState({
        playing: true
      })
  }

  handlePause () {
    this.setState({
      playing: false
    })
  }

  render () {
    return (
      <Box >
        <ReactHowler
          src={[this.props.audioURL]}
          playing={this.state.playing}
        />
        {this.state.playing === true ? (
            <IconButton
              borderRadius="15px"
              as={FaRegPauseCircle}
              mb={4}
              aria-label="FaRegPauseCircle"
              ml="auto"
              onClick={this.handlePause}
              variant="ghost"
              size="lg"
            />
          ) : (
            <IconButton
              borderRadius="15px"
              as={FaRegPlayCircle}
              mb={4}
              aria-label="FaRegPlayCircle"
              ml="auto"
              onClick={this.handlePlay}
              variant="ghost"
              size="lg"
            />
          ) 
         }
      </Box>
    )
  }
}

export default PlayPauseButton