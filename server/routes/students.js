var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
// 获取所有学生的信息
router.get('/', async function (req, res, next) {
  // var currentPage = parseInt(req.query.currentPage) || 1
  // var pageSize = parseInt(req.query.pageSize) || 2
  var where = {}
  // 模糊查找学生姓名
  if (req.query.userName) {
    var stuName = req.query.userName
    var students = await models.Student.findAll({
      where: { [Op.and]: [{stuName: `${stuName}`}] },
      order: [['id', 'ASC']]
    })
    res.json({students: students})
  } else {
    var students = await models.Student.findAll({
      order: [['id', 'ASC']]
    })
    res.json({students: students})
  }
  // var result = await models.Student.findAndCountAll({
  //   order: [['id', 'DESC']],
  //   where: where,
  //   offset: (currentPage - 1) * pageSize,
  //   limit: pageSize
  // })
  // res.json({
  //   student: result.rows,
  //   pagination: {
  //     currentPage: currentPage,
  //     pageSize: pageSize,
  //     total: result.count
  //   }
  // })
  // res.json({students: students})
})
// 获取用户提交的信息并插入数据库
router.post('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var course = await models.Student.create({
    id: `${data.id}`,
    age: `${data.age}`,
    sex: `${data.sex}`,
    stuName: `${data.stuName}`,
    address: `${data.address}`,
    class: `${data.class}`,
    department: `${data.department}`,
    major: `${data.major}`
  })
  res.json({course: course})
})
// 查找 id 为 /id 的学生信息
router.get('/:id', async function (req, res, next) {
  var student = await models.Student.findByPk(req.params.id)
  res.json({student: student})
})
// // 查找 id 为 /id 的学生信息和参与的课程信息
// router.get('/:id', async function (req, res, next) {
//   var student = await models.Student.findOne({
//     where: {id: req.params.id},
//     include: [models.Course]
//   })
//   res.json({student: student})
// })

// 修改学生信息
router.put('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  try {
    var students = await models.Student.update({
      stuName: `${data.stuName}`,
      id: `${data.id}`,
      age: `${data.age}`,
      sex: `${data.sex}`,
      address: `${data.address}`,
      department: `${data.department}`,
      class: `${data.class}`,
      major: `${data.major}`
    }, {where: {id: `${data.id}`}})
    res.json({students: students})
  } catch (e) {
    console.log(e)
  }
})

// 修改 id 为 /id 的学生信息
router.put('/:id', async function (req, res, next) {
  var student = await models.Student.findByPk(req.params.id)
  student.update(req.body)
  res.json({student: student})
})

// 删除学生信息
router.delete('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var student = await models.Student.findByPk(data.id)
  if (student) {
    student.destroy()
    res.json({msg: '删除成功'})
  } else {
    res.json({msg: '不存在该数据'})
  }
})
module.exports = router
