<template>
  <el-button @click='loadExcel' size='mini'>导出Excel</el-button>
</template>

<script>
import { dataConversionUtil } from '../../../assets/js/exportToExcel.js'
export default {
  name: 'Excel',
  props: ['students'],
  methods: {
    loadExcel () {
      try {
        let datas = []
        let students = this.students
        students.map(item => {
          let data = {
            credit: item.credit,
            name: item.stuName,
            item1: item.one,
            item2: item.two,
            item3: item.three,
            item4: item.four
          }
          datas.push(data)
        })
        var tableHeader = this.getTableHeader()
        var dataList = []
        datas.forEach((item, index) => {
          dataList.push([item.credit, item.name, item.item1, item.item2, item.item3, item.item4])
        })
        dataConversionUtil.investigationToExcel('教师评价', tableHeader, dataList)
        this.$message.success('导出成功！')
        // this.clear()
      } catch (e) {
        this.$message.warning('导出错误，请联系管理员！')
        console.log(e)
      }
    },
    getTableHeader () {
      var tableHeader = []
      tableHeader.push(['教师评价'])
      tableHeader.push(['学生学号', '学生姓名', '课程目标'])
      tableHeader.push([null, null, '目标1', '目标2', '目标3', '目标4'])
      tableHeader.push([null, '满分', '1', '1', '1', '1'])
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
