const logger = require('helpers/logger')
const db = require('controllers/purchase-order/module/db')
const validate = require('controllers/purchase-order/module/validate')
const ctrl = require('controllers/purchase-order/purchase-order.ctrl')
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
      const data = await validate.createPurchaseOrder(req)
      const result = await ctrl.createPurchaseOrder({
        func: { db, },
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
      const data = await validate.updatePurchaseOrder(req)
      const result = await ctrl.updatePurchaseOrder({
        func: { db, },
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
      const data = await validate.createPurchaseOrderList(req)
      const result = await ctrl.createPurchaseOrderList({
        func: { db, },
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
      const data = await validate.updatePurchaseOrderList(req)
      const result = await ctrl.updatePurchaseOrderList({
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
