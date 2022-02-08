const morgan = require('morgan')

const logger = require('helpers/logger')

module.exports = (app) => {
  const format = 'combined'
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
