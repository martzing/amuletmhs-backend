class CustomError extends Error {
  constructor(message, statusCode = 400, extra = false) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'CustomError'
    this.message = message
    if (extra) this.extra = extra
    this.statusCode = statusCode
  }
}

module.exports = CustomError
