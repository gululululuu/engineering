<template>
  <el-button @click='loadExcel' size='mini'>导出Excel</el-button>
</template>

<script>
import { dataConversionUtil } from '../../../assets/js/exportToExcel.js'
export default {
  name: 'Excel',
  props: ['formData'],
  methods: {
    loadExcel () {
      try {
        console.log(this.formData)
        var tableHeader = this.getTable()
        dataConversionUtil.exportToExcel('课程目标达成情况报告', tableHeader)
        // dataConversionUtil.dataToExcel('试卷分析报告', tableHeader)
        this.$message.success('导出成功！')
        this.clear()
      } catch (e) {
        this.$message.warning('导出错误，请联系管理员！')
        console.log(e)
      }
    },
    getTable () {
      var tableHeader = []
      tableHeader.push(['课程目标达成情况评价报告'], [null])
      tableHeader.push(['课程号', '', '', this.formData.id, '', '', '', '课程名称', '', this.formData.courseName])
      tableHeader.push(['开课学期', '', '', this.formData.term, '', '', '', '任课教师', '', this.formData.teaName])
      tableHeader.push(['班级', '', '', this.formData.class, '', '', '', '学时/学分', '', this.formData.period + '/' + this.formData.credit])
      let form = []
      let weightSum = []
      form.push('考核方式', '')
      weightSum.push('权重和', '')
      for (let i = 1; i <= this.formData.aimNum; i++) {
        form.push('课程目标' + i)
        weightSum.push('1.000')
      }
      tableHeader.push(form)
      let coefficients = JSON.parse(localStorage.getItem('coefficients'))
      tableHeader.push(['随堂测验', '', coefficients[0][0], coefficients[1][0], coefficients[2][0], coefficients[3][0]])
      tableHeader.push(['作业', '', coefficients[0][1], coefficients[1][1], coefficients[2][1], coefficients[3][1]])
      tableHeader.push(['实验', '', coefficients[0][2], coefficients[1][2], coefficients[2][2], coefficients[3][2]])
      tableHeader.push(['考试', '', coefficients[0][3], coefficients[1][3], coefficients[2][3], coefficients[3][3]])
      tableHeader.push(weightSum)
      tableHeader.push(form)
      let data = JSON.parse(localStorage.getItem('achievement'))
      console.log(data)
      tableHeader.push(['随堂测验', '', data[0][0], data[0][1], data[0][2], data[0][3]])
      tableHeader.push(['作业', '', data[1][0], data[1][1], data[1][2], data[1][3]])
      tableHeader.push(['实验', '', data[2][0], data[2][1], data[2][2], data[2][3]])
      tableHeader.push(['考试', '', data[5][0], data[5][1], data[5][2], data[5][3]])
      tableHeader.push(weightSum)
      tableHeader.push(['课程目标达成度情况', '', '', '', '', '', '', '', '', '', '', '', '权重', '权重值'])
      let score = this.getExamData(coefficients, data)
      let weight = JSON.parse(localStorage.getItem('weight'))
      tableHeader.push(['达成度（考核成绩法）', '', score[0], score[1], score[2], score[3], '', '', '', '', '', '', 'α', weight[0]])
      tableHeader.push(['达成度（教师评价法）', '', data[3][0], data[3][1], data[3][2], data[3][3], '', '', '', '', '', '', 'β', weight[1]])
      tableHeader.push(['达成度（学生自评法）', '', data[4][0], data[4][1], data[4][2], data[4][3], '', '', '', '', '', '', 'γ', weight[2]])
      let multiple = this.getMultiple(score, data, weight)
      tableHeader.push(['达成度（综合加权）', '', multiple[0], multiple[1], multiple[2], multiple[3]])
      tableHeader.push(['课程目标达成情况分析与持续改进'])
      tableHeader.push(['评价项', '', '达成情况分析', '', '', '持续改进措施'], [null])
      let courseAnalysis = JSON.parse(localStorage.getItem('courseAnalysis'))
      courseAnalysis.forEach(item => {
        if (item.courseName === this.formData.name && item.courseTerm === this.formData.term) {
          for (let i = 0; i < this.formData.aimNum; i++) {
            tableHeader.push(['课程目标' + (i + 1), '', courseAnalysis[0][i], '', '', courseAnalysis[0][i + this.formData.aimNum]])
          }
        } else {
          this.$message.error('未查询到课程改进措施，请您输入后再尝试')
        }
      })
      console.log(courseAnalysis)
      tableHeader.push(['', '', '', '', '', '', '', '', '', '', '', '审核时间', ''])
      return tableHeader
    },
    getTableHeader () {
      var tableHeader = []
      tableHeader.push([null], ['长春工业大学课程试卷分析报告'])
      tableHeader.push([this.formData.term])
      tableHeader.push(['课程名称', this.formData.name, '课程编码', this.formData.id, '学分', this.formData.credit, '学生班级', this.formData.class])
      tableHeader.push(['课程平台', this.formData.platform, '课程属性', this.formData.attribute, '学时', this.formData.period, '考核方式', this.formData.examination])
      tableHeader.push(['试题对课程目标的支撑情况'])
      tableHeader.push(['试题分数在各章节的分布情况'])
      tableHeader.push(['试题内容的难易情况'])
      tableHeader.push(['学生答题情况分析'])
      return tableHeader
    },
    getMultiple (score, data, weight) {
      let arr = []
      for (let j = 0; j < 4; j++) {
        let temp = 0
        for (let i = 0; i < 3; i++) {
          if (i === 0) {
            temp = temp + score[i] * weight[i]
          } else {
            temp = temp + data[i + 2][j] * weight[i]
          }
        }
        arr[j] = temp.toFixed(3)
      }
      return arr
    },
    getExamData (coefficients, data) {
      let arr = []
      for (let j = 0; j < 4; j++) {
        let temp = 0
        for (let i = 0; i < 4; i++) {
          if (i !== 3) {
            temp = temp + coefficients[i][j] * data[i][j]
          } else {
            temp = temp + coefficients[i][j] * data[5][j]
          }
        }
        arr[j] = temp
      }
      return arr
    },
    clear () {
      let _this = this
      Object.getOwnPropertyNames(this.formData).forEach((item) => {
        _this.formData[item] = ''
      })
    }
  }
}
</script>

<style>
</style>
