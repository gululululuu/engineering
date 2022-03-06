'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stu_Course extends Model {
    static associate(models) {
      models.Stu_Course.belongsTo(models.Student)
    }
  }
  Stu_Course.init({
    score: DataTypes.INTEGER,
    courseId: DataTypes.STRING,
    studentId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stu_Course',
  });
  return Stu_Course;
};
