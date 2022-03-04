var express = require('express')
var router = express.Router()
var models = require('../models')
router.get('/', function (req, res, next) {
  models.user.findAll().then(users => {
    res.json({users: users})
  })
})

module.exports = router
