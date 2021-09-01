import React from 'react'
import ReactHowler from 'react-howler'
import {Button, Box, IconButton, Icon } from "@chakra-ui/react"
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa"

class OnlyPlayPauseButton extends React.Component {
  constructor (props) {
    super(props)
    
    console.log(props)

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
      <div>
        <ReactHowler
          src={[this.props.audioURL, 'sound.mp3']}
          playing={this.state.playing}
        />
        {this.state.playing === true ? (
            <IconButton
              as={FaRegPauseCircle}
              mb={4}
              aria-label="FaRegPauseCircle"
              ml="auto"
              onClick={this.handlePause}
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
          ) 
         }
      </div>
    )
  }
}

export default OnlyPlayPauseButton