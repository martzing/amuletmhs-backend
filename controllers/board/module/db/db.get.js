// const moment = require('helpers/moment')
// onst CustomError = require('helpers/custom-error')

module.exports = ({ models }) => ({
  getBoards: async ({
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
        name: {
          [Op.like]: `%${searchText}%`
        }
      }
    }
    if (where) options.where = where
    const boards = await models.Board.findAll(options)
    return boards
  },
})
