<template>
  <el-button @click='loadExcel' size='mini'>导出成绩组成表</el-button>
</template>

<script>
import { dataConversionUtil } from '../../../assets/js/exportToExcel.js'
export default {
  name: 'ExportScoreExcelTable',
  data () {
    return {
      workItems: [
        ['test', '随堂测验', '随堂测验'],
        ['work', '作业', '作业成绩'],
        ['experiment', '实验', '实验成绩']
      ]
    }
  },
  methods: {
    loadExcel () {
      try {
        var dataList = []
        var datas = JSON.parse(localStorage.getItem('stuInfo'))
        datas.forEach(data => {
          dataList.push([data.Student.id, data.Student.stuName])
        })
        // 成绩表格
        let workTables = []
        this.workItems.forEach(item => {
          var tableHeader = this.getTable(item)
          workTables.push(tableHeader, dataList)
        })
        let examHeader = this.getExamTable()
        let examName = '试卷'
        dataConversionUtil.scoreToExcel(this.workItems, workTables, examHeader, dataList, examName)
        this.$message.success('导出成功！')
      } catch (e) {
        this.$message.warning('导出错误，请联系管理员！')
        console.log(e)
      }
    },
    getExamTable () {
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
      tableHeader.push(['《' + courseName + '》' + term + '期末试卷对课程目标的支撑情况'])
      tableHeader.push(question, score)
      tableHeader.push(stu)
      tableHeader.push(sectionScore)
      for (let i = 0; i < detail[2].totalAim; i++) {
        tableHeader.push(pos[i])
      }
      return tableHeader
    },
    getTable (item) {
      var tableHeader = []
      var works = JSON.parse(localStorage.getItem(item[0]))
      var courseName = works[2].courseName // 试卷科目
      var term = works[2].term // 参与考试的年级
      var workNum = works[2].number // 共多少作业
      var work = [] // 大题名
      var aims = [] // 目标行
      var full = [] // 满分行
      work.push('学生学号', '学生姓名')
      aims.push('', '')
      full.push('', '满分')
      // 获取目标序列
      for (let i = 0; i < works[0].length; i++) {
        for (let j = 0; j < works[0][i].length; j++) {
          aims.push('目标' + works[0][i][j])
        }
      }
      // 填入满分行
      for (let i = 0; i < works[3].length; i++) {
        for (let j = 0; j < works[3][i].length; j++) {
          full.push(works[3][i][j])
        }
      }
      // 填入第二行数据
      for (let i = 0; i < workNum; i++) {
        work.push(item[1] + (i + 1))
        if (works[0][i].length > 1) {
          let j = 1
          for (; j < works[0][i].length; j++) {
            work.push('')
          }
        }
      }
      work.push('')
      tableHeader.push(['《' + courseName + '》' + term + item[2] + '对课程目标的支撑情况'])
      tableHeader.push(work, aims, full)
      return tableHeader
    }
  }
}
</script>

<style>
</style>
