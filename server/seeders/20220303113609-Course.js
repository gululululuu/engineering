'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [
      {
        id: 'C1001',
        courseName: '数据结构',
        teaId: '110401',
        courseCredit: 16,
        courseHour: 64,
        midTerm: 0.3,
        finalExam: 0.4,
        work: 0.1,
        experiment: 0.1,
        test: 0.1,
        teaEvaluate: 0.2,
        stuEvaluate: 0.2,
        term: '大学一年级 第 一 学期',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 'C1002',
        courseName: '操作系统',
        teaId: '110401',
        courseCredit: 12,
        courseHour: 48,
        midTerm: 0,
        finalExam: 0.6,
        work: 0.1,
        experiment: 0.1,
        test: 0.2,
        teaEvaluate: 0.3,
        stuEvaluate: 0.1,
        term: '大学一年级 第 二 学期',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 'C1003',
        courseName: '离散数学',
        teaId: '110401',
        courseCredit: 16,
        courseHour: 64,
        midTerm: 0.3,
        finalExam: 0.3,
        work: 0.2,
        experiment: 0.1,
        test: 0.1,
        teaEvaluate: 0.3,
        stuEvaluate: 0.1,
        term: '大学一年级 第 一 学期',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {})
  }
};
