const { createAction, createReducer } = require('redux-action-tools')
import { getActionTypes } from '../../utils'
import { IAppError } from '../../interfaces/error'

export interface IRequestState {
  loading: boolean
  error: null | Error
}

export const initialState: IRequestState = {
  loading: false,
  error: null
}

export const actionTypes = getActionTypes(
  {
    LOADING: null,
    ERROR: null,
    CLEAR_ERROR: null
  },
  'REQUEST'
)

const { LOADING, ERROR, CLEAR_ERROR } = actionTypes

// (previousState, action) => newState
// eslint-disable-next-line arrow-body-style
const setLoading = (
  state: IRequestState,
  { payload }: { payload: boolean }
) => {
  return {
    ...state,
    loading: payload
  }
}

// eslint-disable-next-line arrow-body-style
const setError = (
  state: IRequestState,
  { payload }: { payload: null | Error | IAppError }
) => {
  return {
    ...state,
    error: payload
  }
}

const clearError = (state: IRequestState) => ({ ...state, error: null })

const reducers = createReducer()
  .when(LOADING, setLoading)
  .when(ERROR, setError)
  .when(CLEAR_ERROR, clearError)
  .build({ ...initialState })

const actions = {
  loading: createAction(LOADING),
  error: createAction(ERROR),
  clearError: createAction(CLEAR_ERROR)
}

export { reducers as default, actions }
