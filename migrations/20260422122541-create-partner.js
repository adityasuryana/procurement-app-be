'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING
      },
      npwpNumber: {
        type: Sequelize.STRING
      },
      sppkpNumber: {
        type: Sequelize.STRING
      },
      fileNpwpSppkp: {
        type: Sequelize.STRING
      },
      pjName: {
        type: Sequelize.STRING
      },
      pjPosition: {
        type: Sequelize.STRING
      },
      companyPhone: {
        type: Sequelize.STRING
      },
      pjPhone: {
        type: Sequelize.STRING
      },
      address1: {
        type: Sequelize.STRING
      },
      address2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      fileDomicile: {
        type: Sequelize.STRING
      },
      establishmentDeed: {
        type: Sequelize.STRING
      },
      latestAmendmentDeed: {
        type: Sequelize.STRING
      },
      nibNumber: {
        type: Sequelize.STRING
      },
      siupNumber: {
        type: Sequelize.STRING
      },
      fileDeed: {
        type: Sequelize.STRING
      },
      investmentStatus: {
        type: Sequelize.STRING
      },
      nibAmendmentDetails: {
        type: Sequelize.STRING
      },
      nibDateNumber: {
        type: Sequelize.STRING
      },
      certificate1Name: {
        type: Sequelize.STRING
      },
      certificate1Number: {
        type: Sequelize.STRING
      },
      certificate1Validity: {
        type: Sequelize.STRING
      },
      certificate1Issuer: {
        type: Sequelize.STRING
      },
      certificate2Name: {
        type: Sequelize.STRING
      },
      certificate2Number: {
        type: Sequelize.STRING
      },
      certificate2Validity: {
        type: Sequelize.STRING
      },
      certificate2Issuer: {
        type: Sequelize.STRING
      },
      fileCertificates: {
        type: Sequelize.STRING
      },
      fileOrgStructure: {
        type: Sequelize.STRING
      },
      fileEquipmentList: {
        type: Sequelize.STRING
      },
      fileExperienceList: {
        type: Sequelize.STRING
      },
      fileFinancialAudit: {
        type: Sequelize.STRING
      },
      fileBankStatement: {
        type: Sequelize.STRING
      },
      fileApplicationLetter: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('partners');
  }
};