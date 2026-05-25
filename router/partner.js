const express = require('express');
const { getAllPartners, getPartnerById, createPartner, updatePartner, deletePartner } = require('../controller/partner');
const router = express.Router();

router.get('/', getAllPartners);
router.get('/:id', getPartnerById);
router.post('/', createPartner);
router.put('/:id', updatePartner);
router.delete('/:id', deletePartner);

module.exports = router;