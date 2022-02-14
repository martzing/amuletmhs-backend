// const CustomError = require('helpers/custom-error')
const logger = require('helpers/logger')
// const uuid = require('uuid')
// const configs = require('configs')

module.exports = {
  getPurchaseOrder: async ({
    func: { db },
    data: {
      purchaseOrderId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const po = await db.getPurchaseOrder({
        id: purchaseOrderId,
        isInclude: true,
        dbTxn,
      })
      if (!po) throw new CustomError('Purchase order not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      // TODO handle format
      return po
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getPurchaseOrders: async ({
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
      const pos = await db.getPurchaseOrders({
        offset,
        limit,
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return pos
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createPurchaseOrder: async ({
    func: { db },
    data,
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      console.log(data)
      const po = await db.createPurchaseOrder({ value: data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return po
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updatePurchaseOrder: async ({
    func: { db },
    data: {
      purchaseOrderId,
      value,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updatePurchaseOrder({ id: purchaseOrderId, value, dbTxn })
      const po = await db.getPurchaseOrder({ id: purchaseOrderId, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return po
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getPurchaseOrderLists: async ({
    func: { db },
    data: {
      purchaseOrderId
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const pols = await db.getPurchaseOrderLists({
        purchaseOrderId,
        isInclude: true,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return pols
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createPurchaseOrderList: async ({
    func: { db },
    data,
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      console.log(data)
      const pol = await db.createPurchaseOrderList({ value: data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return pol
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updatePurchaseOrderList: async ({
    func: { db },
    data: {
      purchaseOrderListId,
      value,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updatePurchaseOrderList({ id: purchaseOrderListId, value, dbTxn })
      const po = await db.getPurchaseOrderList({ id: purchaseOrderListId, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return po
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getUtilityPayment: async ({
    func: { db },
    data: {
      utilityPaymentId,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      const utilPayment = await db.getUtilityPayment({
        id: utilityPaymentId,
        dbTxn,
      })
      if (!utilPayment) throw new CustomError('Utility payment not found.')
      dbTxn = await db.commitTransaction({ dbTxn })
      return utilPayment
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  getUtilityPayments: async ({
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
      const utilPayments = await db.getUtilityPayments({
        offset,
        limit,
        searchText,
        dbTxn,
      })
      dbTxn = await db.commitTransaction({ dbTxn })
      return utilPayments
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  createUtilityPayment: async ({
    func: { db },
    data,
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      console.log(data)
      const utilPayment = await db.createUtilityPayment({ value: data, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return utilPayment
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
  updateUtilityPayment: async ({
    func: { db },
    data: {
      utilityPaymentId,
      value,
    },
  }) => {
    let dbTxn
    try {
      dbTxn = await db.beginTransaction({ dbTxn })
      await db.updateUtilityPayment({ id: utilityPaymentId, value, dbTxn })
      const utilPayment = await db.getUtilityPayment({ id: utilityPaymentId, dbTxn })
      dbTxn = await db.commitTransaction({ dbTxn })
      return utilPayment
    } catch (err) {
      await db.rollbackTransaction({ dbTxn })
      throw err
    }
  },
}
