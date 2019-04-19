const config = require("./config.json");

const express = require("express");
const app = express();

const { sequelize, Item, Customer, Transaction } = require("./models/index");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    `http://localhost:${config.react_port}`
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, GET, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Set up the server
// GET requests
app.get("/items", async (req, res) => {
  let data;
  try {
    await sequelize.sync();
    data = await Item.findAll();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/transactions", async (req, res) => {
  let data;
  try {
    await sequelize.sync();
    data = await Transaction.findAll();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/customers", async (req, res) => {
  let data;
  try {
    await sequelize.sync();
    data = await Customer.findAll();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST requests
app.post("/items/add", async (req, res) => {
  const data = req.body;
  try {
    await Item.create(data);

    res.status(201).json({ successful: true, ...data });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/transactions/add", async (req, res) => {
  const data = req.body;
  try {
    const item = await Item.findOne({ where: { itemId: data.itemId } });

    if (item === null) {
      throw new Error("Item not found");
    }

    const transaction = await Transaction.create({
      transactionId: data.transactionId,
      buy: data.buy,
      sell: data.sell
    });
    transaction.setItem(item);

    res.status(201).json({ successful: true, ...data });
  } catch (err) {
    if (err.message === "Item not found") {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
});

app.post("/customers/add", async (req, res) => {
  const data = req.body;
  try {
    await Customer.create(data);

    res.status(201).json({ successful: true, ...data });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE requests
app.delete("/items/delete", async (req, res) => {
  const data = req.body;
  try {
    const item = Item.findOne({ where: { itemId: data.itemId } });
    await Item.destroy({ where: { itemId: data.itemId } });

    res.status(200).send(item.dataValues);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/transactions/delete", async (req, res) => {
  const data = req.body;
  try {
    const transaction = Transaction.findOne({
      where: { transactionId: data.transactionId }
    });
    await Transaction.destroy({ where: { transactionId: data.transactionId } });

    res.status(200).send(transaction.dataValues);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/customers/delete", async (req, res) => {
  const data = req.body;
  try {
    const customer = Customer.findOne({
      where: { customerTaxId: data.customerTaxId }
    });
    await Customer.destroy({ where: { customerTaxId: data.customerTaxId } });

    res.status(200).send(customer.dataValues);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(config.node_port);
