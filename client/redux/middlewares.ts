import { MiddlewareAPI, Dispatch, Action } from 'redux'
import getValue from 'lodash.get'

import { actions } from './actions/request.action'

const { ASYNC_PHASES } = require('redux-action-tools')

export interface IActionShape extends Action {
  meta?: { [key: string]: any }
  type: string
  payload: any
}

export function loadingMiddleWare({ dispatch }: MiddlewareAPI<any>) {
  return (next: Dispatch<any>) => (action: IActionShape) => {
    const asyncPhase = getValue(action, 'meta.asyncPhase')

    if (asyncPhase) {
      const omitLoading = getValue(action, 'meta.omitLoading')
      if (!omitLoading) {
        const loading = asyncPhase === ASYNC_PHASES.START
        dispatch(actions.loading(loading))
      }
    }

    return next(action)
  }
}
