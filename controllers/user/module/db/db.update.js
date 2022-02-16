module.exports = ({ models }) => ({
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
