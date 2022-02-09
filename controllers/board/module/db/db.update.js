module.exports = ({ models }) => ({
  updateBoard: async ({ id, value, dbTxn }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    await models.Board.update(value, options)
  },
  updateBoardItemList: async ({ id, value, dbTxn }) => {
    const options = {
      where: { id },
      transaction: dbTxn,
    }
    await models.BoardItemList.update(value, options)
  },
})
