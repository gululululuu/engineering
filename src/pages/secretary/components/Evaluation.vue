<template>
  <div>
    <div class='Center'>
      <div class='head'>
        <p class='headFonts'>评估中心</p>
        <p class="headOut" @click="backLogin()">注销</p>
        <p class='headMe' @click='backSecretary()'>我的</p>
      </div>
      <div class='Left'>
        <div class='back'>
          <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
          <p class='backFonts' @click='backHome()'>返回首页</p>
        </div>
        <div class='inputBox'>
          <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>查看评估信息</p></button>
          <button class='investigation' @click='toExport()'><p class='invesFonts'>打印评估报告</p></button>
        </div>
      </div>
      <div class='Right'>
        <div v-show='isMyInfo' class='MyInfo'>
          <div v-show='isSelect' class="basicInfo">
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
              <el-descriptions-item label="专业">{{ major }}</el-descriptions-item>
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
              <el-table-column prop="major" label="专业" width="180"></el-table-column>
              <el-table-column prop="courseName" label="课程名称" width="180"></el-table-column>
              <el-table-column prop="teacherName" label="授课教师" width="180"></el-table-column>
              <el-table-column prop="info" label="课程评估信息"></el-table-column>
            </el-table>
          </div>
        </div>
        <div v-show="isExport">
          <div class='rightForm'>
            <div v-if="isDone">
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
                  <el-form-item label='课程名称' prop='name'>
                    <el-input v-model='formData.name' placeholder='请输入课程名称'></el-input>
                  </el-form-item>
                  <el-form-item label='课程编码' prop='id'>
                    <el-input v-model='formData.id' placeholder='请输入课程编码'></el-input>
                  </el-form-item>
                  <el-form-item label='任课教师' prop='teacherName'>
                    <el-input v-model='formData.teacherName' placeholder='请输入课程学分'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="anotherHalf">
                <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
                  <el-form-item label='学分' prop='credit'>
                    <el-input v-model='formData.credit' placeholder='请输入课程学分'></el-input>
                  </el-form-item>
                  <el-form-item label='学生班级' prop='class'>
                    <el-input v-model='formData.class' placeholder='请输入学生班级'></el-input>
                  </el-form-item>
                  <el-form-item label='学时' prop='period'>
                    <el-input v-model='formData.period' placeholder='请输入课程学时'></el-input>
                  </el-form-item>
                  <el-form-item label-position='right' label-width='80px'>
                    <el-button size='mini' @click='submit()'>提交</el-button>
                    <ExportExcel v-bind:formData='formData' style="margin-left: 46px;"></ExportExcel>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div v-else class="tip">
              <el-steps :active="active" finish-status="success" process-status="wait" space="400px">
                <el-step title="步骤 1" description="请确认老师是否完成成绩上传"></el-step>
                <el-step title="步骤 2" description="请确认老师是否完成课程目标达成情况的分析"></el-step>
                <el-step title="步骤 3" description="请确认老师是否上传课程目标达成情况的持续改进措施"></el-step>
              </el-steps>
              <el-button size='mini' @click="next()" style="margin-top: 22px;">下一步</el-button>
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
import ExportExcel from '../../teacher/components/ExportExcel.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'Evaluation',
  components: {
    Upload,
    ExportExcel
  },
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isSelect: true,
      isOne: false,
      isAll: false,
      isExport: false,
      isDone: false,
      hasChecked: false,
      labelPosition: 'right',
      loading: true,
      active: 0,
      teacherName: '',
      info: '',
      major: '',
      formData: {
        term: '',
        name: '',
        id: '',
        credit: '',
        class: '',
        teacherName: '',
        period: ''
      },
      rules: {
        term: [
          { required: true, message: '请选择上课日期', trigger: 'blur' }
        ],
        name: [
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
        teacherName: [
          { required: true, message: '请输入上课老师姓名', trigger: 'blur' }
        ],
        period: [
          { required: true, message: '请输入课程学时', trigger: 'blur' }
        ]
      },
      tableData: [],
      professionData: []
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
    backSecretary () {
      this.$router.push('/secretary')
    },
    next () {
      if (this.active++ > 1) {
        this.isDone = true
      }
    },
    submit () {
      try {
        this.$message.success('上传成功！')
      } catch (e) {
        this.$message.warning('上传错误，请联系管理员！')
      }
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isActive = false
      this.isMySituation = false
      this.isExport = false
      this.formData = {}
    },
    toExport () {
      this.isExport = true
      this.isDone = false
      this.active = 0
      this.isMyInfo = false
      this.isActive = false
      this.isMySituation = false
      this.formData = {}
    },
    back () {
      this.isSelect = true
      this.isOne = false
      this.isAll = false
      this.hasChecked = false
      this.formData = {}
      this.tableData = []
    },
    checkCourseName () {
      let _this = this
      this.$http.get('../../../../static/mock/course.json').then((res) => {
        res = res.data
        if (res.data) {
          const data = res.data
          data.CourseList.map(item => {
            console.log(item)
            if (this.formData.name === item.courseName) {
              _this.formData.name = item.courseName
              _this.teacherName = item.teacherName
              _this.major = item.major
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
              major: item.major,
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
        .basicInfo
          width : 270px
          height : 500px
          position : absolute
          left : 35%
          top : 10%
        .allInfo
          position : absolute
          left : 5%
          top : 10%
          width : 1000px
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
      .rightForm
        position : absolute
        top : 10%
        left : 22%
        width : 550px
        height : 500px
        margin : 0
        .tip
          position : absolute
          width : 800px
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
      .info
        width : 100%
        position : absolute
        height : 30px
        margin : 0
        display : inline
        text-align : center
        font-family : '宋体'
        font-size : 16px
      .otherBox
        width : 80%
        height : 200px
        position : absolute
        top : 30px
</style>
