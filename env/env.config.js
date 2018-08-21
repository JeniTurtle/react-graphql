// @see: .babelrc
console.log('> env-config.js -> transform-define')

const path = require('path')
const fs = require('fs')

const appRootDir = require('app-root-dir')
const dotenv = require('dotenv')

const rootPath = appRootDir.get()
const envPath = path.join(rootPath, 'env')
const pkg = require(path.join(rootPath, 'package.json'))

const externals = pkg.externals
const envMode = process.env.MODE || 'dev'
const envName = process.env.NODE_ENV || 'development'

// -----------------------------------------------------------------------------

function registerEnvFile() {
    const envFile = '.env'
    console.log(
        'In process.env: MODE is %s, NODE_ENV is %s.',
        process.env.MODE,
        process.env.NODE_ENV
    )
    console.log('Env set: MODE is %s, NODE_ENV is %s.', envMode, envName)

    const envFileResolutionOrder = [
        path.resolve(envPath, `${envFile}.${envMode}`),
        path.resolve(envPath, `${envFile}.${envName}`),
        path.resolve(envPath, envFile)
    ]

    const envFilePath = envFileResolutionOrder.find(filePath =>
        fs.existsSync(filePath)
    )

    if (envFilePath) {
        console.log(`==> Registering environment variables from: ${envFilePath}`)

        dotenv.config({ path: envFilePath })

        const overConfig = dotenv.parse(fs.readFileSync(envFilePath))

        for (const key in overConfig) {
            process.env[key] = overConfig[key]
        }
    }
}

registerEnvFile()

function getStringEnvVar(name, defaultVal) {
    return process.env[name] || defaultVal
}

const graphqlUri = getStringEnvVar('GRAPHQL_URI', '//127.0.0.1/graphiql/')
const unAuthedGraphqlUri = getStringEnvVar('UNAUTHED_GRAPHQL_URI', '//127.0.0.1/unauthorized_graphiql/')

const env = {
    mode: envMode,
    unAuthedGraphqlUri,
    cookieGtKey: getStringEnvVar('COOKIE_GT_KEY', 'EX_GT'),
    headerGtKey: getStringEnvVar('COOKIE_GT_KEY', 'Authorization'),
    graphqlUri
}

console.log('> in env:', env)

const envConfig = {
    PKG: {
        env,
        externals
    },
    'process.env.MODE': envMode
}

console.log('> envConfig.PKG.env:', envConfig.PKG.env)

module.exports = envConfig
