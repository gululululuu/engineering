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
      <div v-show='isMyInfo' class='MyInfo'>
        <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
          <el-form-item label='开课时间' prop='term'>
            <el-select v-model='formData.term' placeholder='请选择开课时间'>
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
            <el-button size='mini' @click='getFormDataName()'>查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="hasItem" class="result">
        <el-descriptions direction="vertical" :column="4" border>
          <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
          <el-descriptions-item label="学号">{{ info.id }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ info.sex }}</el-descriptions-item>
          <el-descriptions-item label="总分">{{ info.score.total }}</el-descriptions-item>
          <el-descriptions-item label="查询学科">{{ info.score.name }}</el-descriptions-item>
          <el-descriptions-item label="上课时间">{{ formData.term }}</el-descriptions-item>
          <el-descriptions-item label="备注" :span='2'>
            <el-tag size="small">学校</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="随堂测验">{{ info.score.inClass }}</el-descriptions-item>
          <el-descriptions-item label="作业">{{ info.score.home }}</el-descriptions-item>
          <el-descriptions-item label="实验">{{ info.score.test }}</el-descriptions-item>
          <el-descriptions-item label="试卷">{{ info.score.exam }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CustomTreeSelect from '../../../components/TreeSelect.vue'
export default {
  name: 'ScoreManage',
  components: {
    CustomTreeSelect
  },
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      hasItem: false,
      info: {
        name: '',
        id: '',
        sex: '',
        score: {
          name: '',
          total: '',
          inClass: '',
          home: '',
          test: '',
          exam: ''
        }
      },
      labelPosition: 'right',
      rules: {
        term: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ]
      },
      formData: {
        term: '',
        name: ''
      },
      items: [{
        name: '计算机网络',
        value: '计算机网络'
      }, {
        name: '计算机组成原理',
        value: '计算机组成原理'
      }, {
        name: '操作系统',
        value: '操作系统'
      }, {
        name: '编译原理',
        value: '编译原理'
      }, {
        name: '计算机系统结构',
        value: '计算机系统结构'
      }, {
        name: '数据结构',
        value: '数据结构'
      }]
    }
  },
  // 按下回车登录
  created () {
    var _this = this
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13 || key === 100) {
        _this.getFormDataName()
      }
    }
  },
  watch: {
    // 当清空搜索框时，隐藏显示信息
    'formData.name' () {
      if (this.formData.name === '') {
        this.hasItem = false
        this.isMyInfo = true
        this.isActive = false
      }
    }
  },
  methods: {
    ...mapMutations(['delLogin']),
    backLogin () {
      this.$router.push('/login')
      this.delLogin()
      localStorage.removeItem('username')
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
      this.hasItem = false
    },
    getTotal (item) {
      let score = JSON.parse(localStorage.getItem('score'))
      let index = localStorage.getItem('username') - 61001
      item.score.inClass = score[index][0].value
      item.score.home = score[index][1].value
      item.score.test = score[index][2].value
      item.score.exam = score[index][3].value
      item.score.total = (item.score.inClass * 0.1 + item.score.home * 0.2 + item.score.test * 0.1 + item.score.exam * 0.6).toFixed(0)
      return item
    },
    getFormDataName () {
      var _this = this
      let flag = 0
      _this.items.map((item) => {
        if (item.name.search(_this.formData.name) !== -1) {
          _this.$http.get('../../static/mock/score.json').then((res) => {
            res = res.data
            if (res.data) {
              const data = res.data
              data.StudentList.forEach(function (item1, index) {
                if (item1.username === localStorage.username) {
                  item1.score.name = item.name
                  item1 = _this.getTotal(item1)
                  _this.info = item1
                }
              })
            }
          })
          _this.hasItem = true
          _this.isMyInfo = false
          _this.isActive = false
          flag = 1
        }
      })
      if (flag !== 1) {
        _this.$message.warning('不存在您所查询的内容，请重新输入！')
        _this.formData.term = ''
        _this.formData.name = ''
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
      .MyInfo
        position : absolute
        top : 10%
        left : 35%
        width : 270px
        height : 500px
        .queryBtn
          margin : 10px 120px
      .result
        position : absolute
        top : 5%
        left : 100px
        width : 80%
        .demo-table-expand
            font-size: 0
          label
            width: 90px
            color: #99a9bf
          .el-form-item
            margin-right: 0
            margin-bottom: 0
            width: 50%
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
