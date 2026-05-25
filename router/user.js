const express = require('express');
const { getAllUsers, getById, updateUser, deleteUser } = require('../controller/user');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

