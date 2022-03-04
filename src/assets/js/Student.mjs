import sequelize from './config.mjs'
import { Sequelize, DataTypes } from 'sequelize'
const Student = sequelize.define('Student', {
  // 在这里定义模型属性
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  },
  updateTimestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  // 忽略时间戳
  timestamps: true,
  // 不想要 createdAt
  createdAt: false,
  // 想要 updatedAt 但是希望名称叫做 updateTimestamp
  updatedAt: 'updateTimestamp'
})
// 同步所有模型（表），仅当数据库的以 demo 结尾时
Student.sync({force: true, match: /demo$/}).then(() => {
  Student.create({
    firstName: 'Zhao',
    lastName: 'Si'
  })
})

export default Student
