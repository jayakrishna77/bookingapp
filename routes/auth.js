const express = require('express');
const { register, login } = require('../controllers/authControl');

const router = express.Router();
// new user creating
router.post('/register', register);
// signIn user
router.post('/login', login)


module.exports = router;