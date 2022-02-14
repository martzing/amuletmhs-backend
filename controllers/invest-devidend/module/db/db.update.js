module.exports = ({ models }) => ({
  updateInvestmentTransaction: async ({ id, value, dbTxn }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    await models.InvestmentTransaction.update(value, options)
  },
  updateDividendTransaction: async ({ id, value, dbTxn }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    await models.DividendTransaction.update(value, options)
  },
})
