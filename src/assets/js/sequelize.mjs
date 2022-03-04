import sequelize from './config.mjs'
import User from './User.mjs'
import Student from './Student.mjs'

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(error => {
  console.error('Unable to connect to the database:', error)
})

console.log(Student.firstName)
// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User) // true
