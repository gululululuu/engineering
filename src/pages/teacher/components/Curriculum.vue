<template>
  <div class='Center'>
    <div class='head'>
      <p class='headFonts'>课程专区</p>
      <p class='headOut' @click='backLogin()'>注销</p>
      <p class='headMe' @click='backStu()'>我的</p>
    </div>
    <div class='Left'>
      <div class='back'>
        <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
        <p class='backFonts' @click='backHome()'>返回首页</p>
      </div>
      <div class='inputBox'>
        <button class='leftButton' @click='toMyInfo()'><p class='buttonFonts'>课程评估</p></button>
        <button class='leftButton' @click='toMyAnalysis()'><p class='buttonFonts'>达成分析</p></button>
        <button class='leftButton' @click='toMyReport()'><p class='buttonFonts'>生成报告</p></button>
        <button class='leftButton' @click='toAdd()'><p class='buttonFonts'>添加课程</p></button>
      </div>
    </div>
    <div class='Right'>
      <div v-show='isMyInfo'>
        <div v-show="isInfo" class='rightUpload'>
          <el-steps :active="active" finish-status="success" process-status="wait" space="400px">
            <el-step title="步骤 1" description="请确认您是否完成问卷调查"></el-step>
            <el-step title="步骤 2" description="请确认学生们是否完成问卷调查"></el-step>
            <el-step title="步骤 3" description="请确认您是否要上传成绩"></el-step>
          </el-steps>
          <el-button size='mini' @click="next()" style="margin-top: 22px;">下一步</el-button>
          <div v-show='isUpload' @click='toUpload()' class='upload'>
            <Upload></Upload>
          </div>
        </div>
        <div v-if="isDiagram" class="rightInfo">
          <ScatterDiagram></ScatterDiagram>
        </div>
      </div>
      <div v-show="isMyAnalysis">
        <Analysis></Analysis>
      </div>
      <div v-show='isMyReport'>
        <div class='rightForm'>
          <div class="half">
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
              <el-form-item label='教学学期' prop='term'>
                <el-select v-model='formData.term' placeholder='请选择教学学期'>
                  <el-option label='2020-2021 年度 第 一 学期' value='2020-2021 年度 第 一 学期'></el-option>
                  <el-option label='2020-2021 年度 第 二 学期' value='2020-2021 年度 第 二 学期'></el-option>
                  <el-option label='2019-2020 年度 第 一 学期' value='2019-2020 年度 第 一 学期'></el-option>
                  <el-option label='2019-2020 年度 第 二 学期' value='2019-2020 年度 第 二 学期'></el-option>
                  <el-option label='2018-2019 年度 第 一 学期' value='2018-2019 年度 第 一 学期'></el-option>
                  <el-option label='2018-2019 年度 第 二 学期' value='2018-2019 年度 第 二 学期'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='课程编码' prop='id'>
                <el-input v-model='formData.id' placeholder='请输入课程编码'></el-input>
              </el-form-item>
              <el-form-item label='学生班级' prop='class'>
                <el-input v-model='formData.class' placeholder='请输入学生班级'></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="anotherHalf">
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
              <el-form-item label='课程名称' prop='courseName'>
                <el-select v-model='formData.courseName' placeholder='请选择要上传的科目'>
                  <el-option
                    v-for="item in courses"
                    :key='item.courseId'
                    :value="item.courseName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='学时' prop='period'>
                <el-input v-model='formData.period' placeholder='请输入课程学时'></el-input>
              </el-form-item>
              <el-form-item label='学分' prop='credit'>
                <el-input v-model='formData.credit' placeholder='请输入课程学分'></el-input>
              </el-form-item>
              <el-form-item label-position='right' label-width='80px'>
                <el-button size='mini' @click='submit()'>提交</el-button>
                <ExportExcel v-bind:formData='formData' style="margin-left: 46px;"></ExportExcel>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div v-show='isToAdd'>
        <AddCourse></AddCourse>
      </div>
      <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Upload from '../../../components/Upload.vue'
