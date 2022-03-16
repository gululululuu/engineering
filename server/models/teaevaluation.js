'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teaEvaluation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  teaEvaluation.init({
    teaName: DataTypes.STRING,
    stuName: DataTypes.STRING,
    stuId: DataTypes.STRING,
    aimOne: DataTypes.STRING,
    aimTwo: DataTypes.STRING,
    aimThree: DataTypes.STRING,
    aimFour: DataTypes.STRING,
    aimFive: DataTypes.STRING,
    aimSix: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teaEvaluation',
  });
  return teaEvaluation;
};