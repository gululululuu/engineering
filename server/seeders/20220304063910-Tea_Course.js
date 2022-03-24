'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tea_Courses', [
      {
        courseId: 'C1001',
        teacherId: '190103',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        courseId: 'C1001',
        teacherId: '190103',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        courseId: 'C1001',
        teacherId: '190103',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tea_Courses', null, {})
  }
};
