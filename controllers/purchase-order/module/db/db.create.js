const moment = require('helpers/moment')

module.exports = ({ models }) => ({
  createPurchaseOrder: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }
    const result = await models.PurchaseOrder.create(value, options)
    return result
  },
  createPurchaseOrderList: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }
    const result = await models.PurchaseOrderList.create(value, options)
    return result
  },
  createUtilityPayment: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }
    const result = await models.UtilityPayment.create(value, options)
    return result
  },
})
