var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  if (req.query.courseId) {
    var courseId = req.query.courseId
    var students = await models.Stu_Course.findAll({
      where: { [Op.and]: [{courseId: `${courseId}`}] },
      order: [['id', 'ASC']],
      include: {
        model: models.Student
      }
    })
    res.json({students: students})
  } else if (req.query.stuId) {
    var stuId = req.query.stuId
    var courses = await models.Stu_Course.findAll({
      where: { [Op.and]: [{studentId: `${stuId}`}] },
      order: [['id', 'ASC']],
      include: {
        model: models.Course
      }
    })
    res.json({courses: courses})
  } else {
    var courses = await models.Stu_Course.findAll({
      order: [['id', 'ASC']]
    })
    res.json({courses: courses})
  }
})

// 将学生的成绩信息插入
router.post('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  let tableData = JSON.parse(data.tableData)
  let arr = []
  tableData.forEach(item => {
    let obj = {
      courseId:  `${data.courseId}`,
      studentId: `${item.stuId}`,
      score: `${item.score}`
    }
    arr.push(obj)
  })
  console.log(arr)
  try {
    var course = await models.Stu_Course.bulkCreate(arr)
    res.json({course: course})
  } catch (e) {
    console.log(e)
  }
})

// 删除学生成绩信息
router.delete('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  if (data.courseId) {
    let courseId = data.courseId
    var course = await models.Stu_Course.destroy({
      where: {
        courseId: `${data.courseId}`
      }
    })
    res.json({msg: '删除成功'})
  } else {
    res.json({msg: '不存在该数据'})
  }
})
module.exports = router
