import Document, { Main } from 'next/document'
import flush from 'styled-jsx/server'

// custom component
import NextScript from '@/components/NextJS/NextScript';
import Head from '@/components/NextJS/Head';

import { prefix } from '@/utils/constants';

// custom component
import CSSTag from '@/components/CSSTag'

// styles
import style from '@/styles/global.scss'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
      <html>
        <Head prefix={prefix}>
          <link rel='stylesheet' href={`${prefix}/static/css/app.css`} />
          <link rel='icon' href='https://cdn.zeit.co/favicon/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
          <CSSTag style={style} />
        </Head>
        <body className='custom_class'>
          {this.props.customValue}
          <Main />
          <NextScript prefix={prefix} />
        </body>
      </html>
    )
  }
}
