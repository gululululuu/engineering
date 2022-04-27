<template>
  <div class='Center'>
    <div class='head'>
      <p class='headFonts'>成绩专区</p>
      <p class="headOut" @click="backLogin()">注销</p>
      <p class='headMe' @click='backStu()'>我的</p>
    </div>
    <div class='Left'>
      <div class='back'>
        <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
        <p class='backFonts' @click='backHome()'>返回首页</p>
      </div>
      <div class='inputBox'>
        <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>查询成绩</p></button>
      </div>
    </div>
    <div class='Right'>
      <div v-show='isMyInfo'>
        <div v-show="isSelect" class='MyInfo'>
          <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='stuData' size='mini'>
            <el-form-item label='课程名称' prop='name'>
              <el-select v-model='stuData.name' placeholder='请选择查询的课程名称'>
                <el-option
                  v-for='item in courses'
                  :key='item.courseId'
                  :value='item.courseName'
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-position='right' label-width='80px'>
              <el-button size='mini' @click='getFormDataName()'>查询</el-button>
              <el-button size='mini' @click='getAllCourses()' style="margin-left: 49px;">查询全部</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="isScore" class="score">
          <div class="backLastest">
            <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
            <p class='backFonts' @click='back()'>返回上一层</p>
          </div>
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border max-height="500" class="infoTable">
            <el-table-column prop="courseName" label="课程名称" align="center"></el-table-column>
            <el-table-column prop="courseId" label="课程编号" align="center"></el-table-column>
            <el-table-column prop="score" label="总分" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
      <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ScoreManage',
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isSelect: false,
      isScore: false,
      labelPosition: 'right',
      loading: true,
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ]
      },
      stuData: {
        name: ''
      },
      courses: [],
      tableData: []
    }
  },
  created () {
    var id = JSON.parse(localStorage.getItem('userId'))
    let _this = this
    this.$axios({
      methods: 'get',
      url: '/stu_course',
      params: {stuId: id}
    }).then(res => {
      const data = res.data.courses
      data.forEach(item => {
        let course = {
          courseName: item.Course.courseName,
          courseId: item.Course.id
        }
        _this.courses.push(course)
      })
    })
  },
  methods: {
    ...mapMutations(['delLogin']),
    backLogin () {
      this.$router.push('/login')
      this.delLogin()
      localStorage.removeItem('userId')
      localStorage.removeItem('success')
    },
    backHome () {
      this.$router.push('/')
    },
    backStu () {
      this.$router.push('/student')
    },
    back () {
      this.isScore = false
      this.isSelect = true
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isSelect = true
      this.isScore = false
      this.isActive = false
    },
    getFormDataName () {
      if (this.stuData.name === '') {
        this.$message.warning('请选择您要查询的学科名称')
      } else {
        this.isScore = true
        this.isSelect = false
        var _this = this
        _this.tableData = []
        let stuId = JSON.parse(localStorage.getItem('userId'))
        this.$axios({
          method: 'get', url: '/stu_course', params: {stuId: stuId}
        }).then(res => {
          const data = res.data.courses
          data.forEach(item => {
            if (item.Course.courseName === this.stuData.name) {
              let obj = {
                courseName: item.Course.courseName,
                courseId: item.courseId,
                score: item.score
              }
              _this.tableData.push(obj)
            }
          })
          this.loading = false
        })
      }
    },
    getAllCourses () {
      this.isScore = true
      this.isSelect = false
      var _this = this
      _this.tableData = []
      let stuId = JSON.parse(localStorage.getItem('userId'))
      this.$axios({
        method: 'get', url: '/stu_course', params: {stuId: stuId}
      }).then(res => {
        const data = res.data.courses
        data.forEach(item => {
          let obj = {
            courseName: item.Course.courseName,
            courseId: item.courseId,
            score: item.score
          }
          _this.tableData.push(obj)
        })
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .Center
    width : 100%
    height : 580px
    .head
      position : fixed
      top : 0
      left : 0
      width : 100%
      height : 30px
      background-color : skyblue
      .headFonts
        font-family : '宋体'
        position : fixed
        left : 18px
        top : 6px
        margin : 0
      .headOut
        font-family : '宋体'
        position : fixed
        right : 80px
        top : 6px
        margin : 0
        cursor : pointer
      .headMe
        font-family : '宋体'
        position : fixed
        right : 32px
        top: 6px
        margin : 0
        cursor : pointer
        cursor : pointer
    .Left
      position : absolute
      left : 2px
      top: 32px
      width : 11%
      height : 500px
      border : 1px solid #8CC5FF
      background-color : #CCCCCC
      float : left
      margin-right : 20px
      .back
        width : 100%
        height : 30px
        cursor : pointer
        border-radius : 10px
        .backImg
          width : 25px
          height : 25px
          margin-left : 5px
        .backFonts
          font-family : '宋体'
          font-size : 16px
          display : inline
          float : right
          margin : 5px 15px 0px 0px
      .inputBox
        width : 100%
        margin-top : 5%
        .investigation
          width : 100%
          cursor : pointer
          border-radius : 5px
          background-color : skyblue
          border : 1px solid #CCCCCC
          margin-top : 5%
          .invesFonts
            font-family : '宋体'
            font-size : 16px
            margin : 10px
    .Right
      position : absolute
      top : 32px
      right : 2px
      width : 88%
      height : 500px
      background-color : #F0F7FF
      .MyInfo
        position : absolute
        top : 10%
        left : 35%
        width : 270px
        height : 500px
      .score
        position : absolute
        left : 5%
        top : 10%
        width : 1000px
        .infoTable
          position : absolute
          top : 30px
        .backLastest
          width : 1000px
          display : inline
          height : 30px
          cursor : pointer
          border-radius : 10px
          margin-bottom : 10px
          .backImg
            position : absolute
            top : 10%
            width : 25px
            height : 25px
            margin-left : 5px
          .backFonts
            position : absolute
            left : 5%
            top : 10%
            font-family : '宋体'
            font-size : 17px
            display : inline
            float : right
            margin : 3px 15px 0px 0px
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
