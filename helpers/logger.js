const winston = require('winston')

const env = process.env.NODE_ENV || 'develop'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const isDevelopment = (env === 'develop' || env === 'local') ? true : false
  return isDevelopment ? 'debug' : 'http'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)
const colorize = (env === 'local') ? true : false

const format = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: colorize }),
  winston.format.printf((info) => {
    // eslint-disable-next-line no-control-regex
    const _level = (env !== 'local') ? info.level.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '') : info.level
    const log = `${_level}: ${info.message}`
    return info.stack ? `${log}\n${info.stack}` : log
  }),
)

const transports = [
  new winston.transports.Console({ silent: process.argv.indexOf("--silent") >= 0 }),
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

module.exports = logger