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
            fileNpwpSppkp,
            pjName,
            pjPosition,
            companyPhone,
            pjPhone,
            address1,
            address2,
            city,
            postalCode,
            fileDomicile,
            establishmentDeed,
            latestAmendmentDeed,
            nibNumber,
            siupNumber,
            fileDeed,
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
            fileCertificates,
            fileOrgStructure,
            fileEquipmentList,
            fileExperienceList,
            fileFinancialAudit,
            fileBankStatement,
            fileApplicationLetter,
            status
        } = req.body;

        const newPartner = await partner.create({
            companyName,
            npwpNumber,
            sppkpNumber,
            fileNpwpSppkp,
            pjName,
            pjPosition,
            companyPhone,
            pjPhone,
            address1,
            address2,
            city,
            postalCode,
            fileDomicile,
            establishmentDeed,
            latestAmendmentDeed,
            nibNumber,
            siupNumber,
            fileDeed,
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
            fileCertificates,
            fileOrgStructure,
            fileEquipmentList,
            fileExperienceList,
            fileFinancialAudit,
            fileBankStatement,
            fileApplicationLetter,
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
            fileNpwpSppkp,
            pjName,
            pjPosition,
            companyPhone,
            pjPhone,
            address1,
            address2,
            city,
            postalCode,
            fileDomicile,
            establishmentDeed,
            latestAmendmentDeed,
            nibNumber,
            siupNumber,
            fileDeed,
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
            fileCertificates,
            fileOrgStructure,
            fileEquipmentList,
            fileExperienceList,
            fileFinancialAudit,
            fileBankStatement,
            fileApplicationLetter,
            status
        } = req.body;

        const foundPartner = await partner.findByPk(id);
        if (!foundPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        foundPartner.companyName = companyName;
        foundPartner.npwpNumber = npwpNumber;
        foundPartner.sppkpNumber = sppkpNumber;
        foundPartner.fileNpwpSppkp = fileNpwpSppkp;
        foundPartner.pjName = pjName;
        foundPartner.pjPosition = pjPosition;
        foundPartner.companyPhone = companyPhone;
        foundPartner.pjPhone = pjPhone;
        foundPartner.address1 = address1;
        foundPartner.address2 = address2;
        foundPartner.city = city;
        foundPartner.postalCode = postalCode;
        foundPartner.fileDomicile = fileDomicile;
        foundPartner.establishmentDeed = establishmentDeed;
        foundPartner.latestAmendmentDeed = latestAmendmentDeed;
        foundPartner.nibNumber = nibNumber;
        foundPartner.siupNumber = siupNumber;
        foundPartner.fileDeed = fileDeed;
        foundPartner.investmentStatus = investmentStatus;
        foundPartner.nibAmendmentDetails = nibAmendmentDetails;
        foundPartner.nibDateNumber = nibDateNumber;
        foundPartner.certificate1Name = certificate1Name;
        foundPartner.certificate1Number = certificate1Number;
        foundPartner.certificate1Validity = certificate1Validity;
        foundPartner.certificate1Issuer = certificate1Issuer;
        foundPartner.certificate2Name = certificate2Name;
        foundPartner.certificate2Number = certificate2Number;
        foundPartner.certificate2Validity = certificate2Validity;
        foundPartner.certificate2Issuer = certificate2Issuer;
        foundPartner.fileCertificates = fileCertificates;
        foundPartner.fileOrgStructure = fileOrgStructure;
        foundPartner.fileEquipmentList = fileEquipmentList;
        foundPartner.fileExperienceList = fileExperienceList;
        foundPartner.fileFinancialAudit = fileFinancialAudit;
        foundPartner.fileBankStatement = fileBankStatement;
        foundPartner.fileApplicationLetter = fileApplicationLetter;
        if (status) {
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
