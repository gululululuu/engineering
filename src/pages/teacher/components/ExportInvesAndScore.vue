<template>
  <div class="ExportUpload">
    <div class='Score'>
      <div class="Mes">
        <p>完成课程目标</p>
          <p style="color: red;">成绩分布比例参数上传</p>
        <p>后导出成绩分布表</p></div>
      <ExportScore class="Export"></ExportScore>
    </div>
    <div class='Inves'>
      <div class="Mes" style="margin-left: 40px;">
        <p>完成课程目标</p>
        <p style="color: red;">问卷调查</p>
        <p>后导出成绩分布表</p></div>
      <ExportInves class="Export" style='margin-left: 500px;'></ExportInves>
    </div>
    <div class='InvesAndScore'>
      <div class="Mes" style="margin-left: -70px;">
        <p>完成课程目标</p>
        <p style="color: red;">成绩分布比例参数上传 和 问卷调查</p>
        <p>后导出成绩分布表</p></div>
      <ExportScoreExcelTable class="Export"></ExportScoreExcelTable>
    </div>
  </div>
</template>

<script>
import ExportScore from './ExportScore'
import ExportScoreExcelTable from './ExportScoreExcelTable'
import ExportInves from './ExportInves'
export default {
  name: 'ExportInvesAndScore',
  components: {
    ExportScore,
    ExportScoreExcelTable,
    ExportInves
  }
}
</script>

<style lang="stylus" scoped>
  .ExportUpload
    width : 100%
    height : 500px
    .Score
      position : absolute
      margin : 0
      width : 100%
      height : 150px
    .Inves
      position : absolute
      top : 150px
      width : 100%
      height : 150px
    .InvesAndScore
      position : absolute
      top : 300px
      width : 100%
      height : 150px
  .Mes
    position: absolute
    width: 50%
    height: 50px
    top: 20px
    left : 30%
    p
      display : inline
      font-family : '宋体'
      font-size : 18px
  .Export
    margin-left : 43%
    margin-top: 80px
</style>
