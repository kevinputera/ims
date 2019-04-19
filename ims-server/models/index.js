const config = require("../config.json");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("ims", "ims", "password", {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const Item = sequelize.import(`${__dirname}/item.js`);
const Customer = sequelize.import(`${__dirname}/customer.js`);
const Transaction = sequelize.import(`${__dirname}/transaction.js`);

const models = {};
models[Item.name] = Item;
models[Customer.name] = Customer;
models[Transaction.name] = Transaction;

Object.keys(models).forEach(model => {
  if (models[model].associate) {
    models[model].associate(models);
  }
});

module.exports = { sequelize, Item, Customer, Transaction };
