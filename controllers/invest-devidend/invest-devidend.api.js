const logger = require('helpers/logger')
const db = require('controllers/invest-devidend/module/db')
const validate = require('controllers/invest-devidend/module/validate')
const ctrl = require('controllers/invest-devidend/invest-devidend.ctrl')
const fs = require('controllers/file-system/file-system.ctrl')
const formParser = require('helpers/form-parser')

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
      const { fields, files } = await formParser.parse(req)
      const data = await validate.createInvestmentTransaction({ fields, files, req })
      const result = await ctrl.createInvestmentTransaction({
        func: { db, fs },
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
      const { fields, files } = await formParser.parse(req)
      const data = await validate.updateInvestmentTransaction({ fields, files, req })
      const result = await ctrl.updateInvestmentTransaction({
        func: { db, fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getDividendTransactionAdapter: async (req, res) => {
    try {
      const data = await validate.getDividendTransaction(req)
      const result = await ctrl.getDividendTransaction({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getDividendTransactionsAdapter: async (req, res) => {
    try {
      const data = await validate.getDividendTransactions(req)
      const result = await ctrl.getDividendTransactions({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createDividendTransactionAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.createDividendTransaction({ fields, files, req })
      const result = await ctrl.createDividendTransaction({
        func: { db, fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updateDividendTransactionAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.updateDividendTransaction({ fields, files, req })
      const result = await ctrl.updateDividendTransaction({
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
