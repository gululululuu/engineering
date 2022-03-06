var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  if (req.query.id) {
    var id = req.query.id
    var students = await models.Stu_Course.findAll({
      where: { [Op.and]: [{courseId: `${id}`}] },
      order: [['id', 'ASC']],
      include: {
        model: models.Student
      }
    })
    res.json({students: students})
  } else {
    var courses = await models.Stu_Course.findAll({
      order: [['id', 'ASC']]
    })
    res.json({courses: courses})
  }
})

module.exports = router
