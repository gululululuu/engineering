'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Logins', [
      {
        userName: '11001',
        password: '123',
        identity: '院领导',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userName: '21001',
        password: '123',
        identity: '系领导',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userName: '31001',
        password: '123',
        identity: '督学',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userName: '41001',
        password: '123',
        identity: '教学秘书',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userName: '51001',
        password: '123',
        identity: '教师',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userName: '61001',
        password: '123',
        identity: '学生',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userName: 'admin',
        password: 'admin',
        identity: '管理员',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Logins', null, {})
  }
};
