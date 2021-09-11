import React from 'react'
import ReactHowler from 'react-howler'
import {Button, Box, IconButton, Icon } from "@chakra-ui/react"
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa"
import { useGetAudioFileQuery, useSetAudioFileMutation, PostSnippetFragment } from 'generated/graphql'

interface PlayPauseButtonProps {

  post: PostSnippetFragment;
  assignPostPlaying(postId: string, creator: string, playPause: boolean): any
}

class PlayPauseButton extends React.Component<PlayPauseButtonProps> {
  constructor (props: PlayPauseButtonProps) {
    super(props)

    this.state = {
      playing: false,
    }

    // this.props.assignPostPlaying = this.props.assignPostPlaying.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }


  handlePlay () {
    this.props.assignPostPlaying(this.props.post.audioURL, this.props.creator, this.state.playing)
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