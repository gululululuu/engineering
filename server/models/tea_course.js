'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea_Course extends Model {
    static associate(models) {
      models.Tea_Course.belongsTo(models.Teacher)
      models.Tea_Course.belongsTo(models.Course)
    }
  }
  Tea_Course.init({
    courseId: DataTypes.STRING,
    teacherId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tea_Course',
  });
  return Tea_Course;
};
