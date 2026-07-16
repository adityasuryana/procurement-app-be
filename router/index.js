const express = require('express');
const router = express.Router();
const os = require('os');
const user = require('./user');
const auth = require('./auth');
const qrcontact = require('./qrcontact');
const qrasset = require('./qrasset');
const partner = require('./partner');
const upload = require('./upload');
const career = require('./career');
const reto = require('./reto');

router.get('/server-ip', (req, res) => {
    const interfaces = os.networkInterfaces();
    let ip = '127.0.0.1';
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if ((iface.family === 'IPv4' || iface.family === 4) && !iface.internal) {
                ip = iface.address;
                break;
            }
        }
    }
    res.json({ ip });
});

router.use('/users', user);
router.use('/auth', auth);
router.use('/qrcontact', qrcontact);
router.use('/qrasset', qrasset);
router.use('/partner', partner);
router.use('/upload', upload);
router.use('/career', career);
router.use('/reto', reto);

module.exports = router;
