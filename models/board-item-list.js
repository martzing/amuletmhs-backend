module.exports = (sequelize, DataType) => {
  const BoardItemList = sequelize.define('BoardItemList',
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      user_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      board_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      customer_name: {
        type: DataType.STRING,
        allowNull: false,
      },
      sell_ticket_amount: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      free_ticket_amount: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'board_item_list',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  BoardItemList.associate = (models) => {
    models.BoardItemList.belongsTo(models.User, { foreignKey: 'user_id' })
    models.BoardItemList.belongsTo(models.Board, { foreignKey: 'board_id' })
  }

  return BoardItemList
}
