'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Students', [
      {
        id: '210101',
        stuName: '张三',
        age: 19,
        sex: '男',
        address: '吉林省长春市',
        class: '210401',
        department: '计算机科学与工程',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: '200102',
        stuName: '李四',
        age: 20,
        sex: '男',
        address: '吉林省吉林市',
        class: '200401',
        department: '计算机科学与工程',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: '200103',
        stuName: '王五',
        age: 20,
        sex: '男',
        address: '吉林省四平市',
        class: '200401',
        department: '计算机科学与工程',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: '190103',
        stuName: '赵六',
        age: 21,
        sex: '男',
        address: '吉林省白山市',
        class: '190401',
        department: '计算机科学与工程',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {})
  }
};
