'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the user already exists to prevent duplicate key errors
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE username = 'admin' LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0) {
      await queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: bcrypt.hashSync('admin123', 10),
        firstName: 'Aditya',
        lastName: 'Suryana',
        email: 'aditya.suryana@dea-corp.co.id',
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};
