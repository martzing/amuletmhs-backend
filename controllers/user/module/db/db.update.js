module.exports = ({ models }) => ({
  updateTransferTransaction: async ({
    id,
    paymentTidUUID,
    requestTid,
    status,
    errorMessage,
    dbTxn,
  }) => {
    const _value = {
      request_tid: requestTid,
      payment_tid_uuid: paymentTidUUID,
      status,
      error_message: errorMessage,
    }
    const value = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of Object.entries(_value)) {
      if (v !== undefined) {
        value[k] = v
      }
    }

    const options = {
      where: {
        id,
      },
    }
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    await models.TransferTransaction.update(value, options)
  },
  updateUser: async ({ id, value, dbTxn }) => {
    const options = {
      where: {
        id,
      },
    }
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }
    await models.User.update(value, options)
  },
})
