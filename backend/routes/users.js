const express = require('express');
const User = require("../models/users");
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/', userCtrl.createUser);
router.get('/:name', userCtrl.getUser);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);
router.get('/', userCtrl.getAllUsers);

module.exports = router;