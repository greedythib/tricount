const express = require('express');
const User = require("../models/users");
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/', userCtrl.createUser);
router.get('/:name', userCtrl.getUser);
router.put('/:name', userCtrl.modifyUser); // TODO
router.delete('/:name', userCtrl.deleteUser);
router.get('/', userCtrl.getAllUsers);

module.exports = router;