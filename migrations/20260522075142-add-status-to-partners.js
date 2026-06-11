'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('partners', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending'
      });
    } catch (error) {
      console.log('Column status already exists in partners table. Skipping...');
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('partners', 'status');
    } catch (error) {
      console.log('Column status not found in partners table. Skipping...');
    }
  }
};
