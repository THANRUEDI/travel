const express = require('express');
const app = express.Router();
const controller = require('../controllers/register.controller');

// define routes here
app.post("/", controller.register);
module.exports = app;