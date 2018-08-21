// next.config.js
console.log('> Custom loading next.config')

const path = require('path')
const webpack = require('webpack')

// const isProd = process.env.NODE_ENV === 'production'
const mode = process.env.MODE || 'dev'

module.exports = {
  // assetPrefix: mode !== 'prod' ? '' : `//s${Date.now() % 2}.jouryu.com`,

  poweredByHeader: false,

  webpack: (config: any, { dev }: { dev: boolean }) => {
    // @see: https://github.com/ant-design/ant-design/issues/7852#issuecomment-335692242
    if (config.resolve.alias) {
      config.resolve.alias['moment$'] = 'moment/moment.js'
    } else {
      config.resolve.alias = {
        moment$: 'moment/moment.js'
      }
    }

    // override babel-loader
    config.module.rules = config.module.rules.map((rule: any) => {
      if (
        rule.loader === 'babel-loader' &&
        typeof rule.options.cacheDirectory !== 'undefined'
      ) {
        const opt = rule.options
        delete opt.cacheDirectory
        rule.options = opt
        return rule
      }

      return rule
    })

    // handle images
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 20,
          name: `dist/images/[name]${dev ? '' : '.[hash:7]'}.[ext]`
        }
      }
    )

    // plugins
    config.plugins.push(
      // @see: https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    )

    return config
  }
}
