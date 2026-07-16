'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Qrinventories', 'Qrassets');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('Qrassets', 'Qrinventories');
  }
};
