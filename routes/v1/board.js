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
    method: 'PATCH',
    path: '/reward',
    handler: adapter.updateRewardListAdapter,
  },
  {
    method: 'GET',
    path: '/reward',
    handler: adapter.getRewardListsAdapter,
  },
  {
    method: 'POST',
    path: '/reward/type',
    handler: adapter.createRewardTypeAdapter,
  },
  {
    method: 'PATCH',
    path: '/reward/type',
    handler: adapter.updateRewardTypeAdapter,
  },
  {
    method: 'GET',
    path: '/reward/type',
    handler: adapter.getRewardTypesAdapter,
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
  {
    method: 'GET',
    path: '/reward/:reward_list_id',
    handler: adapter.getRewardListAdapter,
  },
]
