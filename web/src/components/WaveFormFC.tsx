import { Box, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react'
import { FaRegPauseCircle, FaRegPlayCircle } from 'react-icons/fa';
import WaveSurfer from 'wavesurfer.js'

interface Props {
    audioURL: string
}

const WaveFormFC: React.FC<Props> = ({audioURL}) => {
    const containerRef = useRef()
    const waveSurferRef = useRef({
      isPlaying: () => false,
    })
    const [isPlaying, toggleIsPlaying] = useState(false)
  
    useEffect(() => {
      const waveSurfer = WaveSurfer.create({
        container: containerRef.current,
      })
      waveSurfer.load(audioURL)
      waveSurfer.on('ready', () => {
        waveSurferRef.current = waveSurfer
      })
  
      return () => {
        waveSurfer.destroy()
      }
    }, [audioURL])
  
    return (
      <>
      <button onClick={() => { 
          waveSurferRef.current.playPause()
          toggleIsPlaying(waveSurferRef.current.isPlaying())
          }} type="button">
        {isPlaying ? 'pause' : 'play'}
      </button>
      <div ref={containerRef} />
      </>
    ) 
}

export default WaveFormFC
