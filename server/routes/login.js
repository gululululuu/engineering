var express = require('express')
var router = express.Router()
var models = require('../models')
var Op = models.Sequelize.Op
/* GET users listing. */
// 查找所有课程的信息 或者 查找被选择的学期的课程信息
router.get('/', async function(req, res, next) {
  if (req.query.identity) {
    var identity = req.query.identity
    var users = await models.Login.findAll({
      where: { [Op.and]: [{identity: `${identity}`}] }
    })
    res.json({users: users})
  }
})

module.exports = router
