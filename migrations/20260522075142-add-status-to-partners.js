'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('partners', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('partners', 'status');
  }
};
