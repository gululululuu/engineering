'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stu_Courses', [
      {
        score: 80,
        courseId: 'C1001',
        studentId: '190103',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 85,
        courseId: 'C1002',
        studentId: '190103',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        courseId: 'C1001',
        studentId: '200102',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        score: 90,
        courseId: 'C1001',
        studentId: '200103',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stu_Courses', null, {})
  }
};
