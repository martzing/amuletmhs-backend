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
  getDividendTransaction: async ({
    func: { db },
    data: {
      dividendTid,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const dividendTxn = await db.getDividendTransaction({ id: dividendTid, dbTxn })
      if (!dividendTxn) throw new CustomError('Dividend transaction not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      return dividendTxn
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getDividendTransactions: async ({
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
      const dividendTxns = await db.getDividendTransactions({
        offset,
        limit,
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return dividendTxns
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createDividendTransaction: async ({
    func: { db },
    data,
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const dividendTxn = await db.createDividendTransaction({ value: data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return dividendTxn
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updateDividendTransaction: async ({
    func: { db },
    data: {
      dividendTid,
      value,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updateDividendTransaction({ id: dividendTid, value, dbTxn })
      const dividendTxn = await db.getDividendTransaction({ id: dividendTid, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return dividendTxn
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
}
