const express = require('express');
const app = express.Router();
const controller = require('../controllers/location.controller');

app.get("/", controller.getAllLocations);       
app.get("/:id", controller.getLocationById);    
app.post("/", controller.createLocation);      
app.put("/:id", controller.updateLocation);   
app.delete("/:id", controller.deleteLocation); 

module.exports = app;
