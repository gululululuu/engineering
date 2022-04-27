<template>
  <el-button @click='loadExcel' size='mini'>导出评价表</el-button>
</template>

<script>
import { dataConversionUtil } from '../../../assets/js/exportToExcel.js'
export default {
  name: 'ExportScoreExcelTable',
  data () {
    return {
      investigationItems: [
        ['教师评价', 'teaEvaluation'],
        ['学生评价', 'students']
      ]
    }
  },
  methods: {
    loadExcel () {
      try {
        // 评价表格
        let invesTables = []
        for (let i = 0; i < this.investigationItems.length; i++) {
          let datas = []
          let info = JSON.parse(localStorage.getItem(this.investigationItems[i][1]))
          let courseId = JSON.parse(localStorage.getItem('aim'))[2].courseId
          info.forEach(item => {
            let data = {
              id: item.stuId,
              name: item.stuName
            }
            let index = 1
            // 学生自我评价
            if (i === 1) {
              if (item.courseId === courseId) {
                for (let i = 1; i <= (Object.getOwnPropertyNames(item).length - 2); i++) {
                  data[index++] = item[i]
                }
                datas.push(data)
              }
            } else {
              // 教师评价
              for (let i = 1; i <= (Object.getOwnPropertyNames(item).length - 3); i++) {
                data[index++] = item[i]
              }
              datas.push(data)
            }
          })
          let aimNum = parseInt(JSON.parse(localStorage.getItem('aim'))[2].totalAim)
          var tableHeader = this.getTableHeader(this.investigationItems[i], aimNum)
          var invesDataList = []
          datas.forEach(item => {
            var arr = []
            arr.push(item.id, item.name)
            for (let i = 1; i <= aimNum; i++) {
              arr.push(item[i])
            }
            invesDataList.push(arr)
          })
          console.log(invesDataList)
          invesTables.push(tableHeader, invesDataList)
        }
        dataConversionUtil.investigationToExcel(this.investigationItems, invesTables)
        this.$message.success('导出成功！')
      } catch (e) {
        this.$message.warning('导出错误，请联系管理员！')
        console.log(e)
      }
    },
    getTableHeader (item, index) {
      var tableHeader = []
      tableHeader.push([item[0]])
      tableHeader.push(['学生学号', '学生姓名', '课程目标'])
      var aims = []
      var full = []
      aims.push('', '')
      full.push('', '满分')
      for (let i = 1; i <= index; i++) {
        aims.push('目标' + i)
        full.push('1')
      }
      tableHeader.push(aims, full)
      return tableHeader
    }
  }
}
</script>

<style>
</style>
