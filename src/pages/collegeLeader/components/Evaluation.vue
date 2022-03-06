<template>
  <div>
    <div class='Center'>
      <div class='head'>
        <p class='headFonts'>评估中心</p>
        <p class="headOut" @click="backLogin()">注销</p>
        <p class='headMe' @click='backCollege()'>我的</p>
      </div>
      <div class='Left'>
        <div class='back'>
          <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
          <p class='backFonts' @click='backHome()'>返回首页</p>
        </div>
        <div class='inputBox'>
          <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>查看评估信息</p></button>
          <button class='investigation' @click='toMySituation()'><p class='invesFonts'>审核评估情况</p></button>
        </div>
      </div>
      <div class='Right'>
        <div v-show='isMyInfo' class='MyInfo'>
          <div v-show='isSelect' class='basicInfo'>
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
              <el-form-item label='课程名称' prop='name'>
                <el-input v-model='formData.name' placeholder='请输入课程名称'></el-input>
              </el-form-item>
              <el-form-item label-position='right' label-width='80px'>
                <el-button size='mini' @click='query()'>查询</el-button>
                <el-button size='mini' @click='queryAll()' style="margin-left: 25px;">查询所有课程</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="isOne" class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <el-descriptions direction="vertical" border>
              <el-descriptions-item label="教学学期">{{ formData.term }}</el-descriptions-item>
              <el-descriptions-item label="课程名称">{{ formData.name }}</el-descriptions-item>
              <el-descriptions-item label="授课教师">{{ teacherName }}</el-descriptions-item>
              <el-descriptions-item label="课程评估信息" :span="2">{{ info }}</el-descriptions-item>
            </el-descriptions>
          </div>
          <div v-show='isAll' class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="term" label="教学学期"></el-table-column>
              <el-table-column prop="courseName" label="课程名称" width="180"></el-table-column>
              <el-table-column prop="teacherName" label="授课教师" width="180"></el-table-column>
              <el-table-column prop="info" label="课程评估信息"></el-table-column>
            </el-table>
          </div>
        </div>
        <div v-show='isMySituation' class='MyInfo'>
          <div class='allInfo'>
            <div v-show='isSituation'>
              <div class='basicHead'>
                <p class='info'>请对全院的课程评估情况进行审核</p>
              </div>
              <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="professionData"
                style="width: 100%"
                row-key="id"
                border>
                <el-table-column prop="term" label="教学学期" sortable></el-table-column>
                <el-table-column prop="major" label="专业" sortable width="140px"></el-table-column>
                <el-table-column prop="courseName" label="课程名称"></el-table-column>
                <el-table-column prop="teacherName" label="授课教师" width="90px"></el-table-column>
                <el-table-column prop="info" label="课程评估信息" width="140px"></el-table-column>
                <el-table-column label="审核决定">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.row)">达成</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.row)">未达成</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class='basicHead'>
                <el-button size="mini" @click="toResult()" class="info">确定</el-button>
              </div>
            </div>
            <div v-show="isResult">
              <div class='basicHead'>
                <p class='info'>课程目标达成</p>
              </div>
              <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="reachedData"
                style="width: 100%"
                row-key="id"
                border>
                <el-table-column prop="term" label="教学学期" sortable></el-table-column>
                <el-table-column prop="major" label="专业" sortable width="140px"></el-table-column>
                <el-table-column prop="courseName" label="课程名称"></el-table-column>
                <el-table-column prop="teacherName" label="授课教师" width="90px"></el-table-column>
                <el-table-column prop="info" label="课程评估信息" width="140px"></el-table-column>
              </el-table>
              <div class='basicHead'>
                <p class='info'>课程目标未达成</p>
              </div>
              <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="notReachedData"
                style="width: 100%"
                row-key="id"
                border>
                <el-table-column prop="term" label="教学学期" sortable></el-table-column>
                <el-table-column prop="major" label="专业" sortable width="140px"></el-table-column>
                <el-table-column prop="courseName" label="课程名称"></el-table-column>
                <el-table-column prop="teacherName" label="授课教师" width="90px"></el-table-column>
                <el-table-column prop="info" label="课程评估信息" width="140px"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from '../../../components/Upload.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'Evaluation',
  components: {
    Upload
  },
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isMySituation: false,
      isSelect: true,
      isOne: false,
      isAll: false,
      isSituation: false,
      isResult: false,
      hasChecked: false,
      labelPosition: 'right',
      loading: true,
      teacherName: '',
      info: '',
      formData: {
        term: '',
        name: ''
      },
      rules: {
        term: [
          { required: true, message: '请选择上课日期', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ]
      },
      tableData: [],
      professionData: [],
      reachedData: [],
      notReachedData: []
    }
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
    backCollege () {
      this.$router.push('/collegeLeader')
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isActive = false
      this.isMySituation = false
    },
    back () {
      this.isSelect = true
      this.isOne = false
      this.isAll = false
      this.hasChecked = false
      this.formData.name = ''
      this.formData.term = ''
      this.tableData = []
    },
    toResult () {
      this.isResult = true
      this.isSituation = false
      let _this = this
      let reachedData = JSON.parse(localStorage.getItem('courseReached'))
      let notReachedData = JSON.parse(localStorage.getItem('courseNotReached'))
      _this.reachedData = reachedData
      _this.notReachedData = notReachedData
    },
    toMySituation () {
      this.isMySituation = true
      this.isSituation = true
      this.isResult = false
      this.isActive = false
      this.isMyInfo = false
      this.professionData = []
      this.getInfo()
    },
    getInfo () {
      let _this = this
      this.$http.get('../../../../static/mock/course.json').then((res) => {
        res = res.data
        if (res.data) {
          const data = res.data
          data.CourseList.map(item => {
            console.log(item)
            let data = {
              term: item.courseTerm,
              courseName: item.courseName,
              teacherName: item.teacherName,
              major: item.major,
              info: item.info
            }
            _this.professionData.push(data)
          })
          this.loading = false
        }
      })
      this.initCourse()
    },
    initCourse () {
      let courseReached = []
      let courseNotReached = []
      localStorage.setItem('courseReached', JSON.stringify(courseReached))
      localStorage.setItem('courseNotReached', JSON.stringify(courseNotReached))
    },
    handleEdit (row) {
      let data = JSON.parse(localStorage.getItem('courseReached'))
      data.push(row)
      localStorage.setItem('courseReached', JSON.stringify(data))
      console.log(JSON.parse(localStorage.getItem('courseReached')))
    },
    handleDelete (row) {
      let data = JSON.parse(localStorage.getItem('courseNotReached'))
      data.push(row)
      localStorage.setItem('courseNotReached', JSON.stringify(data))
      console.log(JSON.parse(localStorage.getItem('courseNotReached')))
    },
    checkCourseName () {
      let _this = this
      this.$http.get('../../../../static/mock/course.json').then((res) => {
        res = res.data
        if (res.data) {
          const data = res.data
          data.CourseList.map(item => {
            if (this.formData.name === item.courseName) {
              _this.formData.name = item.courseName
              _this.teacherName = item.teacherName
              _this.info = item.info
              this.hasChecked = true
              this.isOne = true
              this.isSelect = false
            }
          })
          if (!this.hasChecked) {
            this.$message.error('您输入的课程暂未查询到，请重新输入')
          }
        }
      })
    },
    query () {
      if (this.formData.term === '' || this.formData.name === '') {
        this.$message.error('暂无您查询的信息，请重试')
        return 0
      }
      this.checkCourseName()
    },
    queryAll () {
      this.isAll = true
      this.isSelect = false
      let _this = this
      this.$http.get('../../../../static/mock/course.json').then((res) => {
        res = res.data
        if (res.data) {
          const data = res.data
          data.CourseList.forEach(function (item) {
            let data = {
              term: item.courseTerm,
              courseName: item.courseName,
              teacherName: item.teacherName,
              info: item.info
            }
            _this.tableData.push(data)
          })
          this.loading = false
        }
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
        width : 100%
        height : 500px
        .allInfo
          position : absolute
          left : 5%
          top : 10%
          width : 1000px
          .basicHead
            width : 100%
            height : 30px
            line-height : 30px
            background-color : #D1DBE5
            .info
              width : 100%
              position : absolute
              height : 30px
              margin : 0
              display : inline
              text-align : center
              font-family : '宋体'
              font-size : 16px
          .backLastest
            width : 15%
            height : 30px
            cursor : pointer
            border-radius : 10px
            .backImg
              width : 25px
              height : 25px
              margin-left : 5px
            .backFonts
              font-family : '宋体'
              font-size : 17px
              display : inline
              float : right
              margin : 3px 15px 0px 0px
          .el-table
            .warning-row
              background: oldlace
            .success-row
              background: #f0f9eb
        .basicInfo
          width : 270px
          height : 500px
          position : absolute
          left : 35%
          top : 10%
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
