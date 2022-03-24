'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      models.Course.hasMany(models.Stu_Course)
      models.Course.hasMany(models.Tea_Course)
      models.Course.hasMany(models.Tea_Stu)
    }
  }
  Course.init({
    courseName: DataTypes.STRING,
    midTerm: DataTypes.FLOAT,
    finalExam: DataTypes.FLOAT,
    work: DataTypes.FLOAT,
    experiment: DataTypes.FLOAT,
    test: DataTypes.FLOAT,
    teaEvaluate: DataTypes.FLOAT,
    stuEvaluate: DataTypes.FLOAT,
    term: DataTypes.STRING,
    department: DataTypes.STRING,
    major: DataTypes.STRING,
    courseCredit: DataTypes.INTEGER,
    courseHour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
