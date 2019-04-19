module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
    {
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
      },
      customerTaxId: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
      }
    }
  );

  return Customer;
};
