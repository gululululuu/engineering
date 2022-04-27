var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  if (req.query.courseName) {
    var courseName = req.query.courseName
    var relations = await models.Relation.findAll({
      where: { [Op.and]: [{courseName: `${courseName}`}] },
      order: [['id', 'ASC']]
    })
    res.json({relations: relations})
  } else {
    var relations = await models.Relation.findAll({
      order: [['id', 'ASC']]
    })
    res.json({relations: relations})
  }
})

// 更新课程信息
router.put('/', async function (req, res, next) {
  const data = JSON.parse(req.query.data)
  console.log(data)
  try {
    var relations = await models.Relation.update({
      graduRequirement: `${data.graduRequirement}`,
      courseName: `${data.courseName}`,
      graduationPoint: `${data.graduationPoint}`,
      aim: `${data.aim}`
    }, {where: {id: `${data.id}`}})
    res.json({relations: relations})
  } catch (e) {
    console.log(e)
  }
})

// 删除课程信息
router.delete('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  try {
    var relation = await models.Relation.findByPk(data.id)
    if (relation) {
      relation.destroy()
      res.json({msg: '删除成功'})
    } else {
      res.json({msg: '不存在该数据'})
    }
  } catch (e) {
    console.log(e)
  }
})

// 插入新增课程的信息
router.post('/', async function (req, res, next) {
  const data = JSON.parse(req.query.data)
  console.log(data)
  try {
    var relation = await models.Relation.create({
      graduRequirement: `${data.graduRequirement}`,
      courseName: `${data.courseName}`,
      graduationPoint: `${data.graduationPoint}`,
      aim: `${data.aim}`
    })
    res.json({relation: relation})
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
