const adapter = require('controllers/user/user.api')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: adapter.getUsers,
  },
]
