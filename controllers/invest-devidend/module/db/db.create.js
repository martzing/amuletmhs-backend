const moment = require('helpers/moment')

module.exports = ({ models }) => ({
  createInvestmentTransaction: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    const result = await models.InvestmentTransaction.create(value, options)
    return result
  },
})
