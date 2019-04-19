module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "transaction",
    {
      transactionId: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
      },
      buy: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true
      },
      sell: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true
      }
    }
  );

  Transaction.associate = models => {
    Transaction.belongsTo(models.item);
  };

  return Transaction;
};
