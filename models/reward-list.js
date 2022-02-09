module.exports = (sequelize, DataType) => {
  const RewardList = sequelize.define('RewardList',
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      board_item_list_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      type_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataType.STRING,
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
      tableName: 'reward_list',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  RewardList.associate = (models) => {
    models.RewardList.belongsTo(models.RewardType, { foreignKey: 'type_id' })
    models.RewardList.belongsTo(models.BoardItemList, { foreignKey: 'board_item_list_id' })
  }

  return RewardList
}
