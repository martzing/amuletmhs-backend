module.exports = (sequelize, DataType) => {
  const UtilityPayment = sequelize.define('UtilityPayment',
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
      price: {
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
      tableName: 'utility_payment',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  UtilityPayment.associate = (models) => {
    models.UtilityPayment.belongsTo(models.User, { foreignKey: 'user_id' })
  }

  return UtilityPayment
}
