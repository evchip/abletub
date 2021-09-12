import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head >
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head >
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
