var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 获取用户提交的信息并插入数据库
router.post('/', async function (req, res, next) {
  const data = req.query
  console.log(data)
  var course = await models.Teacher.create({
    id: `${data.userId}`,
    age: `${data.userAge}`,
    sex: `${data.userSex}`,
    teaName: `${data.userName}`,
    title: `${data.userTitle}`
  })
  res.json({course: course})
})
module.exports = router;
