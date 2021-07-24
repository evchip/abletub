import React from 'react'
import ReactHowler from 'react-howler'
import {Button} from "@chakra-ui/react"

class OnlyPlayPauseButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      playing: false
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
          src={['/audioFiles/Flumeish.mp3', 'sound.mp3']}
          playing={this.state.playing}
        />
        <Button onClick={this.handlePlay} colorScheme="teal" variant="solid" m="auto" ml={8}>Play</Button>
        <Button onClick={this.handlePause} colorScheme="teal" variant="solid" m="auto" ml={8}>Pause</Button>
      </div>
    )
  }
}

export default OnlyPlayPauseButton