'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      courseName: {
        type: Sequelize.STRING
      },
      exam: {
        type: Sequelize.FLOAT
      },
      work: {
        type: Sequelize.FLOAT
      },
      experiment: {
        type: Sequelize.FLOAT
      },
      test: {
        type: Sequelize.FLOAT
      },
      teaEvaluate: {
        type: Sequelize.FLOAT
      },
      stuEvaluate: {
        type: Sequelize.FLOAT
      },
      term: {
        type: Sequelize.STRING
      },
      teaId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};
