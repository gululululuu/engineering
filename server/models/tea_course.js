'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea_Course extends Model {
    static associate(models) {
    }
  }
  Tea_Course.init({
    credit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tea_Course',
  });
  return Tea_Course;
};

