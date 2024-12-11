const express = require('express')
const app = express.Router();
const controller = require('../controllers/customer.controller');

//define routes here

// match GET localhost:4000/products
app.get("/", controller.get);

// match GET localhost:4000/products/[id]
app.get("/:id", controller.getById);

app.get("/:id", controller.getByName);

app.post("/", controller.create);

app.put("/:id", controller.put);

app.patch("/:id", controller.patch);

app.delete("/:id", controller.delete);

module.exports = app;