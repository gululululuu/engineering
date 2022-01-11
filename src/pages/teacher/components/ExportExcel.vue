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
        // var data = [
        //   {name: '阿三', sex: '男', age: '24'},
        //   {name: '阿梅', sex: '女', age: '16'}
        // ]
        // var tableHeader = [
        //   ['长春工业大学课程试卷分析报告'],
        //   ['2020-2021年度第一学期'],
        //   ['课程名称', '课程编码', '学分', '学生班级'],
        //   ['课程平台', '课程属性', '学时', '考核方式']
        // ]
        console.log(this.formData)
        var tableHeader = this.getTableHeader()
        // var dataList = []
        // data.forEach((item, index) => {
        //   dataList.push([index + 1, item.name, item.sex, item.age])
        // })
        dataConversionUtil.dataToExcel('试卷分析报告', tableHeader)
        this.$message.success('导出成功！')
        this.clear()
      } catch (e) {
        this.$message.warning('导出错误，请联系管理员！')
        console.log(e)
      }
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
    clear () {
      setTimeout(() => {
        this.formData.term = ''
        this.formData.name = ''
        this.formData.id = ''
        this.formData.credit = ''
        this.formData.class = ''
        this.formData.platform = ''
        this.formData.attribute = ''
        this.formData.period = ''
        this.formData.examination = ''
      }, 300)
    }
  }
}
</script>

<style>
</style>
