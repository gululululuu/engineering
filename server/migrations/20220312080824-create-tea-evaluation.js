'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teaEvaluations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teaName: {
        type: Sequelize.STRING
      },
      stuName: {
        type: Sequelize.STRING
      },
      stuId: {
        type: Sequelize.STRING
      },
      aimOne: {
        type: Sequelize.STRING
      },
      aimTwo: {
        type: Sequelize.STRING
      },
      aimThree: {
        type: Sequelize.STRING
      },
      aimFour: {
        type: Sequelize.STRING
      },
      aimFive: {
        type: Sequelize.STRING
      },
      aimSix: {
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
    await queryInterface.dropTable('teaEvaluations');
  }
};