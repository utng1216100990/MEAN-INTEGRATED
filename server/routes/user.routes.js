const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', user.register);
router.post('/authenticate', user.authenticate);
router.get('/profile', jwtHelper.verifyJwtToken, user.userProfile);

router.get('/users', user.getUsers);
router.get('/user/:id', user.getUser);
router.put('/user/:id', user.editUser);

router.post('/forgot', user.forgot);
router.post('/reset/:token', user.reset);

module.exports = router;