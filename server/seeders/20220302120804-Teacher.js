'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teachers', [
      {
        id: '110401',
        teaName: '张宇',
        sex: '男',
        age: 45,
        title: '教师',
        address: '吉林省长春市',
        department: '计算机科学与工程学院',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: '110413',
        teaName: '刘红宇',
        sex: '男',
        age: 46,
        title: '教师',
        address: '吉林省吉林市',
        department: '计算机科学与工程学院',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: '110421',
        teaName: '汤红',
        sex: '女',
        age: 40,
        title: '教师',
        address: '辽宁省沈阳市',
        department: '计算机科学与工程学院',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teachers', null, {})
  }
};
