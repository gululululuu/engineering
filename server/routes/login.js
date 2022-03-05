var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  // if (req.query.term) {
  //   var term = req.query.term
  //   var courses = await models.Course.findAll({
  //     where: { [Op.and]: [{term: `${term}`}] }
  //   })
  //   res.json({courses: courses})
  // } else {
  //   var courses = await models.Course.findAll({
  //     order: [['id', 'ASC']]
  //   })
  //   res.json({courses: courses})
  // }
  if (req.query.identity) {
    var identity = req.query.identity
    var users = await models.Login.findAll({
      where: { [Op.and]: [{identity: `${identity}`}] }
    })
    res.json({users: users})
  }
})

// 更新课程信息
router.put('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var courses = await models.Course.update({
    term: `${data.term}`,
    courseId: `${data.courseId}`,
    exam: `${data.exam}`,
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
  var course = await models.Course.findByPk(data.courseId)
  if (course) {
    course.destroy()
    res.json({msg: '删除成功'})
  } else {
    res.json({msg: '不存在该数据'})
  }
})

// 插入新增课程的信息
router.post('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var course = await models.Course.create({
    term: `${data.term}`,
    id: `${data.courseId}`,
    exam: `${data.exam}`,
    work: `${data.work}`,
    test: `${data.test}`,
    courseName: `${data.courseName}`,
    experiment: `${data.experiment}`,
    teaEvaluate: `${data.teaEvaluate}`,
    stuEvaluate: `${data.stuEvaluate}`
  })
  res.json({course: course})
})
module.exports = router
