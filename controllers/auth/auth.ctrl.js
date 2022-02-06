// const CustomError = require('helpers/custom-error')
const logger = require('helpers/logger')
// const uuid = require('uuid')
// const configs = require('configs')

module.exports = {
  getUsers: async ({
    func: { db },
    data: {
      userId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const user = await db.getUsers({ dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return user
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
}
