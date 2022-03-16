var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  if (req.query.courseName) {
    var courseName = req.query.courseName
    var aim = await models.Aim.findOne({
      where: { [Op.and]: [{courseName: `${courseName}`}] },
      order: [['id', 'ASC']]
    })
    res.json({aim: aim})
  } else {
    var aims = await models.Aim.findAll({
      order: [['id', 'ASC']]
    })
    res.json({aims: aims})
  }
})

// 更新课程信息
router.put('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var courses = await models.Aim.update({
    term: `${data.term}`,
    courseId: `${data.courseId}`,
    midTerm: `${data.midTerm}`,
    finalExam: `${data.finalExam}`,
    work: `${data.work}`,
    test: `${data.test}`,
    courseName: `${data.courseName}`,
    experiment: `${data.experiment}`,
    teaEvaluate: `${data.teaEvaluate}`,
    stuEvaluate: `${data.stuEvaluate}`
  }, {where: {id: `${data.courseId}`}})
  res.json({courses: courses})
})

// 删除课程信息
router.delete('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var aim = await models.Aim.findByPk(data.courseId)
  if (aim) {
    aim.destroy()
    res.json({msg: '删除成功'})
  } else {
    res.json({msg: '不存在该数据'})
  }
})

// 插入新增目标的信息
router.post('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var aim = await models.Aim.create({
    courseName: `${data.courseName}`,
    aimNumber: `${data.aimNumber}`
  })
  res.json({aim: aim})
})
module.exports = router
