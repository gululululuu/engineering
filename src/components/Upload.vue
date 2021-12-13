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
export default {
  name: 'Upload',
  data () {
    return {}
  },
  methods: {
    btnClick () {
      // 点击事件
      document.querySelector('.input-file').click()
    },
    exportData (event) {
      var _this = this
      const files = event.target.files
      console.log(files)
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
          // 取第一张表
          const wsname = workbook.SheetNames[2]
          // 生成json表格内容
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
          console.log(ws)
          console.log(ws[4])
          console.log(ws[5])
          // 处理数据
          let total = 0
          const obj2 = Object.keys(ws[4])
          for (let [key, value] of Object.entries(ws[8])) {
            if (obj2.includes(key) && key !== '__EMPTY') {
              total = total + value
            }
          }
          console.log(ws[6])
          console.log(ws[8])
          console.log(ws[4].__EMPTY)
          console.log(total)
          // 清空接收数据
          _this.outputs = []
          // 编辑数据
          for (var i = 0; i < ws.length; i++) {
            var sheetData = {
              address: ws[i].addr,
              value: ws[i].value
            }
            _this.outputs.push(sheetData)
          }
          this.$refs.upload.value = ''
          _this.$emit('getResult', ws)
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    }
  }
}
</script>

<style lang="stylus" scoped>
  .input-file
    display: none
</style>
