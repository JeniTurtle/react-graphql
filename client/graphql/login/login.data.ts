import { ApolloClient } from 'react-apollo'
import { MUTAION_LOGIN } from './login.gql'
import { ILoginPayload } from '../../interfaces/login'

// 用户登录接口
export function authLogin(
  apolloClient: ApolloClient,
  username: string,
  password: string
) {
  return apolloClient
    .mutate<{ authLogin: ILoginPayload }>({
      variables: { input: { username, password } },
      mutation: MUTAION_LOGIN
    })
    .then(({ data }) => (data ? data.authLogin : null))
}
