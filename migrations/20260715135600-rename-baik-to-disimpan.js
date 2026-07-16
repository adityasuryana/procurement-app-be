'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `UPDATE "Qrinventories" SET status = 'Disimpan' WHERE status = 'Baik';`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `UPDATE "Qrinventories" SET status = 'Baik' WHERE status = 'Disimpan';`
    );
  }
};
