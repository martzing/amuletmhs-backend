const moment = require('helpers/moment')

module.exports = ({ models }) => ({
  // NOT REMOVE: helper function for save data to redis
  saveReferenceData: async ({
    reference,
    referenceData,
    expire = 3600,
  }) => {
    await redis.hmsetAsync(reference, {
      data: JSON.stringify(referenceData),
    })
    await redis.expireAsync(reference, expire)
  },
  
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
})
