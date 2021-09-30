import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head >
        <title>a b l e t u b</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/baby-tub.ico" />
        </Head >
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
