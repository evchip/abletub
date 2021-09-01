import React from 'react'
import ReactHowler from 'react-howler'
import {Button, Box } from "@chakra-ui/react"

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
        <Button onClick={this.handlePlay} colorScheme="teal" variant="solid" m="auto" ml={8}>Play</Button>
        <Button onClick={this.handlePause} colorScheme="teal" variant="solid" m="auto" ml={8}>Pause</Button>
      </div>
    )
  }
}

export default OnlyPlayPauseButton