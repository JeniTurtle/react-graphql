require('source-map-support').install()

import { join } from 'path'
import { Express, Request, Response, NextFunction } from 'express'

import getLogger from './utils/logger'
// import { getGeniusIdByToken } from './utils/auth'

const express = require('express')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const appRootDir = require('app-root-dir')
const next = require('next')

export type EnvNodeEnv = 'development' | 'production'

const ENV = (process.env.NODE_ENV || 'development') as EnvNodeEnv
const dev = ENV !== 'production'
const port = parseInt(process.env.PORT || '', 10) || 3000
const rootPath = appRootDir.get()

const app = next({ dir: join(rootPath, 'dist'), dev })
const handle = app.getRequestHandler()
const logger = getLogger()

function logErrors(err: Error, req: Request, __: Response, next: NextFunction) {
  logger.error(req.url, err.stack)
  next(err)
}

const main = async () => {
  const server: Express = express()

  server.use(favicon(join(rootPath, 'static', 'favicon.ico')))
  server.use(cookieParser())
  server.use(logErrors)
  server.disable('x-powered-by')

  const serverRender = (asPath: string) => {
    return (req: Request, resp: Response) => {
      const query = {
        ...req.query
      }

      try {
        return app.render(req, resp, asPath, query)
      } catch (err) {
        logger.error(`serverRender ${asPath}`, err.stack)
        throw err
      }
    }
  }

  server.get('*', (req, resp) => {
    try {
      return handle(req, resp)
    } catch (err) {
      logger.error('server.get * ', err.stack)
      throw err
    }
  })

  server.get('/login', (req, resp) => {
    return serverRender('/login')(req, resp)
  })

  server.listen(port, (err: Error) => {
    if (err) {
      logger.error(err.name, err.stack)
      throw err
    }

    const { NODE_ENV, MODE } = process.env
    const start = `> Express: Ready on http://::1:${port} in ${NODE_ENV} ${MODE}.`
    logger.info(start)
  })
}

app.prepare().then(main)
