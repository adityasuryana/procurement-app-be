const express = require('express');
const { getAllUsers, getById, updateUser, deleteUser } = require('../controller/user');
const authenticate = require('../middleware/authenticate');
const requireAdmin = require('../middleware/requireAdmin');
const router = express.Router();

// GET /api/users       — Admin only (list all accounts)
router.get('/', authenticate, requireAdmin, getAllUsers);

// GET /api/users/:id   — Any authenticated user (own profile)
router.get('/:id', authenticate, getById);

// PUT /api/users/:id   — Any authenticated user (own profile update)
router.put('/:id', authenticate, updateUser);

// DELETE /api/users/:id — Admin only
router.delete('/:id', authenticate, requireAdmin, deleteUser);

module.exports = router;
