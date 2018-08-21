import authReducers, { IAuthState } from './actions/auth.action'
import requestReducers, { IRequestState } from './actions/request.action'

export interface IRootState {
  auth: IAuthState
  request: IRequestState
  apollo?: {
    [key: string]: any
  }
}

const rootReducers = {
  auth: authReducers,
  request: requestReducers
}

export default rootReducers
