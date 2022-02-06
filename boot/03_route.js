const route = require('route')
const auth = require('route/auth')

module.exports = (app) => {
  route(app)
  auth(app)
}