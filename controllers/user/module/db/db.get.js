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
  getUserByUsername: async ({
    username,
    dbTxn,
  }) => {
    const options = {
      where: { username },
      transaction: dbTxn,
    }
    const user = await models.User.findOne(options)
    return user
  },
  getUser: async ({
    id,
    dbTxn,
  }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    const user = await models.User.findOne(options)
    return user
  },
})
