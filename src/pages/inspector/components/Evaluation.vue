<template>
  <div>
    <div class='Center'>
      <div class='head'>
        <p class='headFonts'>评估中心</p>
        <p class="headOut" @click="backLogin()">注销</p>
        <p class='headMe' @click='backInspector()'>我的</p>
      </div>
      <div class='Left'>
        <div class='back'>
          <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
          <p class='backFonts' @click='backHome()'>返回首页</p>
        </div>
        <div class='inputBox'>
          <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>查看达成信息</p></button>
        </div>
      </div>
      <div class='Right'>
        <div v-show='isMyInfo' class='MyInfo'>
          <div v-show='isSelect' class="basicInfo">
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
              <el-form-item label='教学学期' prop='term'>
                <el-select v-model='formData.term' placeholder='请选择教学学期'>
                  <el-option label='大学一年级 第 一 学期' value='大学一年级 第 一 学期'></el-option>
                  <el-option label='大学一年级 第 二 学期' value='大学一年级 第 二 学期'></el-option>
                  <el-option label='大学二年级 第 一 学期' value='大学二年级 第 一 学期'></el-option>
                  <el-option label='大学二年级 第 二 学期' value='大学二年级 第 二 学期'></el-option>
                  <el-option label='大学三年级 第 一 学期' value='大学三年级 第 一 学期'></el-option>
                  <el-option label='大学三年级 第 二 学期' value='大学三年级 第 二 学期'></el-option>
                  <el-option label='大学四年级 第 一 学期' value='大学四年级 第 一 学期'></el-option>
                  <el-option label='大学四年级 第 二 学期' value='大学四年级 第 二 学期'></el-option>
                </el-select>
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
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="courseName" label="课程名称" align="center"></el-table-column>
              <el-table-column prop="courseCredit" label="学分" align="center"></el-table-column>
              <el-table-column prop="courseHour" label="学时" align="center"></el-table-column>
              <el-table-column prop="form" label="成绩组成"  align="center">
                <el-table-column prop="quantity" label="定量"  align="center">
                  <el-table-column prop="midTerm" label="期中试卷" align="center"></el-table-column>
                  <el-table-column prop="finalExam" label="期末试卷" align="center"></el-table-column>
                  <el-table-column prop="work" label="作业" align="center"></el-table-column>
                  <el-table-column prop="experiment" label="实验" align="center"></el-table-column>
                  <el-table-column prop="test" label="随堂检验" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="quality" label="定性"  align="center">
                  <el-table-column prop="teaEvaluate" label="教师评价" align="center"></el-table-column>
                  <el-table-column prop="stuEvaluate" label="学生自我评价" align="center"></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="info" label="课程评估情况" align="center">
                <template slot-scope="scope">
                  <el-button @click="getCourseInfo(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
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
              <el-table-column prop="courseName" label="课程名称" align="center"></el-table-column>
              <el-table-column prop="courseCredit" label="学分" align="center"></el-table-column>
              <el-table-column prop="courseHour" label="学时" align="center"></el-table-column>
              <el-table-column prop="form" label="成绩组成"  align="center">
                <el-table-column prop="quantity" label="定量"  align="center">
                  <el-table-column prop="midTerm" label="期中试卷" align="center"></el-table-column>
                  <el-table-column prop="finalExam" label="期末试卷" align="center"></el-table-column>
                  <el-table-column prop="work" label="作业" align="center"></el-table-column>
                  <el-table-column prop="experiment" label="实验" align="center"></el-table-column>
                  <el-table-column prop="test" label="随堂检验" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="quality" label="定性"  align="center">
                  <el-table-column prop="teaEvaluate" label="教师评价" align="center"></el-table-column>
                  <el-table-column prop="stuEvaluate" label="学生自我评价" align="center"></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="info" label="课程评估情况" align="center">
                <template slot-scope="scope">
                  <el-button @click="getCourseInfo(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-show='isMySituation' class='MyInfo'>
          <div class='allInfo'>
            <div v-show="isSituation">
              <div class='basicHead'>
                <p class='info'>请对本专业的课程评估情况进行审核</p>
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
                <el-table-column prop="courseId" label="课程编号" sortable></el-table-column>
                <el-table-column prop="credit" label="学分" sortable></el-table-column>
                <el-table-column prop="hour" label="学时" sortable></el-table-column>
                <el-table-column prop="courseName" label="课程名称"></el-table-column>
                <el-table-column label="审核总结">
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
                <el-table-column prop="courseId" label="课程编号" sortable></el-table-column>
                <el-table-column prop="credit" label="学分" sortable></el-table-column>
                <el-table-column prop="hour" label="学时" sortable></el-table-column>
                <el-table-column prop="courseName" label="课程名称"></el-table-column>
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
                <el-table-column prop="courseId" label="课程编号" sortable></el-table-column>
                <el-table-column prop="credit" label="学分" sortable></el-table-column>
                <el-table-column prop="hour" label="学时" sortable></el-table-column>
                <el-table-column prop="courseName" label="课程名称"></el-table-column>
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
import { mapMutations } from 'vuex'
import { dataConversionUtil } from '../../../assets/js/exportToExcel.js'
export default {
  name: 'Evaluation',
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isMySituation: false,
      isSelect: true,
      isOne: false,
      isAll: false,
      isResult: false,
      isSituation: false,
      labelPosition: 'right',
      loading: true,
      formData: {
        term: ''
      },
      rules: {
        term: [
          { required: true, message: '请选择上课日期', trigger: 'blur' }
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
    backInspector () {
      this.$router.push('/inspector')
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isActive = false
      this.isMySituation = false
      this.isExport = false
    },
    toExport () {
      this.isExport = true
      this.isMyInfo = false
      this.isActive = false
      this.isMySituation = false
    },
    back () {
      this.isSelect = true
      this.isOne = false
      this.isAll = false
      this.formData.name = ''
      this.formData.term = ''
      this.tableData = []
    },
    getCourseInfo (row) {
      console.log(row)
      let report = JSON.parse(localStorage.getItem('report'))
      console.log(report)
      report.forEach(item => {
        if (item.courseName === row.courseName) {
          dataConversionUtil.exportToExcel('课程目标达成情况报告', item.tableHeader)
          this.$message.success('导出成功，请在浏览器下载处查看')
        }
      })
    },
    getTermInfo () {
      this.isOne = true
      this.isSelect = false
      let _this = this
      _this.tableData = []
      this.$axios({
        method: 'get', url: '/courses'
      }).then(res => {
        const datas = res.data.courses
        datas.forEach(item => {
          if (this.formData.term === item.term) {
            let data = {
              courseName: item.courseName,
              courseCredit: item.courseCredit,
              courseHour: item.courseHour,
              midTerm: item.midTerm,
              finalExam: item.finalExam,
              work: item.work,
              experiment: item.experiment,
              test: item.test,
              teaEvaluate: item.teaEvaluate,
              stuEvaluate: item.stuEvaluate
            }
            _this.tableData.push(data)
          }
        })
        this.loading = false
      })
    },
    query () {
      if (this.formData.term === '') {
        this.$message.error('请输入查询条件，请重试')
        return 0
      }
      this.getTermInfo()
    },
    queryAll () {
      this.isAll = true
      this.isSelect = false
      let _this = this
      _this.tableData = []
      this.$axios({
        method: 'get', url: '/courses'
      }).then(res => {
        const datas = res.data.courses
        datas.forEach(item => {
          let data = {
            courseName: item.courseName,
            courseCredit: item.courseCredit,
            courseHour: item.courseHour,
            midTerm: item.midTerm,
            finalExam: item.finalExam,
            work: item.work,
            experiment: item.experiment,
            test: item.test,
            teaEvaluate: item.teaEvaluate,
            stuEvaluate: item.stuEvaluate
          }
          _this.tableData.push(data)
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
