// const moment = require('helpers/moment')
// onst CustomError = require('helpers/custom-error')

module.exports = ({ models }) => ({
  getUsers: async ({
    dbTxn,
  }) => {
    const options = {
      transaction: dbTxn,
    }
    const users = await models.User.findAll(options)
    return users
  },
})
