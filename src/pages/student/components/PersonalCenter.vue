<template>
  <div class='Center'>
    <div class='head'>
      <p class='headFonts'>学生专区</p>
      <p class='headMe' @click='backStu()'>我的</p>
    </div>
    <div class='Left'>
      <div class='back'>
        <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
        <p class='backFonts' @click='backHome()'>返回首页</p>
      </div>
      <div class='inputBox'>
        <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>我的资料</p></button>
      </div>
    </div>
    <div class='Right'>
      <div v-if='isMyInfo' class='MyInfo'>
        <div class='basicInfo'>
          <div class='basicHead'>
            <p class='info'>基本信息</p>
          </div>
          <div class='content'>
            <el-descriptions direction="vertical" :column="4" border>
              <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{ info.phone }}</el-descriptions-item>
              <el-descriptions-item label="居住地" :span="2">{{ info.addr }}</el-descriptions-item>
              <el-descriptions-item label="备注">
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="联系地址">{{ info.contactAddr }} 1188 号</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div class='otherInfo'>
          <p class='info'>其他信息</p>
          <div id="myChart" class='otherBox'></div>
        </div>
      </div>
      <p v-else class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
// import TreeSelect from './TreeSelect.vue'
// import { GridComponent } from 'echarts/components'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// echarts.use([GridComponent])
export default {
  name: 'PersonalCenter',
  data () {
    return {
      isMyInfo: false,
      info: {
        name: '',
        phone: '',
        addr: '',
        contactAddr: ''
      },
      MyInfo: {
        name: '12',
        sId: '12'
      },
      option: {
        series: [{
          type: 'pie',
          data: [{
            value: 335,
            name: '德育'
          }, {
            value: 234,
            name: '体育'
          }, {
            value: 1548,
            name: '智育'
          }]
        }]
      }
    }
  },
  methods: {
    getUserInfo () {
      var _this = this
      this.$http.get('../../static/mock/student.json').then((res) => {
        res = res.data
        if (res.data) {
          const data = res.data
          data.StudentList.forEach(function (item, index) {
            if (item.username === localStorage.username) {
              _this.info = item
            }
          })
          console.log(this.info)
        }
      })
    },
    backHome () {
      this.$router.push('/')
    },
    backStu () {
      this.$router.push('/student')
    },
    toMyInfo () {
      this.isMyInfo = true
      this.getUserInfo()
      setTimeout(() => {
        this.drawEchartData()
      }, 300)
    },
    drawEchartData () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .Center
    width : 100%
    height : 580px
    // border : 1px solid red
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
          width : 40%
          height : 500px
          position : absolute
          .basicHead
            width : 100%
            height : 30px
          .content
            text-align : center
            .contentInfo
              list-style : none
              label
                float : left
        .otherInfo
          width : 60%
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
