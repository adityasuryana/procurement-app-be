'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Retos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.STRING
      },
      typeUnit: {
        type: Sequelize.STRING
      },
      serialNumber: {
        type: Sequelize.STRING
      },
      snDea: {
        type: Sequelize.STRING
      },
      unitFrom: {
        type: Sequelize.STRING
      },
      regional: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      rentSell: {
        type: Sequelize.STRING
      },
      hargaJual: {
        type: Sequelize.DECIMAL(15, 2)
      },
      hargaBeli: {
        type: Sequelize.DECIMAL(15, 2)
      },
      hargaSewa: {
        type: Sequelize.DECIMAL(15, 2)
      },
      hargaCorrective: {
        type: Sequelize.DECIMAL(15, 2)
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
    await queryInterface.dropTable('Retos');
  }
};
