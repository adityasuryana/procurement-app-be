'use strict';
const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [rows] = await queryInterface.sequelize.query(
      'SELECT id FROM "Qrinventories";'
    );
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (const row of rows) {
      let token = '';
      for (let i = 0; i < 8; i++) {
        token += chars[crypto.randomInt(0, chars.length)];
      }
      await queryInterface.sequelize.query(
        `UPDATE "Qrinventories" SET token = :token WHERE id = :id;`,
        {
          replacements: { token, id: row.id }
        }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    // No-op
  }
};
