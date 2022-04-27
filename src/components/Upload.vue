<template>
  <div>
    <span style='margin-right:10px'>
      <input
        class='input-file'
        type='file'
        @change='exportData'
        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      />
      <el-button type='primary' size='mini' icon='el-icon-upload' @click='btnClick'>
        请上传成绩信息
      </el-button>
    </span>
  </div>
</template>

<script>
// 引入组件
import XLSX from 'xlsx'
import bus from '../assets/js/eventBus.js'
export default {
  name: 'Upload',
  props: ['aimsInfo'],
  data () {
    return {
      outputs: [],
      row: 0,
      examination: [],
      inClass: [],
      test: [],
      homework: [],
      teacher: [],
      student: [],
      result: []
    }
  },
  methods: {
    btnClick () {
      // 点击事件
      document.querySelector('.input-file').click()
    },
    exportData (event) {
      const files = event.target.files
      if (files.length <= 0) {
        return false
      } else if (!/\.(xlsx|xls)$/.test(files[0].name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式的文件')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          // 取表
          /*
            ------ 表一 ------
            0 -- 封皮
            1 -- 情况报告
            2 -- 试卷
            ------ 表二 ------
            0 -- 随堂检测
            1 -- 作业
            2 -- 实验
            3 -- 教师评价
            4 -- 学生评价
            5 -- 试卷
          */
          let sheetName = ''
          let content = {}
          this.getCourseName(workbook)
          this.initAchievement()
          let _this = this
          for (let sheetIndex = 0; sheetIndex < 6; sheetIndex++) {
            sheetName = workbook.SheetNames[sheetIndex]
            if (sheetName !== '试卷') {
              content = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
              _this.row = content.length - 3
              // console.log(content)
              this.getInClassOrHomeTest(content, sheetName)
            } else {
              content = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
              _this.row = content.length - 8
              // console.log(content)
              this.getExaminationAchievement(content)
            }
          }
          this.outputs.push(this.getDiagramData())
          var temp = this.outputs[0]
          for (let i = 0; i < temp[0].length; i++) {
            var arr = []
            for (let j = 0; j < temp.length; j++) {
              arr[j] = temp[j][i]
            }
            bus.$emit('getResult' + (i + 1), arr)
          }
          this.$message.success('上传成功！')
          localStorage.setItem('ready', JSON.stringify(true))
        } catch (e) {
          console.log(e)
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    // 画散点图
    getDiagramData () {
      var result = this.getArray()
      let weight = JSON.parse(localStorage.getItem('weight'))
      let coefficients = JSON.parse(localStorage.getItem('aim'))[0]
      for (var i = 0; i < this.row; i++) {
        for (let j = 0; j < coefficients.length; j++) {
          result[i][j] = parseFloat(((this.inClass[i][j] * coefficients[j][0] + this.homework[i][j] * coefficients[j][1] + this.test[i][j] * coefficients[j][2] + this.examination[i][j] * coefficients[j][3]) * weight[0] + this.teacher[i][j] * weight[1] + this.student[i][j] * weight[2]).toFixed(3))
        }
      }
      return result
    },
    /* 计算随堂测验分数达成度 */
    getInClassOrHomeTest (ws, sheetName) {
      var score = this.getArray()
      const data = JSON.parse(localStorage.getItem('aim'))
      let aimNumber = parseInt(data[2].totalAim)
      var rules = this.getRules(ws, aimNumber)
      // 起始学生的序号
      let stuIndex = 3
      score = this.getScore(ws, score, rules, stuIndex, aimNumber)
      // if (sheetIndex < 3) {
      //   var total = this.getTotal(score)
      //   this.getResult(total, sheetIndex)
      // }
      var ruleScore = [0, 0, 0, 0]
      let ruleIndex = this.getFullMarkIndex(ws)
      ruleScore = this.getRuleScores(ws, rules, ruleScore, ruleIndex, aimNumber)
      switch (sheetName) {
        case '随堂测验':
          this.inClass = this.getPersonalAchievement(this.inClass, score, ruleScore, aimNumber)
          break
        case '作业':
          this.homework = this.getPersonalAchievement(this.homework, score, ruleScore, aimNumber)
          break
        case '实验':
          this.test = this.getPersonalAchievement(this.test, score, ruleScore, aimNumber)
          break
        case '教师评价':
          this.teacher = this.getPersonalAchievement(this.teacher, score, ruleScore, aimNumber)
          break
        case '学生评价':
          this.student = this.getPersonalAchievement(this.student, score, ruleScore, aimNumber)
          break
      }
      return this.getAchievement(score, ruleScore, aimNumber)
    },
    /* 计算考试分数达成度 */
    getExaminationAchievement (ws) {
      // 声明存放学生在每个目标下成绩的数组
      var score = this.getArray()
      // 处理数据
      let sum = 0
      // 将excel表转换为json数据后，目标规则 1所在位置
      let ruleIndex = 4
      const data = JSON.parse(localStorage.getItem('aim'))
      let aimNumber = parseInt(data[2].totalAim)
      // 将excel表转换为json数据后，学生 1所在位置
      let studentIndex = (4 + aimNumber)
      // var total = this.getExamScore(ws, studentIndex)
      // this.getResult(total, 3)
      // 记录每个学生的所有目标的分数
      for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < aimNumber; j++) {
          score[i][j] = this.getSum(ws[ruleIndex], ws[studentIndex], sum)
          ruleIndex = ((ruleIndex + 1) % aimNumber) + aimNumber
        }
        studentIndex++
      }
      let fullMarkIndex = this.getFullMarkIndex(ws)
      var ruleScore = this.getRuleScore(ws, ruleIndex, fullMarkIndex, aimNumber)
      this.examination = this.getPersonalAchievement(this.examination, score, ruleScore, aimNumber)
      return this.getAchievement(score, ruleScore, aimNumber)
    },
    // 记录每个学生考试的总分
    // getExamScore (ws, studentIndex) {
    //   let total = []
    //   // __EMPTY_21 是成绩表中总分所在的列
    //   for (var i = 0; i < this.row; i++) {
    //     total[i] = ws[studentIndex++].__EMPTY_ + '21'
    //   }
    //   return total
    // },
    // 利用正则匹配确定上传的课程名称
    getCourseName (workbook) {
      let obj = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])[0]
      let reg = RegExp(/《(.*?)》/)
      let courseName = [] // 存放书名的数组
      Object.keys(obj).forEach(item => {
        if (reg.exec(item)) {
          courseName[courseName.length] = RegExp.$1
          courseName.join('\n')
        }
      })
      this.aimsInfo.forEach(item => {
        if (item.courseName === courseName[0]) {
          this.setAimNum(item)
        }
      })
    },
    setAimNum (item) {
      try {
        localStorage.setItem('AimNum', JSON.stringify(item.aimNumber))
      } catch (e) {
        this.$message.error('请先录入课程目标成绩组成参数')
        throw e
      }
    },
    initAchievement () {
      let achievement = []
      localStorage.setItem('achievement', JSON.stringify(achievement))
    },
    initResult () {
      this.result = this.getArray()
      console.log('成绩单初始化成功!')
    },
    getResult (total, index) {
      for (var i = 0; i < this.row; i++) {
        this.result[i][index] = total[i]
      }
    },
    // getTotal (score) {
    //   var total = []
    //   for (var i = 0; i < this.row; i++) {
    //     var temp = 0
    //     for (var j = 0; j < this.column; j++) {
    //       temp = temp + score[i][j]
    //     }
    //     total[i] = temp
    //   }
    //   return total
    // },
    // uploadScore () {
    //   let res = []
    //   for (let i = 0; i < this.result.length; i++) {
    //     res[i] = this.result[i].map(value => ({value}))
    //   }
    //   localStorage.setItem('score', JSON.stringify(res))
    // },
    /*
      param1 -- 目标规则对象
      param2 -- 学生对象
      total  -- 学生在此目标规则下的总成绩
    */
    getSum (param1, param2, total) {
      total = 0
      let obj2 = Object.keys(param1)
      // 获取目标规则所在的列名
      obj2.shift()
      for (let [key, value] of Object.entries(param2)) {
        // 将当前规则下当前学生所在的列值求和
        if (obj2.includes(key) && key !== '__EMPTY') {
          total = total + parseInt(value)
        }
      }
      return total
    },
    /* 创建二维数组存放所有学生在每个目标下的成绩 */
    getArray () {
      const data = JSON.parse(localStorage.getItem('aim'))
      let aimNumber = parseInt(data[2].totalAim)
      var score = [] // 声明一维数组
      for (var x = 0; x < this.row; x++) {
        score[x] = [] // 声明二维数组
        for (var y = 0; y < aimNumber; y++) {
          score[x][y] = 0 // 数组初始化为0
        }
      }
      return score
    },
    /* 计算每个学生在每个考核环节中的每个目标下的分数比 */
    getPersonalAchievement (resArray, score, ruleScore, aimNumber) {
      resArray = this.getArray()
      for (var j = 0; j < aimNumber; j++) {
        for (var i = 0; i < this.row; i++) {
          // 将当前学生 每个目标下的得分 除以 每个对应目标的总分
          resArray[i][j] = parseFloat((score[i][j] / ruleScore[j]).toFixed(3))
          if (isNaN(resArray[i][j])) {
            resArray[i][j] = 0
          }
        }
      }
      return resArray
    },
    /* 计算考试中每个目标规则对应的满分分值 */
    getRuleScore (ws, ruleIndex, fullMarkIndex, aimNumber) {
      var ruleScore = []
      var total = 0
      var len = ruleIndex
      for (var i = 0; i < len; i++) {
        // 计算每个目标在表中 小题分数 行有 '√' 的所有分数
        ruleScore[i] = this.getSum(ws[ruleIndex], ws[fullMarkIndex], total)
        ruleIndex = ((ruleIndex + 1) % aimNumber) + aimNumber
      }
      return ruleScore
    },
    /* 获取每个检验项目下每个目标的满分所在表中的序号（即行号） */
    getFullMarkIndex (ws) {
      for (var i = 0; i < ws.length; i++) {
        for (var j in ws[i]) {
          if (ws[i][j] === '满分' || ws[i][j] === '小题分数') {
            return i
          }
        }
      }
    },
    /*
      计算每个目标下的达成度
      score -- 所有学生的分数
      ruleScore -- 每个目标下的总分
    */
    getAchievement (score, ruleScore, aimNumber) {
      var achievement = []
      var temp = 0
      let stuNum = 39
      for (var i = 0; i < aimNumber; i++) {
        for (var j = 0; j < stuNum; j++) {
        // for (var j = 0; j < this.row; j++) {
          temp = temp + score[j][i]
        }
        if (ruleScore[i] !== '' || ruleScore[i] !== null) {
          achievement[i] = parseFloat(((temp / stuNum) / ruleScore[i]).toFixed(3))
          // achievement[i] = parseFloat(((temp / this.row) / ruleScore[i]).toFixed(3))
          if (isNaN(achievement[i]) || achievement[i] === null) {
            achievement[i] = 0
          }
        }
        temp = 0
      }
      let data = JSON.parse(localStorage.getItem('achievement'))
      data.push(achievement)
      localStorage.setItem('achievement', JSON.stringify(data))
    },
    /* 获取每个目标对应的 key */
    getRules (ws, aimNumber) {
      let obj = []
      for (let i = 1; i <= aimNumber; i++) {
        let temp = []
        for (let [key, value] of Object.entries(ws[1])) {
          if (value === ('目标' + i)) {
            temp.push(key)
          }
        }
        obj.push(temp)
      }
      return obj
    },
    /*
      获取所有学生在每个目标下的分数
      score -- 分数表
      rules -- 目标规则表
      stuIndex -- 第一个学生在表中的序号
    */
    getScore (ws, score, rules, stuIndex, aimNumber) {
      for (var i = 0; i < this.row; i++) {
        for (let j = 0; j < aimNumber; j++) {
          let index = 0
          for (let [key, value] of Object.entries(ws[stuIndex])) {
            if (key === rules[j][index]) {
              score[i][j] = score[i][j] + value
              index++
            }
          }
        }
        stuIndex++
      }
      return score
    },
    /* 获取每个规则的总分 */
    getRuleScores (ws, rules, ruleScore, ruleIndex, aimNumber) {
      for (let i = 0; i < aimNumber; i++) {
        let index = 0
        for (let [key, value] of Object.entries(ws[ruleIndex])) {
          if (key === rules[i][index]) {
            ruleScore[i] = ruleScore[i] + parseInt(value)
            index++
          }
        }
      }
      return ruleScore
    }
  }
}
</script>

<style lang="stylus" scoped>
  .input-file
    display: none
</style>
