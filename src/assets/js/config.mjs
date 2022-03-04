import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'
const sequelize = new Sequelize('demo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: mysql2,
  define: {
    freezeTableName: true
  }
})

export default sequelize
