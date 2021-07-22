import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head >
        <meta charSet="utf-8" />
		    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head >
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
