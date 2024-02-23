const express = require('express');
const { regUser, logUser } = require('../controller/usercontroler');
const router = express.Router();

router.post('/register',regUser);
 
router.post('/login',logUser);

module.exports = router;