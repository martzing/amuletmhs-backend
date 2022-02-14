module.exports = (sequelize, DataType) => {
  const InvestmentTransaction = sequelize.define('InvestmentTransaction',
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
      from_user_id: {
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
      tableName: 'investment_transaction',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  InvestmentTransaction.associate = (models) => {
    models.InvestmentTransaction.belongsTo(models.User, { foreignKey: 'user_id' })
    models.InvestmentTransaction.belongsTo(models.User, { as: 'FromUser', foreignKey: 'from_user_id' })
  }

  return InvestmentTransaction
}
