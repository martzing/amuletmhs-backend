// const CustomError = require('helpers/custom-error')
const logger = require('helpers/logger')
// const uuid = require('uuid')
// const configs = require('configs')

module.exports = {
  getInvestmentTransaction: async ({
    func: { db },
    data: {
      investmentTid,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const investTxn = await db.getInvestmentTransaction({ id: investmentTid, dbTxn })
      if (!investTxn) throw new CustomError('Investment transaction not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      return investTxn
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getInvestmentTransactions: async ({
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
      const investTxns = await db.getInvestmentTransactions({
        offset,
        limit,
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return investTxns
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createInvestmentTransaction: async ({
    func: { db },
    data,
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const investTxn = await db.createInvestmentTransaction({ value: data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return investTxn
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updateInvestmentTransaction: async ({
    func: { db },
    data: {
      investmentTid,
      value,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updateInvestmentTransaction({ id: investmentTid, value, dbTxn })
      const investTxn = await db.getInvestmentTransaction({ id: investmentTid, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return investTxn
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
}
