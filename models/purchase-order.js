module.exports = (sequelize, DataType) => {
  const PurchaseOrder = sequelize.define('PurchaseOrder',
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
      supplier_name: {
        type: DataType.STRING,
        allowNull: false,
      },
      total_price: {
        type: DataType.DECIMAL,
        allowNull: false,
      },
      bank_slip_image: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
      },
      receipt_image: {
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
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
      tableName: 'purchase_order',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  PurchaseOrder.associate = (models) => {
    models.PurchaseOrder.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  return PurchaseOrder
}
