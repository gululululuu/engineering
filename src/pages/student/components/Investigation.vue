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
      </div>
    </div>
    <div class='Right'>
      <div v-show='isMyInfo' class='MyInfo'>
        <div class='rightForm'>
          <div class='half'>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='stuData' size='mini'>
              <el-form-item label='课程名称' prop='name'>
                <el-select v-model='stuData.name' placeholder='请选择填写问卷调查的科目'>
                  <el-option
                    v-for='item in courses'
                    :key='item.courseId'
                    :value='item.courseName'
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='学生姓名' prop='stuName'>
                <el-input v-model='stuData.stuName' placeholder='请输入您的姓名'></el-input>
              </el-form-item>
              <el-form-item label='学号' prop='credit'>
                <el-input v-model='stuData.credit' placeholder='请输入您的学号'></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class='anotherHalf'>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' size='mini'>
              <el-form-item
                v-for='item in aims'
                :key='item.value'
                :value='item.aimValue'
                :label='item.aimName'
              >
                <el-input v-model='item.aimValue' placeholder='请输入自己的目标达成度'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size='mini' @click='query()' style="width: 91px;">查询</el-button>
                <el-button size='mini' @click='submit()' style="width: 91px;">提交</el-button>
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
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        stuName: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ],
        credit: [
          { required: true, message: '请输入您的学号', trigger: 'blur' }
        ]
      },
      stuData: {
        name: '',
        stuName: '',
        credit: '',
        one: '',
        two: '',
        three: '',
        four: ''
      },
      courses: [],
      aims: []
    }
  },
  created () {
    var id = JSON.parse(localStorage.getItem('userId'))
    this.$axios({
      methods: 'get',
      url: '/stu_course',
      params: {stuId: id}
    }).then(res => {
      const data = res.data.courses
      let _this = this
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
    query () {
      let _this = this
      _this.aims = []
      this.$axios({
        method: 'get',
        url: '/aims'
      }).then(res => {
        console.log(res)
        const data = res.data.aims
        data.forEach(item => {
          if (item.courseName === this.stuData.name) {
            let aimNum = item.aimNumber
            for (let i = 1; i <= aimNum; i++) {
              _this.aims.push({ aimName: '目标' + i, aimValue: '' })
            }
          }
        })
      })
    },
    submit () {
      if (localStorage.getItem('students') === null) {
        this.$message.warning('暂未开放学生问卷调查填写权限，请耐心等待~')
      } else {
        try {
          console.log(this.aims)
          // let data = {
          //   stuName: this.stuData.stuName,
          //   stuId: this.stuData.credit,
          //   one: this.aims[0],
          //   two: this.aims[1],
          //   three: this.aims[2],
          //   four: this.aims[3],
          //   five: this.aims[4],
          //   six: this.aims[5]
          // }
          let data = {
            stuName: this.stuData.stuName,
            stuId: this.stuData.credit
          }
          for (let i = 1; i <= this.aims.length; i++) {
            data[i] = this.aims[i - 1].aimValue
          }
          console.log(data)
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

<style lang='stylus' scoped>
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
