const adapter = require('controllers/board/board.api')

module.exports = [
  {
    method: 'POST',
    path: '/list',
    handler: adapter.createBoardItemListAdapter,
  },
  {
    method: 'PATCH',
    path: '/list',
    handler: adapter.updateBoardItemListAdapter,
  },
  {
    method: 'GET',
    path: '/list',
    handler: adapter.getBoardItemListsAdapter,
  },
  {
    method: 'POST',
    path: '/',
    handler: adapter.createBoardAdapter,
  },
  {
    method: 'PATCH',
    path: '/',
    handler: adapter.updateBoardAdapter,
  },
  {
    method: 'GET',
    path: '/',
    handler: adapter.getBoardsAdapter,
  },
  {
    method: 'POST',
    path: '/reward',
    handler: adapter.createRewardListAdapter,
  },
  {
    method: 'GET',
    path: '/reward',
    handler: adapter.getRewardListsAdapter,
  },
  {
    method: 'GET',
    path: '/:board_id',
    handler: adapter.getBoardAdapter,
  },
  {
    method: 'GET',
    path: '/list/:board_item_list_id',
    handler: adapter.getBoardItemListAdapter,
  },
]
