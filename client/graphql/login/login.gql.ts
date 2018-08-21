import { gql } from 'react-apollo'

export const USER_FIELDS = `
    id
    isSuperuser
    isStaff
    isActive
    dateJoined
    username
    realName
    mobile
    email
    gender
`

export const MUTAION_LOGIN = gql`
  mutation authLogin(
    $input: LoginInput!
  ) {
    authLogin(
      input: $input
    ) {
      token
      payload {
        ${USER_FIELDS}
      }
    }
  }
`
