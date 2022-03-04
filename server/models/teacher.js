'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Teacher.belongsToMany(models.Course, {through: 'Tea_Courses', as: 'TC'})
    }
  }
  Teacher.init({
    teaName: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};