// const CustomError = require('helpers/custom-error')
const logger = require('helpers/logger')
// const uuid = require('uuid')
// const configs = require('configs')

module.exports = {
  getBoards: async ({
    func: { db },
    data: {
      searchText,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      logger.info(`Search Text: ${searchText}`)
      const board = await db.getBoards({
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return board
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createBoard: async ({
    func: { db },
    data,
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const board = await db.createBoard({ value: data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return board
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createBoardItemList: async ({
    func: { db },
    data,
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const board = await db.createBoardItemList({ value: data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return board
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
}
