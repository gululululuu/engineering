<template>
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
</template>

<script>
// 引入组件
import XLSX from 'xlsx'
import bus from '../assets/js/eventBus.js'
export default {
  name: 'Upload',
  data () {
    return {
      outputs: [],
      coefficients: [],
      weight: [0.6, 0.2, 0.2],
      row: 47,
      column: 4,
      examination: [],
      inClass: [],
      test: [],
      homework: [],
      teacher: [],
      student: []
    }
  },
  methods: {
    btnClick () {
      // 点击事件
      document.querySelector('.input-file').click()
    },
    exportData (event) {
      var _this = this
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
          */
          let sheetName = ''
          let content = {}
          // var achievementResult = []
          _this.outputs = []
          for (let sheetIndex = 0; sheetIndex < 5; sheetIndex++) {
            sheetName = workbook.SheetNames[sheetIndex]
            content = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
            this.getInClassOrHomeTest(content, sheetIndex)
            // console.log(achievementResult)
          }
          sheetName = workbook.SheetNames[5]
          content = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
          // console.log(content)
          this.getExaminationAchievement(content)
          // console.log(achievementResult)
          sheetName = workbook.SheetNames[6]
          content = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
          this.coefficients = this.getCoefficient(content)
          _this.outputs.push(this.getDiagramData())
          console.log(1)
          console.log(_this.outputs)
          var arr1 = []
          var arr2 = []
          var arr3 = []
          var arr4 = []
          var temp = _this.outputs[0]
          for (var i = 0; i < _this.row; i++) {
            arr1[i] = temp[i][0]
            arr2[i] = temp[i][1]
            arr3[i] = temp[i][2]
            arr4[i] = temp[i][3]
          }
          bus.$emit('getResult1', arr1)
          bus.$emit('getResult2', arr2)
          bus.$emit('getResult3', arr3)
          bus.$emit('getResult4', arr4)
        } catch (e) {
          console.log(e)
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    getDiagramData () {
      var result = this.getArray()
      for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.column; j++) {
          switch (j) {
            case 0:
              result[i][j] = parseFloat(((((this.inClass[i][j] + this.homework[i][j] + this.test[i][j]) * this.coefficients[0][0]) + this.examination[i][j] * this.coefficients[3][0]) * this.weight[0] + this.teacher[i][j] * this.weight[1] + this.student[i][j] * this.weight[2]).toFixed(3))
              break
            case 1:
              result[i][j] = parseFloat(((this.inClass[i][j] * this.coefficients[0][1] + this.homework[i][j] * this.coefficients[1][1] + this.test[i][j] * this.coefficients[2][1] + this.examination[i][j] * this.coefficients[3][1]) * this.weight[0] + this.teacher[i][j] * this.weight[1] + this.student[i][j] * this.weight[2]).toFixed(3))
              break
            case 2:
              result[i][j] = parseFloat(((this.inClass[i][j] * this.coefficients[0][2] + this.homework[i][j] * this.coefficients[1][2] + this.test[i][j] * this.coefficients[2][2] + this.examination[i][j] * this.coefficients[3][2]) * this.weight[0] + this.teacher[i][j] * this.weight[1] + this.student[i][j] * this.weight[2]).toFixed(3))
              break
            case 3:
              result[i][j] = parseFloat(((this.inClass[i][j] * this.coefficients[0][3] + this.homework[i][j] * this.coefficients[1][3] + this.test[i][j] * this.coefficients[2][3] + this.examination[i][j] * this.coefficients[3][3]) * this.weight[0] + this.teacher[i][j] * this.weight[1] + this.student[i][j] * this.weight[2]).toFixed(3))
              break
          }
        }
      }
      return result
    },
    /* 计算随堂测验分数达成度 */
    getInClassOrHomeTest (ws, sheetIndex) {
      let _this = this
      var score = _this.getArray()
      var rules = _this.getRules(ws)
      // 起始学生的序号
      let stuIndex = 3
      score = _this.getScore(ws, score, rules, stuIndex)
      var ruleScore = [0, 0, 0, 0]
      let ruleIndex = this.getFullMarkIndex(ws)
      ruleScore = this.getRuleScores(ws, rules, ruleScore, ruleIndex)
      switch (sheetIndex) {
        case 0:
          this.inClass = this.getPersonalAchievement(this.inClass, score, ruleScore)
          break
        case 1:
          this.homework = this.getPersonalAchievement(this.homework, score, ruleScore)
          break
        case 2:
          this.test = this.getPersonalAchievement(this.test, score, ruleScore)
          break
        case 3:
          this.teacher = this.getPersonalAchievement(this.teacher, score, ruleScore)
          break
        case 4:
          this.student = this.getPersonalAchievement(this.student, score, ruleScore)
          break
      }
      return this.getAchievement(score, ruleScore)
    },
    /* 计算考试分数达成度 */
    getExaminationAchievement (ws) {
      let _this = this
      // 声明存放学生在每个目标下成绩的数组
      var score = _this.getArray()
      // 处理数据
      let total = 0
      // 将excel表转换为json数据后，目标规则 1所在位置
      let ruleIndex = 4
      // 将excel表转换为json数据后，学生 1所在位置
      let studentIndex = 8
      // 记录每个学生的所有目标的分数
      for (var i = 0; i < _this.row; i++) {
        for (var j = 0; j < _this.column; j++) {
          score[i][j] = this.getSum(ws[ruleIndex], ws[studentIndex], total)
          ruleIndex = ((ruleIndex + 1) % 4) + 4
        }
        studentIndex++
      }
      let fullMarkIndex = this.getFullMarkIndex(ws)
      var ruleScore = this.getRuleScore(ws, ruleIndex, fullMarkIndex)
      this.examination = this.getPersonalAchievement(this.examination, score, ruleScore)
      return this.getAchievement(score, ruleScore)
    },
    getCoefficient (content) {
      var res = this.getArray()
      var coefficientIndex = 4
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4;) {
          for (let [key, value] of Object.entries(content[coefficientIndex])) {
            if (key !== '课程目标达成情况评价报告') {
              res[i][j++] = value
            }
          }
        }
        coefficientIndex = (coefficientIndex + 1) % 4 + 4
      }
      return res
    },
    /*
      param1 -- 目标规则对象
      param2 -- 学生对象
      total  -- 学生在此目标规则下的总成绩
    */
    getSum (param1, param2, total) {
      total = 0
      const obj2 = Object.keys(param1)
      for (let [key, value] of Object.entries(param2)) {
        if (obj2.includes(key) && key !== '__EMPTY') {
          total = total + value
        }
      }
      return total
    },
    /* 创建二维数组存放所有学生在每个目标下的成绩 */
    getArray () {
      let _this = this
      var score = [] // 声明一维数组
      for (var x = 0; x < _this.row; x++) {
        score[x] = [] // 声明二维数组
        for (var y = 0; y < _this.column; y++) {
          score[x][y] = 0 // 数组初始化为0
        }
      }
      return score
    },
    /* 计算每个学生在每个考核环节中的每个目标下的分数比 */
    getPersonalAchievement (resArray, score, ruleScore) {
      resArray = this.getArray()
      for (var j = 0; j < this.column; j++) {
        for (var i = 0; i < this.row; i++) {
          resArray[i][j] = (score[i][j] / ruleScore[j])
          if (isNaN(resArray[i][j])) {
            resArray[i][j] = 0
          }
        }
      }
      return resArray
    },
    /* 计算考试中每个目标规则对应的满分分值 */
    getRuleScore (ws, ruleIndex, fullMarkIndex) {
      var ruleScore = []
      var total = 0
      var len = ruleIndex
      for (var i = 0; i < len; i++) {
        ruleScore[i] = this.getSum(ws[ruleIndex], ws[fullMarkIndex], total)
        ruleIndex = ((ruleIndex + 1) % 4) + 4
      }
      return ruleScore
    },
    /* 获取每个检验项目下每个目标的满分所在表中序号 */
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
    getAchievement (score, ruleScore) {
      var _this = this
      var achievement = []
      var temp = 0
      for (var i = 0; i < _this.column; i++) {
        for (var j = 0; j < _this.row; j++) {
          temp = temp + score[j][i]
        }
        if (ruleScore[i] !== '' || ruleScore[i] !== null) {
          achievement[i] = (temp / _this.row) / ruleScore[i]
        }
        temp = 0
      }
      return achievement
    },
    /* 获取每个目标对应的 key */
    getRules (ws) {
      let temp1 = []
      let temp2 = []
      let temp3 = []
      let temp4 = []
      for (let [key, value] of Object.entries(ws[1])) {
        switch (value) {
          case '目标1':
            temp1.push(key)
            break
          case '目标2':
            temp2.push(key)
            break
          case '目标3':
            temp3.push(key)
            break
          case '目标4':
            temp4.push(key)
            break
        }
      }
      return {1: temp1, 2: temp2, 3: temp3, 4: temp4}
    },
    /*
      获取所有学生在每个目标下的分数
      score -- 分数表
      rules -- 目标规则表
      stuIndex -- 第一个学生在表中的序号
    */
    getScore (ws, score, rules, stuIndex) {
      for (var i = 0; i < this.row; i++) {
        let index1 = 0
        let index2 = 0
        let index3 = 0
        let index4 = 0
        for (let [key, value] of Object.entries(ws[stuIndex])) {
          switch (key) {
            case rules[1][index1]:
              score[i][0] = score[i][0] + value
              index1++
              break
            case rules[2][index2]:
              score[i][1] = score[i][1] + value
              index2++
              break
            case rules[3][index3]:
              score[i][2] = score[i][2] + value
              index3++
              break
            case rules[4][index4]:
              score[i][3] = score[i][3] + value
              index4++
              break
          }
        }
        stuIndex++
      }
      return score
    },
    /* 获取每个规则的总分 */
    getRuleScores (ws, rules, ruleScore, ruleIndex) {
      let index1 = 0
      let index2 = 0
      let index3 = 0
      let index4 = 0
      for (let [key, value] of Object.entries(ws[ruleIndex])) {
        switch (key) {
          case rules[1][index1]:
            ruleScore[0] = ruleScore[0] + value
            index1++
            break
          case rules[2][index2]:
            ruleScore[1] = ruleScore[1] + value
            index2++
            break
          case rules[3][index3]:
            ruleScore[2] = ruleScore[2] + value
            index3++
            break
          case rules[4][index4]:
            ruleScore[3] = ruleScore[3] + value
            index4++
            break
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
