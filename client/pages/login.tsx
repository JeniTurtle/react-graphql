import React from 'react'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import { ApolloClient, withApollo } from 'react-apollo'

import App from '../components/App/App'
import Login from '../components/Login/Login'
import withReduxApollo from '../redux/withReduxApollo'
import { IRootState } from '../redux/reducers'
import redirect from '../utils/redirect'
import { ApolloClientType } from '../config/enums'
import {
  IInputLoginAction,
  actions as authActions,
  IAuthState
} from '../redux/actions/auth.action'
import {
  actions as reqActions,
  IRequestState
} from '../redux/actions/request.action'

interface IProps {
  client: ApolloClient
  title: string | null
  auth: IAuthState
  request: IRequestState
  clearError: () => void
  confirmSubmit: (input: IInputLoginAction) => void
}

interface IState {
  isLogined: boolean
}

const isLogined = (auth?: null | IAuthState) => {
  if (auth && auth.token) {
    return true
  }
  return false
}

class LoginPage extends React.Component<IProps, IState> {
  static readonly displayName = 'LoginPage'

  // @override
  static getInitialProps() {
    return {
      title: '登录'
    }
  }

  props: IProps

  constructor(props: IProps) {
    super(props)

    this.state = {
      isLogined: isLogined(props.auth)
    }
  }

  componentDidMount() {
    this.state.isLogined && redirect('/')
  }

  componentWillReceiveProps({ auth }: IProps) {
    if (isLogined(auth)) {
      this.setState({ isLogined: true })
      redirect('/')
    }
  }

  render() {
    const { title, confirmSubmit, clearError, request, client } = this.props

    return (
      <App>
        <Head>
          <title>{title || '登录'}</title>
        </Head>

        <Login
          client={client}
          loading={request.loading}
          error={request.error}
          confirmSubmit={confirmSubmit}
          clearError={clearError}
        />
      </App>
    )
  }
}

const mapStateToProps = ({ request, auth }: IRootState) => ({
  request,
  auth
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  confirmSubmit: (input: IInputLoginAction) =>
    dispatch(authActions.login(input)),
  clearError: () => dispatch(reqActions.error(null))
})

export default compose(
  withReduxApollo(ApolloClientType.UnauthorizedClient),
  withApollo,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage as any)
