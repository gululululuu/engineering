'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Course.belongsToMany(models.Student, {through: 'Stu_Courses', as: 'SC'})
      models.Course.belongsToMany(models.Teacher, {through: 'Tea_Courses', as: 'TC'})
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
    term: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};