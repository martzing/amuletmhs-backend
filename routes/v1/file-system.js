const adapter = require('controllers/file-system/file-system.api')

module.exports = [
  {
    method: 'POST',
    path: '/upload',
    handler: adapter.uploadAdapter,
  },
  {
    method: 'GET',
    path: '/download',
    handler: adapter.downloadAdapter,
  },
  {
    method: 'GET',
    path: '/sign',
    handler: adapter.getSignedUrlAdapter,
  },
]
