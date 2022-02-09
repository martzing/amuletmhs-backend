module.exports = (sequelize, DataType) => {
  const PurchaseOrderList = sequelize.define('PurchaseOrderList',
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      purchase_order_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      reward_type_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      price_per_unit: {
        type: DataType.DECIMAL,
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
      tableName: 'purchase_order_list',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  PurchaseOrderList.associate = (models) => {
    models.PurchaseOrderList.belongsTo(models.PurchaseOrder, { foreignKey: 'purchase_order_id' })
    models.PurchaseOrderList.belongsTo(models.RewardType, { foreignKey: 'reward_type_id' })
  }

  return PurchaseOrderList
}
