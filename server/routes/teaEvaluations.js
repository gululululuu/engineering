var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  if (req.query.term) {
    var term = req.query.term
    var courses = await models.teaEvaluation.findAll({
      where: { [Op.and]: [{term: `${term}`}] }
    })
    res.json({courses: courses})
  } else if (req.query.id) {
    var teaId = req.query.id
    var courses = await models.teaEvaluation.findAll({
      where: { [Op.and]: [{teaId: `${teaId}`}] },
      order: [['id', 'ASC']]
    })
    res.json({courses: courses})
  } else if (req.query.courseName) {
    var courseName = req.query.courseName
    var courses = await models.teaEvaluation.findAll({
      where: { [Op.and]: [{courseName: `${courseName}`}] },
      order: [['id', 'ASC']]
    })
    res.json({courses: courses})
  } else {
    var courses = await models.teaEvaluation.findAll({
      order: [['id', 'ASC']]
    })
    res.json({courses: courses})
  }
})

// 更新课程信息
router.put('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var courses = await models.teaEvaluation.update({
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
  var course = await models.teaEvaluation.findByPk(data.courseId)
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
  let tableData = JSON.parse(data.tableData)
  let arr = []
  tableData.forEach(item => {
    let obj = {
      teaName: `${data.teaName}`,
      stuName: `${item.stuName}`,
      stuId: `${item.stuId}`,
      aimOne: `${item.one}`,
      aimTwo: `${item.two}`,
      aimThree: `${item.three}`,
      aimFour: `${item.four}`,
      aimFive: `${item.five}`,
      aimSix: `${item.six}`
    }
    arr.push(obj)
  })
  console.log(arr)
  try {
    var evaluations = await models.teaEvaluation.bulkCreate(arr)
    res.json({evaluations: evaluations})
  } catch (e) {
    console.log(e)
  }
})
module.exports = router
