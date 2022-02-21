<template>
  <div class='Center'>
    <div class='head'>
      <p class='headFonts'>成绩专区</p>
      <p class='headOut' @click='backLogin()'>注销</p>
      <p class='headMe' @click='backStu()'>我的</p>
    </div>
    <div class='Left'>
      <div class='back'>
        <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
        <p class='backFonts' @click='backHome()'>返回首页</p>
      </div>
      <div class='inputBox'>
        <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>填写问卷</p></button>
        <button class='investigation' @click='toMyResult()'><p class='invesFonts'>导出结果</p></button>
      </div>
    </div>
    <div class='Right'>
      <div v-show='isMyInfo'>
        <div class='rightForm'>
          <div class='half'>
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
            </el-form>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='stuData' size='mini'>
              <el-form-item label='学生姓名' prop='stuName'>
                <el-input v-model='stuData.stuName' placeholder='请输入该学生的姓名'></el-input>
              </el-form-item>
              <el-form-item label='目标一' prop='one'>
                <el-input v-model='stuData.one' placeholder='请输入该学生目标一的达成度'></el-input>
              </el-form-item>
              <el-form-item label='目标三' prop='three'>
                <el-input v-model='stuData.three' placeholder='请输入该学生目标三的达成度'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size='mini' @click='initStudents()' style="width: 200px;">开放学生问卷调查权限</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class='anotherHalf'>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
              <el-form-item label='课程名称' prop='name'>
                <el-input v-model='formData.name' placeholder='请输入课程名称'></el-input>
              </el-form-item>
            </el-form>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='stuData' size='mini'>
              <el-form-item label='学号' prop='credit'>
                <el-input v-model='stuData.credit' placeholder='请输入该学生的学号'></el-input>
              </el-form-item>
              <el-form-item label='目标二' prop='two'>
                <el-input v-model='stuData.two' placeholder='请输入该学生目标二的达成度'></el-input>
              </el-form-item>
              <el-form-item label='目标四' prop='four'>
                <el-input v-model='stuData.four' placeholder='请输入该学生目标四的达成度'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size='mini' @click='submit()'>提交</el-button>
                <el-button size='mini' @click='clear()'>下一个</el-button>
                <ExportInvestigation v-bind:students='students'></ExportInvestigation>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div v-show='isMyResult' class='MyResult'>
        <el-steps :active="active" finish-status="success" process-status="wait" space="400px">
          <el-step title="步骤 1" description="请确认您是否完成问卷调查"></el-step>
          <el-step title="步骤 2" description="请确认学生们是否完成问卷调查"></el-step>
          <el-step title="步骤 3" description="请确认您是否要导出学生评价"></el-step>
        </el-steps>
        <el-button size='mini' @click="next()" style="margin-top: 22px;">下一步</el-button>
        <ExportStudentInvestigation v-if='isDone'></ExportStudentInvestigation>
      </div>
      <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ExportInvestigation from './ExportInvestigation.vue'
import ExportStudentInvestigation from './ExportStudentInvestigation.vue'
export default {
  name: 'ScoreManage',
  components: {
    ExportInvestigation,
    ExportStudentInvestigation
  },
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isMyResult: false,
      isDone: false,
      labelPosition: 'right',
      active: 0,
      rules: {
        term: [
          { required: true, message: '请选择教学学期', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        stuName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        credit: [
          { required: true, message: '请输入学生学号', trigger: 'blur' }
        ],
        one: [
          { required: true, message: '请输入该学生目标一的达成度', trigger: 'blur' }
        ],
        two: [
          { required: true, message: '请输入该学生目标二的达成度', trigger: 'blur' }
        ],
        three: [
          { required: true, message: '请输入该学生目标三的达成度', trigger: 'blur' }
        ],
        four: [
          { required: true, message: '请输入该学生目标四的达成度', trigger: 'blur' }
        ]
      },
      formData: {
        term: '',
        name: ''
      },
      stuData: {
        stuName: '',
        credit: '',
        one: '',
        two: '',
        three: '',
        four: ''
      },
      students: []
    }
  },
  methods: {
    ...mapMutations(['delLogin']),
    backLogin () {
      this.$router.push('/login')
      this.delLogin()
      localStorage.removeItem('username')
    },
    backHome () {
      this.$router.push('/')
    },
    backStu () {
      this.$router.push('/teacher')
    },
    next () {
      if (this.active++ > 1) {
        this.isDone = true
      }
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isActive = false
      this.isMyResult = false
    },
    toMyResult () {
      this.isMyResult = true
      this.isMyInfo = false
      this.isActive = false
      this.active = 0
      this.isDone = false
    },
    initStudents () {
      let students = []
      localStorage.setItem('students', JSON.stringify(students))
      this.$message.success('开放成功')
    },
    submit () {
      let data = {
        stuName: this.stuData.stuName,
        credit: this.stuData.credit,
        one: this.stuData.one,
        two: this.stuData.two,
        three: this.stuData.three,
        four: this.stuData.four
      }
      let _this = this
      _this.students.push(data)
      this.$message.success('提交成功，可点击下一个继续提交')
    },
    clear () {
      setTimeout(() => {
        this.stuData.stuName = ''
        this.stuData.credit = ''
        this.stuData.one = ''
        this.stuData.two = ''
        this.stuData.three = ''
        this.stuData.four = ''
      }, 200)
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
      .MyResult
        position : absolute
        top : 10%
        left : 22%
        width : 850px
      .rightForm
        position : absolute
        top : 10%
        left : 22%
        width : 600px
        height : 500px
        margin : 0
        .half
          position : absolute
          left : 0
        .anotherHalf
          position : absolute
          right : 0
        .pagination
          position : absolute
          bottom : 0
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
