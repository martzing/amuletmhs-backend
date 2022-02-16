// const moment = require('helpers/moment')
// onst CustomError = require('helpers/custom-error')

module.exports = ({ models }) => ({
  getBoard: async ({
    id,
    isInclude = false,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    const include = [
      {
        model: models.BoardItemList,
      },
    ]
    if (isInclude) options.include = include
    const board = await models.Board.findOne(options)
    return board
  },
  getBoards: async ({
    offset,
    limit,
    searchText,
    dbTxn,
  }) => {
    const { Op } = models
    let where
    const options = {
      transaction: dbTxn,
    }
    if (searchText !== undefined) {
      where = {
        name: {
          [Op.like]: `%${searchText}%`
        }
      }
    }
    if (where) options.where = where
    if (offset !== undefined) options.offset = offset
    if (limit !== undefined) options.limit = limit
    const boards = await models.Board.findAll(options)
    return boards
  },
  getBoardItemList: async ({
    id,
    isInclude = false,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    const include = [
      {
        model: models.RewardList,
        include: [
          {
            model: models.RewardType,
          }
        ],
      },
    ]
    if (isInclude) options.include = include
    const boardItemList = await models.BoardItemList.findOne(options)
    return boardItemList
  },
  getBoardItemLists: async ({
    boardId,
    offset,
    limit,
    searchText,
    dbTxn,
  }) => {
    const { Op } = models
    const options = {
      where: { board_id: boardId },
      transaction: dbTxn,
    }
    if (searchText !== undefined) {
      options.where.customer_name = { [Op.like]: `%${searchText}%` }
    }
    if (offset !== undefined) options.offset = offset
    if (limit !== undefined) options.limit = limit
    const boardItemLists = await models.BoardItemList.findAll(options)
    return boardItemLists
  },
  getRewardLists: async ({
    boardItemListId,
    dbTxn,
  }) => {
    const { Op } = models
    const options = {
      where: { board_item_list_id: boardItemListId },
      transaction: dbTxn,
    }
    const rewardList = await models.RewardList.findAll(options)
    return rewardList
  },
  getRewardList: async ({
    id,
    isInclude = false,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    const include = [
      {
        model: models.RewardType,
      },
    ]
    if (isInclude) options.include = include
    const rewardList = await models.RewardList.findOne(options)
    return rewardList
  },
  getRewardTypes: async ({
    offset,
    limit,
    searchText,
    dbTxn,
  }) => {
    const { Op } = models
    let where
    const options = {
      transaction: dbTxn,
    }
    if (searchText !== undefined) {
      where = {
        name: {
          [Op.like]: `%${searchText}%`
        }
      }
    }
    if (where) options.where = where
    if (offset !== undefined) options.offset = offset
    if (limit !== undefined) options.limit = limit
    const rewardTypes = await models.RewardType.findAll(options)
    return rewardTypes
  },
  getRewardType: async ({
    id,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    const rewardType = await models.RewardType.findOne(options)
    return rewardType
  },
})
