module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User',
    {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: DataType.STRING,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataType.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataType.STRING,
        allowNull: false,
      },
      display_name: {
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
      tableName: 'user',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  User.associate = (models) => {
    models.User.hasMany(models.Board, { foreignKey: 'user_id' })
    models.User.hasMany(models.BoardItemList, { foreignKey: 'user_id' })
    models.User.hasMany(models.DividendTransaction, { foreignKey: 'user_id' })
    models.User.hasMany(models.DividendTransaction, { as: 'DividendUser', foreignKey: 'to_user_id' })
    models.User.hasMany(models.InvestmentTransaction, { foreignKey: 'user_id' })
    models.User.hasMany(models.InvestmentTransaction, { as: 'InvestmentUser', foreignKey: 'from_user_id' })
    models.User.hasMany(models.PurchaseOrder, { foreignKey: 'user_id' })
    models.User.hasMany(models.UtilityPayment, { foreignKey: 'user_id' })
  }

  return User
}
