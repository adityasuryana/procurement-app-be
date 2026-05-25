const express = require('express');

const { getAllQrContacts, getQrContactById, createQrContact, updateQrContact, deleteQrContact } = require('../controller/qrcontact');

const router = express.Router();

router.get('/', getAllQrContacts);
router.get('/:id', getQrContactById);
router.post('/', createQrContact);
router.put('/:id', updateQrContact);
router.delete('/:id', deleteQrContact);

module.exports = router;