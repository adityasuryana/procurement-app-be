const express = require('express');
const { login, register } = require('../controller/auth');
const authenticate = require('../middleware/authenticate');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// POST /api/auth/login    — Public
router.post('/login', login);

// POST /api/auth/register — Admin only
router.post('/register', authenticate, requireAdmin, register);

module.exports = router;
