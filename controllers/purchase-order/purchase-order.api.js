const logger = require('helpers/logger')
const db = require('controllers/purchase-order/module/db')
const validate = require('controllers/purchase-order/module/validate')
const ctrl = require('controllers/purchase-order/purchase-order.ctrl')
const fs = require('controllers/file-system/file-system.ctrl')
const formParser = require('helpers/form-parser')
// const func = require('controllers/auth/auth.func')

module.exports = {
  getPurchaseOrderAdapter: async (req, res) => {
    try {
      const data = await validate.getPurchaseOrder(req)
      const result = await ctrl.getPurchaseOrder({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getPurchaseOrdersAdapter: async (req, res) => {
    try {
      const data = await validate.getPurchaseOrders(req)
      const result = await ctrl.getPurchaseOrders({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createPurchaseOrderAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.createPurchaseOrder({ fields, files, req })
      const result = await ctrl.createPurchaseOrder({
        func: { db,fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updatePurchaseOrderAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.updatePurchaseOrder({ fields, files, req })
      const result = await ctrl.updatePurchaseOrder({
        func: { db, fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getPurchaseOrderListsAdapter: async (req, res) => {
    try {
      const data = await validate.getPurchaseOrderLists(req)
      const result = await ctrl.getPurchaseOrderLists({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createPurchaseOrderListAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.createPurchaseOrderList({ fields, files })
      const result = await ctrl.createPurchaseOrderList({
        func: { db, fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updatePurchaseOrderListAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.updatePurchaseOrderList({ fields, files })
      const result = await ctrl.updatePurchaseOrderList({
        func: { db, fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getUtilityPaymentAdapter: async (req, res) => {
    try {
      const data = await validate.getUtilityPayment(req)
      const result = await ctrl.getUtilityPayment({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  getUtilityPaymentsAdapter: async (req, res) => {
    try {
      const data = await validate.getUtilityPayments(req)
      const result = await ctrl.getUtilityPayments({
        func: { db, },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  createUtilityPaymentAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.createUtilityPayment({ fields, files, req })
      const result = await ctrl.createUtilityPayment({
        func: { db, fs },
        data,
      })
      return res.json(result)
    } catch (err) {
      logger.error(err)
      return res.json({ msg: err.message })
    }
  },
  updateUtilityPaymentAdapter: async (req, res) => {
    try {
      const { fields, files } = await formParser.parse(req)
      const data = await validate.updateUtilityPayment({ fields, files, req })
      const result = await ctrl.updateUtilityPayment({
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
