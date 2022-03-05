'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    static associate(models) {
    }
  }
  Login.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    identity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};