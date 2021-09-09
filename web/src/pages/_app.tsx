import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import { extendTheme } from "@chakra-ui/react"
import '../styles/globals.css'

function MyApp({ Component, pageProps }: any) {
  return (

    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
          initialColorMode: "dark",
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
