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
      <div v-show='isMyInfo'>
        <div v-show="isSelect">
          <div class='rightForm'>
            <div class='half'>
              <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
                <el-form-item>
                  <el-button size='mini' @click='initStudents()' style="width: 192px;">开放学生问卷调查权限</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class='anotherHalf'>
              <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
                <el-form-item label='课程名称' prop='name'>
                  <el-select v-model='formData.name' placeholder='请选择要上传的科目'>
                    <el-option
                      v-for="item in courses"
                      :key='item.courseId'
                      :value="item.courseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button size='mini' @click='submit()' style="width: 192px;">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-show="isStuInfo">
          <div class='upInfo'>
            <el-form>
              <el-form-item label="课程名" prop='name'>
                <el-tag type="info">{{this.formData.name}}</el-tag>
                <el-button @click='upload()' size='small' style="float: right; margin-top: 10px;">提交</el-button>
              </el-form-item>
            </el-form>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border max-height="420" class="infoTable">
              <el-table-column prop="stuName" label="学生姓名" align="center"></el-table-column>
              <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
              <el-table-column
                v-for='item in aims'
                :key='item.value'
                :value='item.aimValue'
                :label='item.aimName'
                align="center"
              >
                <template slot-scope="scope">
                  <el-input placeholder="请输入对该学生该目标下的评分" v-if="scope.row.isClick" v-model="tableData[scope.$index][item.index]"></el-input>
                  <span v-else>{{ tableData[scope.$index][item.index] }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="change(scope)" size='small' type='text'>编辑</el-button>
                  <el-button @click="save(scope)" size='small' type='text'>保存</el-button>
                </template>
              </el-table-column>
            </el-table>
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
      isSelect: false,
      isStuInfo: false,
      labelPosition: 'right',
      loading: true,
      active: 0,
      rules: {
        term: [
          { required: true, message: '请选择教学学期', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ]
      },
      formData: {
        term: '',
        name: ''
      },
      lastClick: null,
      teaName: '',
      aimNumber: 0,
      aims: [],
      students: [],
      courses: [],
      tableData: []
    }
  },
  created () {
    var teaId = JSON.parse(localStorage.getItem('userId'))
    this.$axios({
      method: 'get',
      url: '/users' + '/' + teaId
    }).then(res => {
      const data = res.data.user
      let _this = this
      _this.teaName = data.teaName
    })
    this.$axios({
      method: 'get',
      url: '/tea_course',
      params: {teacherId: teaId}
    }).then(res => {
      console.log(res)
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
    },
    backHome () {
      this.$router.push('/')
    },
    backStu () {
      this.$router.push('/teacher')
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isSelect = true
      this.isStuInfo = false
      this.isActive = false
      this.clear()
    },
    initStudents () {
      let students = []
      localStorage.setItem('students', JSON.stringify(students))
      this.$message.success('开放成功')
    },
    // 编辑学生成绩信息
    change (scope) {
      // 再次点击则还原其他行
      if (this.lastClick) {
        this.$set(this.lastClick.row, 'isClick', false)
      }
      // 第一次点击，变成显示
      this.lastClick = scope
      this.$set(scope.row, 'isClick', true)
    },
    // 保存学生成绩信息
    save (scope) {
      // 再次点击则还原其他行
      if (this.lastClick) {
        this.$set(this.lastClick.row, 'isClick', false)
      }
      // 第一次点击，变成隐藏
      this.lastClick = scope
      this.$set(scope.row, 'isClick', false)
      console.log(this.tableData)
    },
    upload () {
      console.log(this.teaName)
      localStorage.setItem('teaEvaluation', JSON.stringify(this.tableData))
      this.$axios({
        method: 'post',
        url: '/teaEvaluation',
        params: {
          teaName: this.teaName,
          tableData: JSON.stringify(this.tableData)
        }
      }).then(res => {
        this.$message.success('上传成功')
      }).catch(e => { this.$message.warning('上传失败，请检查是否全部输入') })
    },
    submit () {
      this.isStuInfo = true
      this.isSelect = false
      let courseId = ''
      let _this = this
      this.courses.forEach(item => {
        if (item.courseName === this.formData.name) {
          courseId = item.courseId
        }
      })
      this.$axios({
        method: 'get',
        url: '/aims',
        params: {courseName: this.formData.name}
      }).then(res => {
        const data = res.data.aim
        console.log(data)
        let _this = this
        // 如果存在同名课程，此处查询的课程下目标数量可能会不精准
        _this.aimNumber = data.aimNumber
      })
      this.$axios({
        method: 'get',
        url: '/stu_course',
        params: {courseId: courseId}
      }).then(res => {
        const data = res.data.students
        data.forEach(item => {
          let stu = {
            stuName: item.Student.stuName,
            stuId: item.Student.id
          }
          console.log(this.aimNumber)
          for (let i = 1; i <= this.aimNumber; i++) {
            stu[i] = ''
          }
          _this.tableData.push(stu)
        })
        for (let i = 1; i <= this.aimNumber; i++) {
          _this.aims.push({aimName: '目标' + i, aimValue: '', index: i})
        }
        this.loading = false
      })
    },
    clear () {
      let _this = this
      _this.tableData = []
      _this.aims = []
      Object.getOwnPropertyNames(this.formData).forEach((item) => {
        _this.formData[item] = ''
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
      .upInfo
        width : 900px
        position : absolute
        left : 10%
        top : 3%
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
