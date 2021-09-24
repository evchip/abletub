import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css'
import  TrackContext, {defaultTrack}  from '../utils/trackContext';
import { useState } from 'react';
import FooterWrapper from '../components/FooterWrapper'

function MyApp({ Component, pageProps }: any) {

  const defaultTrack = {
    title: "",
    artist: "",
    streamUrl: "",
    trackId: 0,
    isPlaying: false,
  }

  const [track, setTrack] = useState(defaultTrack)

  return (

    <ChakraProvider resetCSS theme={theme}>
      <TrackContext.Provider value={{track, setTrack}}>
        <Component {...pageProps} />
        <FooterWrapper />
      </TrackContext.Provider >
    </ChakraProvider>
  )
}

export default MyApp
