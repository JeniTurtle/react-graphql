import { ApolloClient, createNetworkInterface } from 'react-apollo'

import { safeConfigGet } from '../config'
import { ApolloClientType } from '../config/enums'
import { isClient } from '../utils'
import redirect from '../utils/redirect'
import { actions as authActions } from './actions/auth.action'

interface IInitOpt {
  getToken: () => string
  ctx?: {
    res: Response
  }
}

let apolloClient: null | ApolloClient = null
let dissoluteClient: null | ApolloClient = null

function createClient(
  { getToken, ctx }: IInitOpt,
  clientType: ApolloClientType
) {
  let uri: string = ''

  switch (clientType) {
    case ApolloClientType.Client:
      uri = safeConfigGet('graphqlUri')
      break
    default:
      uri = safeConfigGet('unAuthedGraphqlUri')
  }

  let protocol = 'http:'
  if (typeof location !== 'undefined' && location.protocol) {
    protocol = location.protocol
  }

  const networkInterface = createNetworkInterface({
    // Server URL (must be absolute)
    // 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn'
    uri: `${protocol}${uri}`,
    opts: {
      mode: 'cors',
      // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    }
  })

  networkInterface
    .use([
      {
        applyMiddleware(req, next) {
          if (!req.options.headers) {
            // Create the header object if needed.
            // @ts-ignore
            req.options.headers = {}
          }

          // transfer request headers to networkInterface so that they're accessible to proxy server
          // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
          const token = getToken()
          // @ts-ignore
          req.options.headers[PKG.env.headerGtKey] = token ? 'JWT ' + token : ''
          // console.log('networkInterface.applyMiddleware', req.options.headers)
          next()
        }
      }
    ])
    .useAfter([
      {
        applyAfterware({ response }, next) {
          if (response.status === 401 || response.status === 403) {
            // if (isClient) {
            //   message.error(decodeURIComponent(response.statusText))
            // }
            const store = isClient ? window.__APP_STORE__ : global.__APP_STORE__
            store && store.dispatch(authActions.logout())
            redirect('/login', ctx)
          }
          next()
        }
      }
    ])

  return new ApolloClient({
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: !isClient,
    networkInterface
  })
}

export default function initApollo(
  options: IInitOpt,
  clientType: ApolloClientType
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isClient) {
    return createClient(options, clientType)
  }

  if (clientType === ApolloClientType.Client) {
    apolloClient = apolloClient || createClient(options, clientType)
    return apolloClient
  } else {
    dissoluteClient = dissoluteClient || createClient(options, clientType)
    return dissoluteClient
  }
}
