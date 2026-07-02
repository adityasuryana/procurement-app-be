'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('partners', 'alasanDitolak', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('partners', 'alasanDisetujui', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('partners', 'fileDitolak', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('partners', 'evaluation', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('partners', 'alasanDitolak');
    await queryInterface.removeColumn('partners', 'alasanDisetujui');
    await queryInterface.removeColumn('partners', 'fileDitolak');
    await queryInterface.removeColumn('partners', 'evaluation');
  }
};
