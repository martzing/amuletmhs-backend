const { begin, commit, rollback } = require('models')

module.exports = ({ models }) => ({
  beginTransaction: async ({ dbTxn }) => {
    if (dbTxn) {
      return dbTxn
    }
    const _dbTxn = await begin({ models })
    return _dbTxn
  },
  commitTransaction: async ({ dbTxn }) => {
    if (dbTxn) {
      await commit({ transaction: dbTxn })
    }
    return undefined
  },
  rollbackTransaction: async ({ dbTxn }) => {
    if (dbTxn) {
      await rollback({ transaction: dbTxn })
    }
    return undefined
  },
})
