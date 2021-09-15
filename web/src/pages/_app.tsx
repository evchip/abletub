import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css'
import { TrackContext } from '../utils/trackContext';
import { useState } from 'react';
import FooterWrapper from '../components/FooterWrapper'

function MyApp({ Component, pageProps }: any) {
  const [track, setTrack] = useState()

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
