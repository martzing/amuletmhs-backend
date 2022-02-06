const morgan = require('morgan')

const logger = require('helpers/logger')

module.exports = (app) => {
  const customFormat = `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"`
  const format = customFormat || 'combined'
  const opts = {
    stream: {
      write: (message) =>
        logger.http(message.substring(0, message.lastIndexOf("\n"))),
    },
    skip: (req, res) => {
      return req.originalUrl === '/status'
    },
  }
  app.use(morgan(format, opts))
}
