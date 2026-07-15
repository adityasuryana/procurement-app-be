const express = require('express');

const {
    getAllQrInventories,
    getQrInventoryById,
    createQrInventory,
    updateQrInventory,
    deleteQrInventory,
    downloadPdf
} = require('../controller/qrinventory');

const router = express.Router();

router.get('/', getAllQrInventories);
router.get('/pdf/:id', downloadPdf);
router.get('/:id', getQrInventoryById);
router.post('/', createQrInventory);
router.put('/:id', updateQrInventory);
router.delete('/:id', deleteQrInventory);

module.exports = router;
