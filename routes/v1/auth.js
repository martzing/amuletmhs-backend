const adapter = require('controllers/auth/auth.api')

module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: adapter.getUsers,
  },
]
