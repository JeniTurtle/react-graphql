import { IAppError } from '../interfaces/error'

export const isClient: boolean = typeof window !== 'undefined'

export function getDisplayName(WrappedComponent: any): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function getActionTypes(
  types: { [key: string]: null },
  prefix: string = ''
) {
  const hasPrefix = !!prefix
  const dict: { [key: string]: string } = {}

  Object.keys(types).forEach((key: string) => {
    dict[key] = hasPrefix ? `@@${prefix}/${key}` : key
  })

  return dict
}

export function makeError(err: IAppError): Error {
  const { error_name, detail } = err
  return new Error(detail || error_name)
}
