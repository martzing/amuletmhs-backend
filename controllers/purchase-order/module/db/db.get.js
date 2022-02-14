// const moment = require('helpers/moment')
// onst CustomError = require('helpers/custom-error')

module.exports = ({ models }) => ({
  getPurchaseOrder: async ({
    id,
    isInclude = false,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    const include = [
      {
        model: models.PurchaseOrderList,
      },
    ]
    if (isInclude) options.include = include
    const po = await models.PurchaseOrder.findOne(options)
    return po
  },
  getPurchaseOrders: async ({
    offset,
    limit,
    searchText,
    dbTxn,
  }) => {
    const { Op } = models
    let where
    const options = {
      transaction: dbTxn,
    }
    if (searchText !== undefined) {
      where = {
        supplier_name: {
          [Op.like]: `%${searchText}%`
        }
      }
    }
    if (where) options.where = where
    if (offset !== undefined) options.offset = offset
    if (limit !== undefined) options.limit = limit
    const pos = await models.PurchaseOrder.findAll(options)
    return pos
  },
  getPurchaseOrderLists: async ({
    purchaseOrderId,
    isInclude = false,
    dbTxn,
  }) => {
    const options = {
      where: { purchase_order_id: purchaseOrderId },
      transaction: dbTxn,
    }
    const include = [
      {
        model: models.RewardType,
      },
    ]
    if (isInclude) options.include = include
    const pols = await models.PurchaseOrderList.findAll(options)
    return pols
  },
  getPurchaseOrderList: async ({
    id,
    isInclude = false,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    const include = [
      {
        model: models.RewardType,
      },
    ]
    if (isInclude) options.include = include
    const pol = await models.PurchaseOrderList.findOne(options)
    return pol
  },
  getUtilityPayments: async ({
    offset,
    limit,
    searchText,
    dbTxn,
  }) => {
    const { Op } = models
    let where
    const options = {
      transaction: dbTxn,
      include: [
        {
          model: models.User,
        }
      ],
    }
    if (searchText !== undefined) {
      where = {
        name: {
          [Op.like]: `%${searchText}%`
        }
      }
    }
    if (where) options.where = where
    if (offset !== undefined) options.offset = offset
    if (limit !== undefined) options.limit = limit
    const utilPayments = await models.UtilityPayment.findAll(options)
    return utilPayments
  },
  getUtilityPayment: async ({
    id,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      include: [
        {
          model: models.User,
        }
      ],
      transaction: dbTxn,
    }
    const utilPayment = await models.UtilityPayment.findOne(options)
    return utilPayment
  },
})
