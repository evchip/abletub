import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css'
import { extendTheme } from "@chakra-ui/react"

function MyApp({ Component, pageProps }: any) {
  return (

    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
