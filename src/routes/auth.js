const express = require('express');
const { login, register } = require('../controllers/authController');
const { validateLogin, validateRegistration } = require('../validators/authValidator');

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegistration, register);

module.exports = router;