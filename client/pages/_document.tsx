require('isomorphic-unfetch')

import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

import { metas, scripts, css, TEST_PROMISE } from './_helmet'

import './_polyfill'

const serialize = require('serialize-javascript')

interface IProps {
  title?: string
}

const clientConfig = {
  mode: PKG.env.mode,
  unAuthedGraphqlUri: PKG.env.unAuthedGraphqlUri,
  graphqlUri: PKG.env.graphqlUri
}

const inlineScript = (body: string) => (
  <script type="text/javascript" dangerouslySetInnerHTML={{ __html: body }} />
)

export default class NextDocument extends Document {
  props: IProps

  // @see: https://github.com/zeit/next.js#fetching-data-and-component-lifecycle
  static async getInitialProps(ctx: any) {
    // @ts-ignore
    const props = await super.getInitialProps(ctx)

    return { ...props }
  }

  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()

    const { title } = this.props

    return (
      <html lang="zh-cmn-Hans">
        <Head>
          <title>{title || '琢瑜'}</title>
          {metas.map((mt, i) => <meta key={`meta${i}`} {...mt} />)}
          <link {...css.antd} />
          <link {...css.global} />
          {styleTags}
        </Head>
        <body>
          {main}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `window.__CLIENT_CONFIG__=${serialize(clientConfig)}`
            }}
          />
          {inlineScript(TEST_PROMISE)}
          {scripts.map((sc, i) => <script key={`script${i}`} {...sc} />)}
          <NextScript />
        </body>
      </html>
    )
  }
}
