module.exports = (sequelize, DataType) => {
  const Token = sequelize.define('Token',
    {
      id: {
        type: DataType.STRING,
        unique: true,
        primaryKey: true,
      },
      user_id: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      token_type: {
        type: DataType.ENUM('normal', 'refresh'),
        allowNull: false,
        defaultValue: 'normal',
      },
      expired_at: {
        type: DataType.DATE,
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
      tableName: 'token',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )

  Token.associate = (models) => {
    models.Token.belongsTo(models.User, { foreignKey: 'user_id' })
  }
  return Token
}
