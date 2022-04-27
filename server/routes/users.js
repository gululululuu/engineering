var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if (req.query.userName) {
    var userName = req.query.userName
    var users = await models.Teacher.findAll({
      where: { [Op.and]: [{teaName: `${userName}`}] },
      order: [['id', 'ASC']]
    })
    res.json({users: users})
  } else if (req.query.title) {
    var title = req.query.title
    var users = await models.Teacher.findAll({
      where : { [Op.and]: [{title: `${title}`}] },
      order: [['id', 'ASC']]
    })
    res.json({users: users})
  } else {
    var users = await models.Teacher.findAll({
      order: [['id', 'ASC']]
    })
    res.json({users: users})
  }
});

router.get('/:id', async function (req, res, next) {
  var user = await models.Teacher.findByPk(req.params.id)
  res.json({user: user})
})

// 获取用户提交的信息并插入数据库
router.post('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  try {
    var user = await models.Teacher.create({
      id: `${data.id}`,
      age: `${data.age}`,
      sex: `${data.sex}`,
      teaName: `${data.teaName}`,
      department: `${data.department}`,
      major: `${data.major}`,
      address: `${data.address}`,
      title: `${data.title}`
    })
    res.json({user: user})
  } catch (e) {
    console.log(e)
  }
})

// 修改教师信息
router.put('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  try {
    var students = await models.Teacher.update({
      id: `${data.id}`,
      age: `${data.age}`,
      sex: `${data.sex}`,
      teaName: `${data.teaName}`,
      department: `${data.department}`,
      major: `${data.major}`,
      address: `${data.address}`,
      title: `${data.title}`
    }, {where: {id: `${data.id}`}})
    res.json({students: students})
  } catch (e) {
    console.log(e)
  }
})

// 删除教师信息
router.delete('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var user = await models.Teacher.findByPk(data.id)
  if (user) {
    user.destroy()
    res.json({msg: '删除成功'})
  } else {
    res.json({msg: '不存在该数据'})
  }
})
module.exports = router
