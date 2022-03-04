'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tea_Courses', [
      {
        credit: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        credit: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        credit: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tea_Courses', null, {})
  }
};
