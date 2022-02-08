const adapter = require('controllers/board/board.api')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: adapter.getBoardsAdapter,
  },
  {
    method: 'POST',
    path: '/',
    handler: adapter.createBoardAdapter,
  },
  {
    method: 'POST',
    path: '/list',
    handler: adapter.createBoardItemListAdapter,
  },
]
