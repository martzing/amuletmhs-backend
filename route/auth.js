const adapter = require('controllers/auth/auth.api')

module.exports = (app) => {
  app.get('/auth/login', adapter.getUsers)
}
