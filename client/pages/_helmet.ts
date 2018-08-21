const css = {
  antd: {
    rel: 'stylesheet',
    type: 'text/css',
    href: PKG.externals.antd.css
  },
  global: {
    rel: 'stylesheet',
    type: 'text/css',
    href: PKG.externals.global.css
  }
}

const metas = [
  { name: 'charset', content: 'utf-8' },
  { name: 'description', content: 'jouryu' },
  { httpEquiv: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
  { httpEquiv: 'Cache-Control', content: 'no-siteapp' },
  { name: 'renderer', content: 'webkit' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { name: 'theme-color', content: '#F2F5F8' }
]

const scripts: Array<{ type: string; src: string }> = [
  // {
  //   type: 'text/javascript',
  //   src: PKG.externals['es6-promise']
  // }
]

const es6Promise = PKG.externals['es6-promise']

// tslint:disable:max-line-length
const TEST_PROMISE = `window.Promise || document.write('<script type="text/javascript" src="${es6Promise}" crossorigin="anonymous"><\\/script>');`

export { metas, scripts, css, TEST_PROMISE }
