import React from 'react'
import Head from 'next/head'

interface IProps {
  statusCode: number
  error: string
}

export default class ErrorPage extends React.Component<IProps> {
  static getInitialProps({ res, err }: any) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null

    return {
      statusCode,
      error: err ? err.message || err.name : ''
    }
  }

  render() {
    const { statusCode, error } = this.props

    const title =
      statusCode === 404
        ? '每个人都需要面对一个未知的世界。'
        : `😂一个未知的异常...`

    return (
      <div style={styles.error as any}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>

        <div>
          {statusCode ? <h1 style={styles.h1 as any}>{statusCode}</h1> : null}
          <div style={styles.desc}>
            <h2 style={styles.h2 as any}>{title}</h2>
            <p style={{ color: '#fff' }}>{error}</p>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  error: {
    color: '#000',
    background: '#fff',
    fontFamily:
      // tslint:disable-next-line:max-line-length
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle'
  },

  h1: {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top'
  },

  h2: {
    fontSize: '16px',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0
  }
}
