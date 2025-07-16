'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('users', 'avatar', {
      type: Sequelize.STRING(255),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn('users', 'avatar', {
      type: Sequelize.BLOB,
      allowNull: true
    });
  }
};
