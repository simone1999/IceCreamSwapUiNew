/* eslint-disable jsx-a11y/iframe-has-title */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // eslint-disable-next-line no-param-reassign
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html translate="no">
        <Head>
          {process.env.NEXT_PUBLIC_NODE_PRODUCTION && (
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_NODE_PRODUCTION} />
          )}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&amp;display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                let dapp_id="0767a54d-f2b8-4c86-b6b2-dc716e47ec35"; // replace with dapp_id provided by hashmail
                let hashmail_settings={
                  widgetMode: "other", //you can switch to light mode
                  horizontalPadding: ['-10','10'],
                  verticalPadding: ['38','10'],
                  widgetTheme: "#F8567F"
                };
                !async function(){window.hashmail||(window.hashmail=[]),window.hashmail.queue=[];let t=["load","identify","track","auth","init","loadSettings"],e=function(t){return function(){a=Array.prototype.slice.call(arguments),a.unshift(t),window.hashmail.queue.push(a)}};for(var i=0;t.length>i;i++)window.hashmail[t[i]]=e(t[i]);hashmail.methods=t,window.hashmail.load=function(t,e){window.hashmail.dapp_id=t,window.hashmail.settings=e;var i=document,s=i.getElementsByTagName("script")[0],h=i.createElement("script");h.type="text/javascript",h.async=!0,h.src="https://widget.hashmail.dev/notifier_tracking_script.js",s.parentNode.insertBefore(h,s)},hashmail.load(dapp_id,hashmail_settings)}();
              `,
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          <div id="portal-root" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
