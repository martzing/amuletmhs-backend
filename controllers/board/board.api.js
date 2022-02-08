const logger = require('helpers/logger')
const db = require('controllers/board/module/db')
const validate = require('controllers/board/module/validate')
const ctrl = require('controllers/board/board.ctrl')
// const func = require('controllers/auth/auth.func')

module.exports = {
  getBoardsAdapter: async (req, res) => {
    try {
      const { value } = await validate.getBoards(req)
      const result = await ctrl.getBoards({
        func: { db, },
        data: value,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createBoardAdapter: async (req, res) => {
    try {
      const { value } = await validate.createBoard(req)
      const result = await ctrl.createBoard({
        func: { db, },
        data: value,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createBoardItemListAdapter: async (req, res) => {
    try {
      const { value } = await validate.createBoardItemList(req)
      const result = await ctrl.createBoardItemList({
        func: { db, },
        data: value,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
}
