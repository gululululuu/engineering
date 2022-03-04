import sequelize from './config.mjs'
import { DataTypes, Model } from 'sequelize'
// const User = sequelize.define('User', {
//   // 在这里定义模型属性
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull 默认为 true
//   }
// }, {
//   timestamps: false
// })
// // 同步所有模型（表），仅当数据库的以 demo 结尾时
// User.sync({force: true, match: /demo$/}).then(() => {
//   User.create({
//     firstName: 'Jiang',
//     lastName: 'Shi'
//   })
// })
// User.findAll().then(users => {
//   console.log('All users:', JSON.stringify(users, null, 4))
// })


// 第二种声明模型的办法
class User extends Model {}
User.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING
}, {sequelize, timestamps: false})
// const user = User.build({firstName: 'Jane', lastName: 'Doe'})
// console.log(User.queryAll())
export default User
