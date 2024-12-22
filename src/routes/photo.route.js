const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo.controller');  // นำเข้า controller

router.get('/photos', photoController.getAllPhotos);

router.get('/photos/:id', photoController.getPhotoById);

router.post('/photos', photoController.uploadPhoto);

router.put('/photos/:id', photoController.updatePhoto);

router.delete('/photos/:id', photoController.deletePhoto);

module.exports = router;
