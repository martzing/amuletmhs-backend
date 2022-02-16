const CustomError = require('helpers/custom-error')
const logger = require('helpers/logger')
// const uuid = require('uuid')
const configs = require('configs')

module.exports = {
  getBoard: async ({
    func: { db },
    data: {
      boardId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const board = await db.getBoard({
        id: boardId,
        isInclude: true,
        dbTxn,
      })
      if (!board) throw new CustomError('Board not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      // TODO handle format
      return board
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getBoards: async ({
    func: { db },
    data: {
      offset = 0,
      limit = 10,
      searchText,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      logger.info(`Search Text: ${searchText}`)
      const board = await db.getBoards({
        offset,
        limit,
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
  updateBoard: async ({
    func: { db },
    data: {
      boardId,
      value,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updateBoard({ id: boardId, value, dbTxn })
      const board = await db.getBoard({ id: boardId, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return board
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getBoardItemList: async ({
    func: { db },
    data: {
      boardItemListId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const boardItemList = await db.getBoardItemList({
        id: boardItemListId,
        isInclude: true,
        dbTxn,
      })
      if (!boardItemList) throw new CustomError('Board item list not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      return boardItemList
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getBoardItemLists: async ({
    func: { db },
    data: {
      boardId,
      offset = 0,
      limit = 10,
      searchText,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const boardItemLists = await db.getBoardItemLists({
        boardId,
        offset,
        limit,
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return boardItemLists
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
  updateBoardItemList: async ({
    func: { db },
    data: {
      boardItemListId,
      value,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updateBoardItemList({
        id: boardItemListId,
        value,
        dbTxn,
      })
      const boardItemList = await db.getBoardItemList({
        id: boardItemListId,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return boardItemList
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getRewardList: async ({
    func: { db },
    data: {
      rewardListId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const reward = await db.getRewardList({
        id: rewardListId,
        isInclude: true,
        dbTxn,
      })
      if (!reward) throw new CustomError('Reward list not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      return reward
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getRewardLists: async ({
    func: { db },
    data: {
      boardItemListId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const rewardList = await db.getRewardLists({
        boardItemListId,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return rewardList
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createRewardList: async ({
    func: { db },
    data,
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const rewardList = await db.createRewardList({ value: data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return rewardList
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updateRewardList: async ({
    func: { db },
    data: {
      rewardListId,
      value,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updateRewardList({
        id: rewardListId,
        value,
        dbTxn,
      })
      const reward = await db.getRewardList({
        id: rewardListId,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return reward
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createRewardType: async ({
    func: { db, fs },
    data: {
      name,
      image,
    },
  }) => {
    let dbTxn
    try {
      const data = {
        file: image,
        bucketPath: 'reward',
      }
      const { status, file_path: filePath } = await fs.upload({ data })
      if (status !== 'success') {
        throw new CustomError('Upload file fail.')
      } 
      const value = {
        name,
        image: `${configs.baseUrl}/v1/file-system/download?key=${filePath}`
      }
      dbTxn = await db.beginTransaction({ dbTxn })
      const rewardType = await db.createRewardType({ value, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return rewardType
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getRewardTypes: async ({
    func: { db },
    data: {
      offset = 0,
      limit = 10,
      searchText,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const rewardTypes = await db.getRewardTypes({
        offset,
        limit,
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return rewardTypes
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updateRewardType: async ({
    func: { db, fs },
    data: {
      rewardTypeId,
      value: {
        name,
        image,
      },
    },
  }) => {
    let dbTxn
    try {
      const value = {}
      if (image !== undefined) {
        const data = {
          file: image,
          bucketPath: 'reward',
        }
        const { status, file_path: filePath } = await fs.upload({ data })
        if (status !== 'success') {
          throw new CustomError('Upload file fail.')
        } 
        value.image = `${configs.baseUrl}/v1/file-system/download?key=${filePath}`
      }
      if (name !== undefined) value.name = name
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updateRewardType({
        id: rewardTypeId,
        value,
        dbTxn,
      })
      const rewardType = await db.getRewardType({
        id: rewardTypeId,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return rewardType
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
}
