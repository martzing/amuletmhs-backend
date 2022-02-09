module.exports = (sequelize, DataType) => {
  const DividendTransaction = sequelize.define('DividendTransaction',
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
      to_user_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataType.DECIMAL,
        allowNull: false,
      },
      bank_slip_image: {
        type: DataType.STRING,
        allowNull: false,
      },
      remark: {
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
      tableName: 'dividend_transaction',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  DividendTransaction.associate = (models) => {
    models.DividendTransaction.belongsTo(models.User, { foreignKey: 'user_id' })
    models.DividendTransaction.belongsTo(models.User, { as: 'ToUser', foreignKey: 'to_user_id' })
  }

  return DividendTransaction
}
