'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea_Stu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Tea_Stu.belongsTo(models.Student)
      models.Tea_Stu.belongsTo(models.Teacher)
      models.Tea_Stu.belongsTo(models.Course)
    }
  }
  Tea_Stu.init({
    teacherId: DataTypes.STRING,
    studentId: DataTypes.STRING,
    courseId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tea_Stu',
  });
  return Tea_Stu;
};
