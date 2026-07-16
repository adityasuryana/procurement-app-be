'use strict';
const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add column as nullable
    await queryInterface.addColumn('Qrinventories', 'token', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // 2. Generate random tokens for any existing records
    const [rows] = await queryInterface.sequelize.query(
      'SELECT id FROM "Qrinventories" WHERE token IS NULL;'
    );
    for (const row of rows) {
      const token = crypto.randomBytes(16).toString('hex');
      await queryInterface.sequelize.query(
        `UPDATE "Qrinventories" SET token = :token WHERE id = :id;`,
        {
          replacements: { token, id: row.id }
        }
      );
    }

    // 3. Alter the column to be not null and unique
    await queryInterface.changeColumn('Qrinventories', 'token', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Qrinventories', 'token');
  }
};
