// const moment = require('helpers/moment')
// onst CustomError = require('helpers/custom-error')

module.exports = ({ models }) => ({
  getInvestmentTransaction: async ({
    id,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
      include: [
        {
          model: models.User,
        },
        {
          model: models.User,
          as: 'FromUser'
        },
      ],
    }
    const investTxn = await models.InvestmentTransaction.findOne(options)
    return investTxn
  },
  getInvestmentTransactions: async ({
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
        },
        {
          model: models.User,
          as: 'FromUser'
        },
      ],
    }
    if (searchText !== undefined) {
      where = {
        remark: {
          [Op.like]: `%${searchText}%`
        }
      }
    }
    if (where) options.where = where
    if (offset !== undefined) options.offset = offset
    if (limit !== undefined) options.limit = limit
    const investTxns = await models.InvestmentTransaction.findAll(options)
    return investTxns
  },
})
