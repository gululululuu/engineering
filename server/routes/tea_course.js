var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  if (req.query.courseId) {
    var courseId = req.query.courseId
    var users = await models.Tea_Course.findAll({
      where: { [Op.and]: [{courseId: `${courseId}`}] },
      order: [['id', 'ASC']],
      include: {
        model: models.Teacher
      }
    })
    res.json({users: users})
  } else if (req.query.teacherId) {
    var teacherId = req.query.teacherId
    var courses = await models.Tea_Course.findAll({
      where: { [Op.and]: [{teacherId: `${teacherId}`}] },
      order: [['id', 'ASC']],
      include: {
        model: models.Course
      }
    })
    res.json({courses: courses})
  } else {
    var courses = await models.Tea_Course.findAll({
      order: [['id', 'ASC']]
    })
    res.json({courses: courses})
  }
})

module.exports = router
