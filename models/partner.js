'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  partner.init({
    companyName: DataTypes.STRING,
    npwpNumber: DataTypes.STRING,
    sppkpNumber: DataTypes.STRING,
    fileNpwpSppkp: DataTypes.STRING,
    pjName: DataTypes.STRING,
    pjPosition: DataTypes.STRING,
    companyPhone: DataTypes.STRING,
    pjPhone: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    fileDomicile: DataTypes.STRING,
    establishmentDeed: DataTypes.STRING,
    latestAmendmentDeed: DataTypes.STRING,
    nibNumber: DataTypes.STRING,
    siupNumber: DataTypes.STRING,
    fileDeed: DataTypes.STRING,
    investmentStatus: DataTypes.STRING,
    nibAmendmentDetails: DataTypes.STRING,
    nibDateNumber: DataTypes.STRING,
    certificate1Name: DataTypes.STRING,
    certificate1Number: DataTypes.STRING,
    certificate1Validity: DataTypes.STRING,
    certificate1Issuer: DataTypes.STRING,
    certificate2Name: DataTypes.STRING,
    certificate2Number: DataTypes.STRING,
    certificate2Validity: DataTypes.STRING,
    certificate2Issuer: DataTypes.STRING,
    fileCertificates: DataTypes.STRING,
    fileOrgStructure: DataTypes.STRING,
    fileEquipmentList: DataTypes.STRING,
    fileExperienceList: DataTypes.STRING,
    fileFinancialAudit: DataTypes.STRING,
    fileBankStatement: DataTypes.STRING,
    fileApplicationLetter: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    alasanDitolak: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    alasanDisetujui: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fileDitolak: {
      type: DataTypes.STRING,
      allowNull: true
    },
    evaluation: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'partner',
  });
  return partner;
};