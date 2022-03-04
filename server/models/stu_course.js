'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stu_Course extends Model {
    static associate(models) {
    }
  }
  Stu_Course.init({
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stu_Course',
  });
  return Stu_Course;
};