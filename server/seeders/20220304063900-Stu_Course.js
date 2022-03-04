'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stu_Courses', [
      {
        score: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stu_Courses', null, {})
  }
};
