const {
  createAction,
  createAsyncAction,
  createReducer
} = require('redux-action-tools')

const Cookies = require('universal-cookie')

import { Dispatch } from 'redux'
import { ApolloClient } from 'react-apollo'
import { getActionTypes, isClient } from '../../utils'
import { ILoginInput } from '../../interfaces/login'
import { IUser } from '../../interfaces/user'
import { authLogin } from '../../graphql/login/login.data'
import { actions as reqActions } from './request.action'

export interface IAuthState {
  token: null | string
  authInfo: null | IUser
}

export interface IInputLoginAction extends ILoginInput {
  client: ApolloClient
}

export const initialState: IAuthState = {
  token: null,
  authInfo: null
}

export const actionTypes = getActionTypes(
  {
    LOGIN: null,
    LOGOUT: null
  },
  'AUTH'
)

let cookies: null | typeof Cookies = null

if (isClient) {
  cookies = new Cookies()
}

const COOKIE_GT_KEY = PKG.env.cookieGtKey

const { LOGIN, LOGOUT } = actionTypes

const login = createAsyncAction(
  LOGIN,
  (payload: IInputLoginAction, dispatch: Dispatch<any>) => {
    const { client, username, password } = payload

    if (!(client && username && password)) {
      return Promise.reject(new Error('Invalid login query args.'))
    }

    return authLogin(client, username, password)
      .then(res => {
        if (!res) {
          return { success: false }
        }

        return { success: true, data: res }
      })
      .catch((err: Error) => {
        dispatch(reqActions.error(err))
      })
  }
)

const setAuth = (state: IAuthState, response: any) => {
  if (!response.payload || !response.payload.data) {
    return
  }
  const { token, payload: authInfo } = response.payload.data

  if (cookies) {
    if (token) {
      // @see: https://github.com/reactivestack/cookies/tree/master/packages/react-cookie#cookies
      cookies.set(COOKIE_GT_KEY, token, {
        path: '/',
        expires: new Date(Date.now() + 3600000)
      })
    } else {
      cookies.remove(COOKIE_GT_KEY, { path: '/' })
    }
  }

  return {
    ...state,
    authInfo,
    token
  }
}

const clearAuth = () => {
  if (cookies) {
    cookies.remove(COOKIE_GT_KEY, { path: '/' })
  }
  return {
    token: null
  }
}

const reducers = createReducer()
  .when(LOGIN)
  .done(setAuth)
  .failed(clearAuth)
  .when(LOGOUT, clearAuth)
  .build({ ...initialState })

const actions = {
  login,
  logout: createAction(LOGOUT)
}

export { reducers as default, actions }
