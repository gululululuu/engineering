'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Aim.init({
    courseName: DataTypes.STRING,
    aimNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aim',
  });
  return Aim;
};