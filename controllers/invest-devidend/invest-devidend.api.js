const logger = require('helpers/logger')
const db = require('controllers/invest-devidend/module/db')
const validate = require('controllers/invest-devidend/module/validate')
const ctrl = require('controllers/invest-devidend/invest-devidend.ctrl')
// const func = require('controllers/auth/auth.func')

module.exports = {
  getInvestmentTransactionAdapter: async (req, res) => {
    try {
      const data = await validate.getInvestmentTransaction(req)
      const result = await ctrl.getInvestmentTransaction({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getInvestmentTransactionsAdapter: async (req, res) => {
    try {
      const data = await validate.getInvestmentTransactions(req)
      const result = await ctrl.getInvestmentTransactions({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createInvestmentTransactionAdapter: async (req, res) => {
    try {
      const data = await validate.createInvestmentTransaction(req)
      const result = await ctrl.createInvestmentTransaction({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updateInvestmentTransactiontionAdapter: async (req, res) => {
    try {
      const data = await validate.updateInvestmentTransaction(req)
      const result = await ctrl.updateInvestmentTransaction({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
}