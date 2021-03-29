import Document, { Html, Head, Main, NextScript,DocumentContext } from 'next/document'
class DefDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    }
  
    render() {
      return (
        <Html>
          <Head />
          <body className="layout-top-nav">
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }
  
  export default DefDocument