<template>
  <div class="addCourse">
    <table class="table">
      <tr class="headTr">
        <th colspan="2">请在下表填写新增课程信息，填写完毕点击<p class="submitFont">提交</p>按钮进行提交审核</th>
      </tr>
      <tr>
        <td>课程名称</td>
        <td><el-input v-model="courseName"></el-input></td>
      </tr>
      <tr>
        <td>课程编号</td>
        <td><el-input v-model="courseId"></el-input></td>
      </tr>
      <tr>
        <td>课程学分</td>
        <td><el-input v-model="courseCredit"></el-input></td>
      </tr>
      <tr>
        <td>课程学时</td>
        <td><el-input v-model="courseTime"></el-input></td>
      </tr>
      <tr>
        <td>申请人</td>
        <td><el-input v-model="applicant"></el-input></td>
      </tr>
      <tr>
        <td colspan="2" class="sumbit" @click="addCourse()"><el-button>提交</el-button></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AddCourse',
  data () {
    return {
      courseName: '',
      courseId: '',
      courseCredit: '',
      courseTime: '',
      applicant: ''
    }
  },
  methods: {
    addCourse () {
      console.log(this.courseName)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .addCourse
    margin : 0
    padding : 0
    width : 100%
    height : 500px
    .table
      background-color : #F2F2f2
      position : absolute
      left : 30%
      top : 10%
      width : 500px
      height : 300px
      th
        line-height : 50px
        width : 100px
        overflow : hidden
        border-bottom : 3px solid white
      .submitFont
        font-family : '宋体'
        font-weight : bold
        font-size : 20px
        color : blue
        display : inline
      .sumbit
        text-align : right
      td
        line-height : 50px
        width : 100px
        overflow : hidden
</style>
