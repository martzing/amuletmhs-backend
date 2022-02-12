module.exports = ({ models }) => ({
  updatePurchaseOrder: async ({ id, value, dbTxn }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    await models.PurchaseOrder.update(value, options)
  },
  updatePurchaseOrderList: async ({ id, value, dbTxn }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    await models.PurchaseOrderList.update(value, options)
  },
})
