import { Logger, transports, LoggerInstance } from 'winston'

const DailyRotateFile = require('winston-daily-rotate-file')

function zeroPad(num: string | number) {
  return `0${num}`.slice(-2)
}

function timestamp() {
  const date = new Date()
  const yyyy = date.getFullYear() + ''
  const m = zeroPad(date.getMonth() + 1)
  const d = zeroPad(date.getDate())
  const h = zeroPad(date.getHours())
  const mm = zeroPad(date.getMinutes())
  const s = zeroPad(date.getSeconds())

  return `${yyyy}-${m}-${d} ${h}:${mm}:${s}`
}

const isDev = process.env.NODE_ENV !== 'production'

const fileOpt = {
  // @see https://github.com/winstonjs/winston/blob/master/docs/transports.md
  json: false,
  maxsize: 1024 * 1024 * 10,
  maxFiles: 7,
  timestamp,
  formatter: (options: any) =>
    `[${options.level.toUpperCase()}]${options.timestamp()} PID-${
      process.pid
    } ${options.message}`
}

let logger: LoggerInstance

export default function getLogger() {
  if (!logger) {
    logger = new Logger({
      level: isDev ? 'debug' : 'info',
      transports: [
        new transports.Console({
          json: false,
          timestamp
        }),
        new DailyRotateFile({
          name: 'app',
          filename: './logs/app',
          datePattern: '.yyyy-MM-dd.log',
          ...fileOpt
        }),
        new DailyRotateFile({
          name: 'error',
          filename: './logs/error',
          datePattern: '.yyyy-MM-dd.log',
          level: 'error',
          ...fileOpt
        })
      ]
    })
  }

  return logger
}
