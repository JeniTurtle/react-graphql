// tslint:disable
interface Process {
  env: {
    NODE_ENV: 'development' | 'production'
    MODE: 'dev' | 'qa' | 'pre' | 'prod'
    PORT?: number
  }
  browser: boolean
}

interface Window {
  Map?: any
  Set?: any
  __APP_STORE__?: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
  __CLIENT_CONFIG__: object
}

declare namespace NodeJS {
  interface Global {
    __APP_STORE__?: any
    requestAnimationFrame?: (cb: Function) => void
  }
}

declare var PKG: {
  env: {
    mode: 'dev' | 'qa' | 'pre' | 'prod'
    unAuthedGraphqlUri: string
    graphqlUri: string
    headerGtKey: string
    cookieGtKey: string
  }
  externals: {
    global: {
      css: string
    }
    antd: {
      css: string
    }
    'es6-promise': string
  }
}
