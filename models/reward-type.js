module.exports = (sequelize, DataType) => {
  const RewardType = sequelize.define('RewardType',
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataType.STRING,
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
      tableName: 'reward_type',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  RewardType.associate = (models) => {
    models.RewardType.hasMany(models.RewardList, { foreignKey: 'type_id' })
    models.RewardType.hasMany(models.PurchaseOrderList, { foreignKey: 'reward_type_id' })
  }

  return RewardType
}
