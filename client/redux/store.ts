import {
  createStore,
  applyMiddleware,
  Middleware,
  compose,
  combineReducers,
  Store,
  Action
} from 'redux'
import thunk from 'redux-thunk'
import { ApolloClient } from 'react-apollo'

import { isClient } from '../utils'
import reducers, { IRootState } from './reducers'
import { loadingMiddleWare } from './middlewares'
import { initialState as initAuth, actionTypes } from './actions/auth.action'
import { initialState as initRequest } from './actions/request.action'

const { LOGOUT } = actionTypes

let reduxStore: null | Store<any> = null

// @see https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  isClient &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
      })
    : compose

function configureStore(apollo: ApolloClient, initialState?: IRootState) {
  const enhancers = composeEnhancers(
    // Middleware store enhancer.
    applyMiddleware(
      apollo.middleware(),
      // Initialising redux-thunk with extra arguments will pass the below
      // arguments to all the redux-thunk actions. Below we are passing a
      // preconfigured axios instance which can be used to fetch data with.
      // @see https://github.com/gaearon/redux-thunk
      thunk.withExtraArgument({
        apollo
      }),
      loadingMiddleWare as Middleware
    )
  )

  // Reducer<IRootState, Action>
  const appReducer = combineReducers<IRootState>({
    ...reducers,
    apollo: apollo.reducer()
  } as any)

  const rootReducer = (state: IRootState, action: Action) => {
    // reset all state
    if (LOGOUT === action.type) {
      // @see： react-router-redux
      // const { routing } = state
      // state = { routing }
      state = getInitialState()
    }

    return appReducer(state, action)
  }

  // Hydrate the store with server-side data
  const store = initialState
    ? createStore(rootReducer, initialState, enhancers)
    : createStore(rootReducer, enhancers)

  return store
}

export default function initRedux(
  apollo: ApolloClient,
  initialState?: IRootState
) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isClient) {
    return configureStore(apollo, initialState)
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = configureStore(apollo, initialState)
  }

  return reduxStore
}

export function getInitialState(): IRootState {
  return {
    auth: { ...initAuth },
    request: { ...initRequest },
    apollo: {}
  }
}
