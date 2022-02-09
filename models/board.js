module.exports = (sequelize, DataType) => {
  const Board = sequelize.define('Board',
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
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      cost: {
        type: DataType.DECIMAL,
        allowNull: false,
      },
      total_ticket: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      ticket_price: {
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
      tableName: 'board',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  Board.associate = (models) => {
    models.Board.belongsTo(models.User, { foreignKey: 'user_id' })
    models.Board.hasMany(models.BoardItemList, { foreignKey: 'board_id' })
  }

  return Board
}
