const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);
router.get('/', userCtrl.getAllUsers);

module.exports = router;