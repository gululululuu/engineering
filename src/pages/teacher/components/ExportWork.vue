<template>
  <el-button @click='loadExcel' size='mini'>导出Excel</el-button>
</template>

<script>
import { dataConversionUtil } from '../../../assets/js/exportToExcel.js'
export default {
  name: 'ExportWork',
  data () {
    return {
      items: [
        ['work', '作业', '作业成绩'],
        ['experiment', '实验', '实验成绩'],
        ['test', '随堂测验', '随堂测验']
      ]
    }
  },
  methods: {
    loadExcel () {
      try {
        let tables = []
        this.items.forEach(item => {
          // console.log(JSON.parse(localStorage.getItem(item[0])))
          var dataList = []
          var datas = JSON.parse(localStorage.getItem('stuInfo'))
          datas.forEach(data => {
            dataList.push([data.Student.id, data.Student.stuName])
          })
          var tableHeader = this.getTable(item)
          tables.push(tableHeader, dataList)
        })
        console.log(tables)
        dataConversionUtil.workToExcel(this.items, tables)
        this.$message.success('导出成功！')
      } catch (e) {
        this.$message.warning('导出错误，请联系管理员！')
        console.log(e)
      }
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
