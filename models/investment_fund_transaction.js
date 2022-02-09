module.exports = (sequelize, DataType) => {
  const InvestmentFundTransaction = sequelize.define('InvestmentFundTransaction',
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
      tableName: 'investment_fund_transaction',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  InvestmentFundTransaction.associate = (models) => {
    models.InvestmentFundTransaction.belongsTo(models.User, { foreignKey: 'user_id' })
    models.InvestmentFundTransaction.belongsTo(models.User, { as: 'FromUser', foreignKey: 'from_user_id' })
  }

  return InvestmentFundTransaction
}
