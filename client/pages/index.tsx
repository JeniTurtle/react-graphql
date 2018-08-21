import React from 'react'
import { compose } from 'redux'
import Head from 'next/head'

import App from '../components/App/App'

let NoSSR = require('react-no-ssr')
NoSSR = NoSSR.default || NoSSR

interface IProps {
  title?: string
}

class IndexPage extends React.Component<IProps> {
  static readonly displayName = 'IndexPage'

  static async getInitialProps() {
    return {
      title: '首页'
    }
  }

  render() {
    const { title } = this.props

    return (
      <App>
        <Head>
          <title>{title}</title>
        </Head>
        111111222
      </App>
    )
  }
}

export default compose<React.ComponentClass<IProps>>()(IndexPage as any)
