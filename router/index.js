const express = require('express');
const router = express.Router();
const user = require('./user');
const auth = require('./auth');
const qrcontact = require('./qrcontact');
const partner = require('./partner');

router.use('/users', user);
router.use('/auth', auth);
router.use('/qrcontact', qrcontact);
router.use('/partner', partner);

module.exports = router;
