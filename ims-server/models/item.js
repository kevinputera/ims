module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "item",
    {
      itemId: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
      },
      startQuantity: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
      }
    }
  );

  Item.associate = models => {
    Item.hasMany(models.transaction);
  };

  return Item;
};
