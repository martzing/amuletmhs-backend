module.exports = ({ models }) => ({
  createToken: async ({
    value,
    dbTxn,
  }) => {
    const options = {}
    if (dbTxn !== undefined) {
      options.transaction = dbTxn
    }

    const token = await models.Token.create(value, options)
    return token
  },
})
