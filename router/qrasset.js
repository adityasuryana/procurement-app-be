const express = require('express');

const {
    getAllQrAssets,
    getQrAssetById,
    getQrAssetByToken,
    createQrAsset,
    updateQrAsset,
    deleteQrAsset,
    downloadPdf
} = require('../controller/qrasset');

const router = express.Router();

router.get('/', getAllQrAssets);
router.get('/pdf/:id', downloadPdf);
router.get('/token/:token', getQrAssetByToken);
router.get('/:id', getQrAssetById);
router.post('/', createQrAsset);
router.put('/:id', updateQrAsset);
router.delete('/:id', deleteQrAsset);

module.exports = router;
