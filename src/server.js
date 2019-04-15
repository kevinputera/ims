const config = require("../src/config.js");

const express = require("express");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:${config.react_port}`);
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const { openDB } = require("idb");

// IndexedDB
async function initDB() {
  const db = await openDB("ims", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("items")) {
        let itemStore = db.createObjectStore("items", { keyPath: "itemId" });
        itemStore.createIndex("itemName", "itemName", { unique: false });
      }
      if (!db.objectStoreNames.contains("transactions")) {
        let itemStore = db.createObjectStore("transactions", {
          keyPath: "transactionId"
        });
        itemStore.createIndex("itemName", "itemName", { unique: false });
      }
      if (!db.objectStoreNames.contains("customers")) {
        let itemStore = db.createObjectStore("customers", {
          keyPath: "customerTaxId"
        });
        itemStore.createIndex("customerName", "customerName", {
          unique: false
        });
      }
    }
  });

  return db;
}

// Set up the server
// GET requests
app.get("/items", (req, res) => {
  initDB()
    .then(db => {
      db.getAll("items").then(obj => {
        res.status(200).json(obj);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get("/transactions", (req, res) => {
  initDB()
    .then(db => {
      db.getAll("transactions").then(obj => {
        res.status(200).json(obj);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get("/customers", (req, res) => {
  initDB()
    .then(db => {
      db.getAll("customers").then(obj => {
        res.status(200).json(obj);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

// PUT requests
app.put("/items/add", (req, res) => {
  initDB()
    .then(db => {
      db.put("items", req.body).then(() => {
        res.status(200).send(req.body);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.put("/transactions/add", (req, res) => {
  initDB()
    .then(db => {
      db.put("transactions", req.body).then(() => {
        res.status(200).send(req.body);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.put("/customers/add", (req, res) => {
  initDB()
    .then(db => {
      db.put("customers", req.body).then(() => {
        res.status(200).send(req.body);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

// DELETE requests
app.delete("/items/delete", (req, res) => {
  console.log(req.body);
  initDB()
    .then(db => {
      db.delete("items", req.body.itemId).then(() => {
        res.sendStatus(200);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.delete("/transactions/delete", (req, res) => {
  initDB()
    .then(db => {
      db.delete("transactions", req.body.transactionId).then(() => {
        res.sendStatus(200);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.delete("/customers/delete", (req, res) => {
  initDB()
    .then(db => {
      db.delete("customers", req.body.customerTaxId).then(() => {
        res.sendStatus(200);
      });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.listen(config.node_port);
