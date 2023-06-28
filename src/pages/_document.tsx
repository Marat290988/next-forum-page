import { Html, Head, Main, NextScript } from 'next/document';

export const portalIds = {
  backdrop: 'backdrop-root',
  modal: 'modal-root'
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id={portalIds.backdrop}></div>
        <div id={portalIds.modal}></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
