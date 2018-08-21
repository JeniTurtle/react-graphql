import { IUser } from './user'

export interface ILoginInput {
  username: string
  password: string
}

export interface ILoginPayload {
  token: string
  payload: IUser
}
