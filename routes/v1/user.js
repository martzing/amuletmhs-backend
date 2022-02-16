const adapter = require('controllers/user/user.api')

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: adapter.loginAdapter,
  },
  {
    method: 'POST',
    path: '/change-password',
    configs: { auth: true },
    handler: adapter.changePasswordAdapter,
  },
  {
    method: 'GET',
    path: '/',
    configs: { auth: true },
    handler: adapter.getUsers,
  },
  {
    method: 'GET',
    path: '/genpass',
    handler: adapter.genPassword,
  },
  {
    method: 'GET',
    path: '/verify',
    handler: adapter.verifyPassword,
  },
  {
    method: 'GET',
    path: '/token',
    handler: adapter.genToken,
  },
  {
    method: 'GET',
    path: '/token/verify',
    handler: adapter.verifyToken,
  },
]
