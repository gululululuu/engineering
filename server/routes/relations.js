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

module.exports = router
