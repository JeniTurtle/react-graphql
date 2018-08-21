import React from 'react'
import { ApolloClient, ApolloProvider, getDataFromTree } from 'react-apollo'
import { Store } from 'redux'
import cookie from 'cookie'

import { isClient, getDisplayName } from '../utils'
import initApollo from './apollo'
import { ApolloClientType } from '../config/enums'
import initRedux, { getInitialState } from './store'
import { IRootState } from '../redux/reducers'

interface IProps {
  serverState: IRootState
}

const COOKIE_GT_KEY = PKG.env.cookieGtKey

let apolloClientType: ApolloClientType = ApolloClientType.Client

function parseCookies(ctx: any = {}, options = {}) {
  // original: ctx.req.headers.cookie
  // ctx.req.cookies via expressjs/cookie-parser
  if (ctx.req && ctx.req.cookies) {
    return ctx.req && ctx.req.cookies
  }

  if (typeof document !== 'undefined') {
    return cookie.parse(document.cookie, options)
  }

  return {}
}

const withApollo = (ComposedComponent: any) => {
  return class WithData extends React.Component<IProps, {}> {
    static readonly displayName = `WithData(${getDisplayName(
      ComposedComponent
    )})`

    static async getInitialProps(ctx: any) {
      const serverState = getInitialState()

      // Setup a server-side one-time-use apollo client for initial props and
      // rendering (on server)
      const apollo = initApollo(
        {
          getToken: () => parseCookies(ctx)[COOKIE_GT_KEY] || '',
          ctx: {
            res: ctx.res
          }
        },
        apolloClientType
      )

      if (serverState.auth) {
        const token = parseCookies(ctx)[COOKIE_GT_KEY] || ''
        serverState.auth.token = token
      }

      // Evaluate the composed component's getInitialProps()
      const composedInitialProps = {}
      if (typeof ComposedComponent.getInitialProps === 'function') {
        // second, the page.getInitialProps
        const initProps = await ComposedComponent.getInitialProps(
          ctx,
          apollo,
          serverState
        )
        // third, merge
        Object.assign(composedInitialProps, initProps, serverState)
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (!isClient) {
        if (ctx.res && ctx.res.finished) {
          // When redirecting, the response is finished.
          // No point in continuing to render
          return
        }

        const store = initRedux(apollo)
        global.__APP_STORE__ = store

        // Provide the `url` prop data in case a graphql query uses it
        const url = {
          query: ctx.query,
          pathname: ctx.pathname
        }

        try {
          // Run all graphql queries
          const app = (
            // No need to use the Redux Provider
            // because Apollo sets up the store for us
            <ApolloProvider client={apollo} store={store}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
          // getDataFromTree does not call componentWillUnmount
          await getDataFromTree(app)
        } catch (err) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          console.error('getDataFromTree', err.stack)
        }

        // Extract query data from the Apollo's store
        const state = apollo.getInitialState()

        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway
        serverState.apollo = {
          // Make sure to only include Apollo's data state
          data: state.data
        }
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    apollo: ApolloClient
    store: Store<any>

    // -------------------------------------------------------------------------

    constructor(props: any) {
      super(props)

      // Note: Apollo should never be used on the server side beyond the initial
      // render within `getInitialProps()` above (since the entire prop tree
      // will be initialized there), meaning the below will only ever be
      // executed on the client.
      this.apollo = initApollo(
        {
          getToken: () => parseCookies({})[COOKIE_GT_KEY] || ''
        },
        apolloClientType
      )

      this.store = initRedux(this.apollo, this.props.serverState)
      if (typeof window !== 'undefined') {
        window.__APP_STORE__ = this.store
      }
    }

    render() {
      return (
        // No need to use the Redux Provider
        // because Apollo sets up the store for us
        <ApolloProvider client={this.apollo} store={this.store}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}

export default (clientType: ApolloClientType = ApolloClientType.Client) => {
  apolloClientType = clientType
  return withApollo
}
