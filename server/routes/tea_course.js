var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  var courses = await models.Course.findAll({
    include: [{
      model: models.Teacher,
      as: 'TC',
      through: {
        attributes: ['id']
      }
    }]
  })
  res.json({courses: courses})
})

module.exports = router
