<template>
  <div class='Center'>
    <div class='head'>
      <p class='headFonts'>个人中心</p>
      <p class='headMe' @click='backCollege()'>我的</p>
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
            <el-descriptions class="margin-top" :column="3" border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                  </template>
                  {{ info.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    手机号
                  </template>
                  {{info.phone}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    居住地
                  </template>
                  {{info.addr}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    备注
                  </template>
                  <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building"></i>
                    联系地址
                  </template>
                  {{info.contactAddr}}
                </el-descriptions-item>
              </el-descriptions>
          </div>
        </div>
      </div>
      <p v-else class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollegePersonalCenter',
  data () {
    return {
      isMyInfo: false,
      info: {
        name: '',
        id: '',
        phone: '',
        addr: '',
        contactAddr: ''
      }
    }
  },
  methods: {
    getUserInfo () {
      var _this = this
      this.$http.get('../../../../static/mock/collegeLeader.json').then((res) => {
        res = res.data
        if (res.data) {
          const data = res.data
          data.LeaderList.forEach(function (item, index) {
            if (item.username === localStorage.username) {
              _this.info = item
            }
          })
        }
      })
    },
    backHome () {
      this.$router.push('/')
    },
    backCollege () {
      this.$router.push('/collegeLeader')
    },
    toMyInfo () {
      this.isMyInfo = true
      this.getUserInfo()
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
          width : 100%
          height : 500px
          position : absolute
          .basicHead
            width : 100%
            height : 30px
            line-height : 30px
            background-color : #D1DBE5
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
