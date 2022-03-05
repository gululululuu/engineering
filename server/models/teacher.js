'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      models.Teacher.belongsToMany(models.Course, {through: 'Tea_Courses', as: 'TC'})
    }
  }
  Teacher.init({
    teaName: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};