import ScatterDiagram from '../../../components/ScatterDiagram.vue'
import AddCourse from './AddCourse.vue'
import ExportExcel from './ExportExcel.vue'
import Analysis from './Analysis.vue'
export default {
  name: 'Curriculum',
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isMyAnalysis: false,
      isMyReport: false,
      isToAdd: false,
      isUpload: false,
      isDiagram: false,
      isInfo: false,
      active: 0,
      labelPosition: 'right',
      rules: {
        term: [
          { required: true, message: '请选择上课日期', trigger: 'blur' }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入课程编码', trigger: 'blur' }
        ],
        credit: [
          { required: true, message: '请输入课程学分', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请输入授课班级', trigger: 'blur' }
        ],
        period: [
          { required: true, message: '请输入课程学时', trigger: 'blur' }
        ]
      },
      formData: {
        term: '',
        courseName: '',
        id: '',
        credit: '',
        class: '',
        period: '',
        aimNum: 0,
        teaName: ''
      },
      courses: []
    }
  },
  components: {
    Upload,
    ScatterDiagram,
    AddCourse,
    ExportExcel,
    Analysis
  },
  // 在数据库中查找当前教师教授的所有课程
  created () {
    var id = JSON.parse(localStorage.getItem('userId'))
    this.$axios({
      methods: 'get',
      url: '/courses',
      params: {id: id}
    }).then(res => {
      const data = res.data.courses
      let _this = this
      data.forEach(item => {
        let course = {
          courseName: item.courseName,
          courseId: item.id
        }
        _this.courses.push(course)
      })
    })
  },
  methods: {
    ...mapMutations(['delLogin']),
    submit () {
      try {
        let _this = this
        this.$axios({
          method: 'get', url: '/aims', params: {courseName: this.formData.courseName}
        }).then(res => {
          const data = res.data.aim
          _this.formData.aimNum = data.aimNumber
        })
        this.$axios({
          method: 'get', url: '/courses', params: {courseName: this.formData.courseName}
        }).then(res => {
          console.log(res)
          const data = res.data.courses[0]
          _this.formData.teaName = data.Teacher.teaName
        })
        this.$message.success('上传成功！')
      } catch (e) {
        this.$message.warning('上传错误，请联系管理员！')
      }
    },
    backLogin () {
      this.$router.push('/login')
      this.delLogin()
      localStorage.removeItem('userId')
    },
    backStu () {
      this.$router.push('/teacher')
    },
    backHome () {
      this.$router.push('/')
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isInfo = true
      this.isUpload = false
      this.isDiagram = false
      this.isActive = false
      this.isMyAnalysis = false
      this.isToAdd = false
      this.isMyReport = false
      this.active = 0
    },
    toMyAnalysis () {
      this.isMyAnalysis = true
      this.isMyInfo = false
      this.isActive = false
      this.isDiagram = false
      this.isToAdd = false
      this.isMyReport = false
    },
    toMyReport () {
      this.isMyReport = true
      this.isActive = false
      this.isDiagram = false
      this.isMyAnalysis = false
      this.isMyInfo = false
      this.isToAdd = false
    },
    toAdd () {
      this.isToAdd = true
      this.isActive = false
      this.isDiagram = false
      this.isMyAnalysis = false
      this.isMyInfo = false
      this.isMyReport = false
    },
    toUpload () {
      this.isDiagram = true
      this.isInfo = false
    },
    next () {
      if (this.active++ > 1) {
        this.isUpload = true
      }
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
      .headOut
        font-family : '宋体'
        position : fixed
        right : 80px
        top : 6px
        margin : 0
        cursor : pointer
      .headFonts
        font-family : '宋体'
        position : fixed
        left : 18px
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
        .leftButton
          width : 100%
          cursor : pointer
          border-radius : 5px
          background-color : skyblue
          border : 1px solid #CCCCCC
          margin-top : 5%
          .buttonFonts
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
      .rightInfo
        text-align : center
        line-height : 500px
      .rightUpload
        position : absolute
        top : 10%
        left : 22%
        width : 850px
        height : 500px
        .upload
          position : absolute
          left : 20%
          top : 20%
          width : 137px
          height : 22px
      .rightForm
        position : absolute
        top : 10%
        left : 22%
        width : 550px
        height : 500px
        margin : 0
        .half
          position : absolute
          left : 0
        .anotherHalf
          position : absolute
          right : 0
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
