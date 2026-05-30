const express = require('express');
const { getAllPartners, getPartnerById, createPartner, updatePartner, deletePartner } = require('../controller/partner');
const { upload } = require('../middleware/upload');
const router = express.Router();

// Define all files fields expected from the partner (mitra) form
const partnerUploadFields = upload.fields([
    { name: 'fileNpwpSppkp', maxCount: 1 },
    { name: 'fileDomicile', maxCount: 1 },
    { name: 'establishmentDeed', maxCount: 1 },
    { name: 'latestAmendmentDeed', maxCount: 1 },
    { name: 'fileDeed', maxCount: 1 },
    { name: 'fileCertificates', maxCount: 1 },
    { name: 'fileOrgStructure', maxCount: 1 },
    { name: 'fileEquipmentList', maxCount: 1 },
    { name: 'fileExperienceList', maxCount: 1 },
    { name: 'fileFinancialAudit', maxCount: 1 },
    { name: 'fileBankStatement', maxCount: 1 },
    { name: 'fileApplicationLetter', maxCount: 1 }
]);

router.get('/', getAllPartners);
router.get('/:id', getPartnerById);
router.post('/', partnerUploadFields, createPartner);
router.put('/:id', partnerUploadFields, updatePartner);
router.delete('/:id', deletePartner);

module.exports = router;