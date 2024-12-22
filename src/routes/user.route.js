const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route: Register a new user
router.post('/register', userController.register);

// Route: User login
router.post('/login', userController.login);

// Route: Get user details
router.get('/:id', userController.getUserById);

// Route: Update user information
router.put('/:id', userController.updateUser);

// Route: Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
