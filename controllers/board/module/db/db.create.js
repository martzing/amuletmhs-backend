const moment = require('helpers/moment')

module.exports = ({ models }) => ({
  createBoard: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    const result = await models.Board.create(value, options)
    return result
  },
  createBoardItemList: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    const result = await models.BoardItemList.create(value, options)
    return result
  },
  createRewardList: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    const rewardList = await models.RewardList.create(value, options)
    return rewardList
  },
  createRewardType: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    const rewardType = await models.RewardType.create(value, options)
    return rewardType
  },
})
