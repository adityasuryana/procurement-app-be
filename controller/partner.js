const { uploadToCloudinary } = require('../middleware/upload');
const { partner } = require('../models');

const getAllPartners = async (req, res) => {
    try {
        const partners = await partner.findAll();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPartnerById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundPartner = await partner.findByPk(id);
        if (!foundPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.status(200).json(foundPartner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createPartner = async (req, res) => {
    try {
        const {
            companyName,
            npwpNumber,
            sppkpNumber,
            pjName,
            pjPosition,
            companyPhone,
            pjPhone,
            address1,
            address2,
            city,
            postalCode,
            nibNumber,
            siupNumber,
            investmentStatus,
            nibAmendmentDetails,
            nibDateNumber,
            certificate1Name,
            certificate1Number,
            certificate1Validity,
            certificate1Issuer,
            certificate2Name,
            certificate2Number,
            certificate2Validity,
            certificate2Issuer,
            status
        } = req.body;

        // Dynamic helper to upload to Cloudinary if file is present in multipart form, otherwise fallback to req.body
        const getFileUrl = async (fieldName) => {
            if (req.files && req.files[fieldName] && req.files[fieldName][0]) {
                const file = req.files[fieldName][0];
                const uploadResult = await uploadToCloudinary(file.buffer, file.originalname);
                return uploadResult.secure_url;
            }
            return req.body[fieldName] || null;
        };

        const [
            fileNpwpSppkpUrl,
            fileDomicileUrl,
            establishmentDeedUrl,
            latestAmendmentDeedUrl,
            fileDeedUrl,
            fileCertificatesUrl,
            fileOrgStructureUrl,
            fileEquipmentListUrl,
            fileExperienceListUrl,
            fileFinancialAuditUrl,
            fileBankStatementUrl,
            fileApplicationLetterUrl
        ] = await Promise.all([
            getFileUrl('fileNpwpSppkp'),
            getFileUrl('fileDomicile'),
            getFileUrl('establishmentDeed'),
            getFileUrl('latestAmendmentDeed'),
            getFileUrl('fileDeed'),
            getFileUrl('fileCertificates'),
            getFileUrl('fileOrgStructure'),
            getFileUrl('fileEquipmentList'),
            getFileUrl('fileExperienceList'),
            getFileUrl('fileFinancialAudit'),
            getFileUrl('fileBankStatement'),
            getFileUrl('fileApplicationLetter')
        ]);

        const newPartner = await partner.create({
            companyName,
            npwpNumber,
            sppkpNumber,
            fileNpwpSppkp: fileNpwpSppkpUrl,
            pjName,
            pjPosition,
            companyPhone,
            pjPhone,
            address1,
            address2,
            city,
            postalCode,
            fileDomicile: fileDomicileUrl,
            establishmentDeed: establishmentDeedUrl,
            latestAmendmentDeed: latestAmendmentDeedUrl,
            nibNumber,
            siupNumber,
            fileDeed: fileDeedUrl,
            investmentStatus,
            nibAmendmentDetails,
            nibDateNumber,
            certificate1Name,
            certificate1Number,
            certificate1Validity,
            certificate1Issuer,
            certificate2Name,
            certificate2Number,
            certificate2Validity,
            certificate2Issuer,
            fileCertificates: fileCertificatesUrl,
            fileOrgStructure: fileOrgStructureUrl,
            fileEquipmentList: fileEquipmentListUrl,
            fileExperienceList: fileExperienceListUrl,
            fileFinancialAudit: fileFinancialAuditUrl,
            fileBankStatement: fileBankStatementUrl,
            fileApplicationLetter: fileApplicationLetterUrl,
            status: status || 'Pending'
        });

        res.status(201).json(newPartner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updatePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            companyName,
            npwpNumber,
            sppkpNumber,
            pjName,
            pjPosition,
            companyPhone,
            pjPhone,
            address1,
            address2,
            city,
            postalCode,
            nibNumber,
            siupNumber,
            investmentStatus,
            nibAmendmentDetails,
            nibDateNumber,
            certificate1Name,
            certificate1Number,
            certificate1Validity,
            certificate1Issuer,
            certificate2Name,
            certificate2Number,
            certificate2Validity,
            certificate2Issuer,
            status,
            alasanDitolak,
            alasanDisetujui,
            fileDitolak,
            evaluation
        } = req.body;

        const foundPartner = await partner.findByPk(id);
        if (!foundPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        // Helper to handle updating file fields: uploads if new file provided, falls back to body value, or keeps existing DB value
        const getFileUrl = async (fieldName) => {
            if (req.files && req.files[fieldName] && req.files[fieldName][0]) {
                const file = req.files[fieldName][0];
                const uploadResult = await uploadToCloudinary(file.buffer, file.originalname);
                return uploadResult.secure_url;
            }
            if (req.body[fieldName] !== undefined) {
                return req.body[fieldName];
            }
            return foundPartner[fieldName];
        };

        const [
            fileNpwpSppkpUrl,
            fileDomicileUrl,
            establishmentDeedUrl,
            latestAmendmentDeedUrl,
            fileDeedUrl,
            fileCertificatesUrl,
            fileOrgStructureUrl,
            fileEquipmentListUrl,
            fileExperienceListUrl,
            fileFinancialAuditUrl,
            fileBankStatementUrl,
            fileApplicationLetterUrl
        ] = await Promise.all([
            getFileUrl('fileNpwpSppkp'),
            getFileUrl('fileDomicile'),
            getFileUrl('establishmentDeed'),
            getFileUrl('latestAmendmentDeed'),
            getFileUrl('fileDeed'),
            getFileUrl('fileCertificates'),
            getFileUrl('fileOrgStructure'),
            getFileUrl('fileEquipmentList'),
            getFileUrl('fileExperienceList'),
            getFileUrl('fileFinancialAudit'),
            getFileUrl('fileBankStatement'),
            getFileUrl('fileApplicationLetter')
        ]);

        foundPartner.companyName = companyName !== undefined ? companyName : foundPartner.companyName;
        foundPartner.npwpNumber = npwpNumber !== undefined ? npwpNumber : foundPartner.npwpNumber;
        foundPartner.sppkpNumber = sppkpNumber !== undefined ? sppkpNumber : foundPartner.sppkpNumber;
        foundPartner.fileNpwpSppkp = fileNpwpSppkpUrl;
        foundPartner.pjName = pjName !== undefined ? pjName : foundPartner.pjName;
        foundPartner.pjPosition = pjPosition !== undefined ? pjPosition : foundPartner.pjPosition;
        foundPartner.companyPhone = companyPhone !== undefined ? companyPhone : foundPartner.companyPhone;
        foundPartner.pjPhone = pjPhone !== undefined ? pjPhone : foundPartner.pjPhone;
        foundPartner.address1 = address1 !== undefined ? address1 : foundPartner.address1;
        foundPartner.address2 = address2 !== undefined ? address2 : foundPartner.address2;
        foundPartner.city = city !== undefined ? city : foundPartner.city;
        foundPartner.postalCode = postalCode !== undefined ? postalCode : foundPartner.postalCode;
        foundPartner.fileDomicile = fileDomicileUrl;
        foundPartner.establishmentDeed = establishmentDeedUrl;
        foundPartner.latestAmendmentDeed = latestAmendmentDeedUrl;
        foundPartner.nibNumber = nibNumber !== undefined ? nibNumber : foundPartner.nibNumber;
        foundPartner.siupNumber = siupNumber !== undefined ? siupNumber : foundPartner.siupNumber;
        foundPartner.fileDeed = fileDeedUrl;
        foundPartner.investmentStatus = investmentStatus !== undefined ? investmentStatus : foundPartner.investmentStatus;
        foundPartner.nibAmendmentDetails = nibAmendmentDetails !== undefined ? nibAmendmentDetails : foundPartner.nibAmendmentDetails;
        foundPartner.nibDateNumber = nibDateNumber !== undefined ? nibDateNumber : foundPartner.nibDateNumber;
        foundPartner.certificate1Name = certificate1Name !== undefined ? certificate1Name : foundPartner.certificate1Name;
        foundPartner.certificate1Number = certificate1Number !== undefined ? certificate1Number : foundPartner.certificate1Number;
        foundPartner.certificate1Validity = certificate1Validity !== undefined ? certificate1Validity : foundPartner.certificate1Validity;
        foundPartner.certificate1Issuer = certificate1Issuer !== undefined ? certificate1Issuer : foundPartner.certificate1Issuer;
        foundPartner.certificate2Name = certificate2Name !== undefined ? certificate2Name : foundPartner.certificate2Name;
        foundPartner.certificate2Number = certificate2Number !== undefined ? certificate2Number : foundPartner.certificate2Number;
        foundPartner.certificate2Validity = certificate2Validity !== undefined ? certificate2Validity : foundPartner.certificate2Validity;
        foundPartner.certificate2Issuer = certificate2Issuer !== undefined ? certificate2Issuer : foundPartner.certificate2Issuer;
        foundPartner.fileCertificates = fileCertificatesUrl;
        foundPartner.fileOrgStructure = fileOrgStructureUrl;
        foundPartner.fileEquipmentList = fileEquipmentListUrl;
        foundPartner.fileExperienceList = fileExperienceListUrl;
        foundPartner.fileFinancialAudit = fileFinancialAuditUrl;
        foundPartner.fileBankStatement = fileBankStatementUrl;
        foundPartner.fileApplicationLetter = fileApplicationLetterUrl;
        foundPartner.alasanDitolak = alasanDitolak !== undefined ? alasanDitolak : foundPartner.alasanDitolak;
        foundPartner.alasanDisetujui = alasanDisetujui !== undefined ? alasanDisetujui : foundPartner.alasanDisetujui;
        foundPartner.fileDitolak = fileDitolak !== undefined ? fileDitolak : foundPartner.fileDitolak;
        foundPartner.evaluation = evaluation !== undefined ? evaluation : foundPartner.evaluation;

        if (status) {
            if (status === 'Disetujui' && foundPartner.status !== 'Disetujui') {
                foundPartner.approvedAt = new Date();
            } else if (status !== 'Disetujui') {
                foundPartner.approvedAt = null;
            }
            foundPartner.status = status;
        }

        await foundPartner.save();
        res.status(200).json(foundPartner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deletePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const foundPartner = await partner.findByPk(id);
        if (!foundPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        await foundPartner.destroy();
        res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllPartners,
    getPartnerById,
    createPartner,
    updatePartner,
    deletePartner
};
