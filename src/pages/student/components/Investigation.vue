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
        <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>填写问卷</p></button>
      </div>
    </div>
    <div class='Right'>
      <div v-show='isMyInfo' class='MyInfo'>
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
            </el-form>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='stuData' size='mini'>
              <el-form-item label='学生姓名' prop='stuName'>
                <el-input v-model='stuData.stuName' placeholder='请输入您的姓名'></el-input>
              </el-form-item>
              <el-form-item label='目标一' prop='one'>
                <el-input v-model='stuData.one' placeholder='请输入自己的目标一达成度'></el-input>
              </el-form-item>
              <el-form-item label='目标三' prop='three'>
                <el-input v-model='stuData.three' placeholder='请输入自己的目标三达成度'></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="anotherHalf">
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
              <el-form-item label='课程名称' prop='name'>
                <el-input v-model='formData.name' placeholder='请输入课程名称'></el-input>
              </el-form-item>
            </el-form>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='stuData' size='mini'>
              <el-form-item label='学号' prop='credit'>
                <el-input v-model='stuData.credit' placeholder='请输入您的学号'></el-input>
              </el-form-item>
              <el-form-item label='目标二' prop='two'>
                <el-input v-model='stuData.two' placeholder='请输入自己的目标二达成度'></el-input>
              </el-form-item>
              <el-form-item label='目标四' prop='four'>
                <el-input v-model='stuData.four' placeholder='请输入自己的目标四达成度'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size='mini' @click='submit()'>提交</el-button>
              </el-form-item>
            </el-form>
          </div>
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
      labelPosition: 'right',
      rules: {
        term: [
          { required: true, message: '请选择教学学期', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        stuName: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ],
        credit: [
          { required: true, message: '请输入您的学号', trigger: 'blur' }
        ],
        one: [
          { required: true, message: '请输入您的目标一的达成度', trigger: 'blur' }
        ],
        two: [
          { required: true, message: '请输入您的目标二的达成度', trigger: 'blur' }
        ],
        three: [
          { required: true, message: '请输入您的目标三的达成度', trigger: 'blur' }
        ],
        four: [
          { required: true, message: '请输入您的目标四的达成度', trigger: 'blur' }
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
      }
    }
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
    toMyInfo () {
      this.isMyInfo = true
      this.isActive = false
      this.check()
    },
    check () {
      if (localStorage.getItem('success') === 'done') {
        this.$message.info('您已提交过调查问卷，无需再次填写，即将返回主页面')
        setTimeout(() => {
          this.$router.push('/student')
        }, 2000)
      }
    },
    submit () {
      if (localStorage.getItem('students') === null) {
        this.$message.warning('暂未开放学生问卷调查填写权限，请耐心等待~')
      } else {
        try {
          let data = {
            stuName: this.stuData.stuName,
            credit: this.stuData.credit,
            one: this.stuData.one,
            two: this.stuData.two,
            three: this.stuData.three,
            four: this.stuData.four
          }
          Object.getOwnPropertyNames(data).forEach((item) => {
            if (data[item] === '') {
              const error = {message: '未全部填写完成'}
              throw error
            }
          })
          let stuData = JSON.parse(localStorage.getItem('students'))
          stuData.push(data)
          localStorage.setItem('students', JSON.stringify(stuData))
          this.$message.success('提交成功')
          localStorage.setItem('success', 'done')
          console.log(JSON.parse(localStorage.getItem('students')))
          this.$router.push('/student')
        } catch (e) {
          console.log(e)
          this.$message.error('请确认您是否全部正确填写完成')
        }
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
      .rightUpload
        text-align : center
        line-height : 500px
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
