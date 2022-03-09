'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    courseName: DataTypes.STRING,
    exam: DataTypes.FLOAT,
    work: DataTypes.FLOAT,
    experiment: DataTypes.FLOAT,
    test: DataTypes.FLOAT,
    teaEvaluate: DataTypes.FLOAT,
    stuEvaluate: DataTypes.FLOAT,
    term: DataTypes.STRING,
    teaId: DataTypes.STRING,
    courseCredit: DataTypes.INTEGER,
    courseHour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};