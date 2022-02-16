const logger = require('helpers/logger')
const db = require('controllers/board/module/db')
const validate = require('controllers/board/module/validate')
const ctrl = require('controllers/board/board.ctrl')
const fs = require('controllers/file-system/file-system.ctrl')
const formParser = require('helpers/form-parser')
// const func = require('controllers/auth/auth.func')

module.exports = {
  getBoardAdapter: async (req, res) => {
    try {
      const data = await validate.getBoard(req)
      const result = await ctrl.getBoard({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getBoardsAdapter: async (req, res) => {
    try {
      const data = await validate.getBoards(req)
      const result = await ctrl.getBoards({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createBoardAdapter: async (req, res) => {
    try {
      const data = await validate.createBoard(req)
      const result = await ctrl.createBoard({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updateBoardAdapter: async (req, res) => {
    try {
      const data = await validate.updateBoard(req)
      const result = await ctrl.updateBoard({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getBoardItemListAdapter: async (req, res) => {
    try {
      const data = await validate.getBoardItemList(req)
      const result = await ctrl.getBoardItemList({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getBoardItemListsAdapter: async (req, res) => {
    try {
      const data = await validate.getBoardItemLists(req)
      const result = await ctrl.getBoardItemLists({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createBoardItemListAdapter: async (req, res) => {
    try {
      const data = await validate.createBoardItemList(req)
      const result = await ctrl.createBoardItemList({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updateBoardItemListAdapter: async (req, res) => {
    try {
      const data = await validate.updateBoardItemList(req)
      const result = await ctrl.updateBoardItemList({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getRewardListAdapter: async (req, res) => {
    try {
      const data = await validate.getRewardList(req)
      const result = await ctrl.getRewardList({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getRewardListsAdapter: async (req, res) => {
    try {
      const data = await validate.getRewardLists(req)
      const result = await ctrl.getRewardLists({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createRewardListAdapter: async (req, res) => {
    try {
      const data = await validate.createRewardList(req)
      const result = await ctrl.createRewardList({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updateRewardListAdapter: async (req, res) => {
    try {
      const data = await validate.updateRewardList(req)
      const result = await ctrl.updateRewardList({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getRewardTypesAdapter: async (req, res) => {
    try {
      const data = await validate.getRewardTypes(req)
      const result = await ctrl.getRewardTypes({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createRewardTypeAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.createRewardType({ fields, files })
      const result = await ctrl.createRewardType({
        func: { db, fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updateRewardTypeAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.updateRewardType({ fields, files })
      const result = await ctrl.updateRewardType({
        func: { db, fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
}
