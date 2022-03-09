<template>
  <el-button @click='loadExcel' size='mini'>导出Excel</el-button>
</template>

<script>
import { dataConversionUtil } from '../../../assets/js/exportToExcel.js'
export default {
  name: 'Excel',
  methods: {
    loadExcel () {
      try {
        var tableHeader = this.getTable()
        /*
         1. 重新写接口定义试卷结构
         2. 重新设置表格每一行内容
        */
        dataConversionUtil.examToExcel('试卷', tableHeader)
        this.$message.success('导出成功！')
      } catch (e) {
        this.$message.warning('导出错误，请联系管理员！')
        console.log(e)
      }
    },
    getTable () {
      var tableHeader = []
      var questions = JSON.parse(localStorage.getItem('question'))
      var detail = JSON.parse(localStorage.getItem('aim'))
      var courseName = detail[2].courseName // 试卷科目
      var term = detail[2].term // 参与考试的年级
      var quesNum = detail[2].number // 共多少大题
      var totalSection = 0 // 共多少小题
      var totalAim = 0 // 所有目标共多少小题
      var question = [] // 大题名
      var score = [] // 大题总分
      var stu = [] // 小题题号
      var sectionScore = [] // 每一小题的分数
      var pos = [] // 所有目标的位置
      sectionScore.push('', '小题分数')
      stu.push('学生学号', '学生姓名')
      question.push('', '')
      score.push('', '大题')
      // 获取小题的总数
      for (let i = 0; i < questions[1].length; i++) {
        totalSection = totalSection + parseInt(questions[1][i].examNum)
      }
      // 获取所有目标的小题总数
      for (let i = 0; i < detail[1].length; i++) {
        totalAim = totalAim + parseInt(detail[1][i].aimNum)
      }
      // 填入课程目标
      for (let i = 0; i < detail[2].totalAim; i++) {
        var aim1 = []
        aim1.push('', '课程目标' + (i + 1))
        pos.push(aim1)
      }
      console.log(pos)
      // 获取每一小题的分数
      for (let i = 0; i < questions[0].length; i++) {
        for (let j = 0; j < questions[0][i].length; j++) {
          sectionScore.push(questions[0][i][j])
        }
      }
      // 填入第二和第三行数据
      for (let i = 0; i < quesNum; i++) {
        question.push('第' + (i + 1) + '大题')
        score.push('(' + questions[1][i].examTotal + '分)')
        if (questions[1][i].examNum > 1) {
          let j = 1
          for (; j < questions[1][i].examNum; j++) {
            question.push('')
            score.push('')
            stu.push(j)
          }
          stu.push(j)
        } else {
          stu.push('1')
        }
      }
      question.push('')
      score.push('总分')
      console.log(sectionScore)
      tableHeader.push(['《' + courseName + '》' + term + '期末试卷对课程目标的支撑情况'])
      tableHeader.push(question, score)
      tableHeader.push(stu)
      tableHeader.push(sectionScore)
      for (let i = 0; i < detail[2].totalAim; i++) {
        tableHeader.push(pos[i])
      }
      return tableHeader
    }
  }
}
</script>

<style>
</style>
