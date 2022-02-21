<template>
  <div class='Center'>
    <div class='head'>
      <p class='headFonts'>学生专区</p>
      <p class="headOut" @click="backLogin()">注销</p>
      <p class='headMe' @click='backSecretary()'>我的</p>
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
            <el-descriptions direction="vertical" class="margin-top" :column="3" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  用户名
                </template>
                {{ info.name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-postcard"></i>
                  工号
                </template>
                {{ info.id }}
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
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-document"></i>
                  个人简介
                </template>
                {{info.introduction}}
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
import { mapMutations } from 'vuex'
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
      }
    }
  },
  methods: {
    ...mapMutations(['delLogin']),
    getUserInfo () {
      var _this = this
      this.$http.get('../../../../static/mock/secretary.json').then((res) => {
        res = res.data
        if (res.data) {
          const data = res.data
          data.SecretaryList.forEach(function (item, index) {
            if (item.username === localStorage.username) {
              _this.info = item
            }
          })
          console.log(this.info)
        }
      })
    },
    backLogin () {
      this.$router.push('/login')
      this.delLogin()
      localStorage.removeItem('username')
      localStorage.removeItem('success')
    },
    backHome () {
      this.$router.push('/')
    },
    backSecretary () {
      this.$router.push('/secretary')
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
          width : 40%
          height : 500px
          position : absolute
          .basicHead
            width : 100%
            height : 30px
          .content
            text-align : center
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
</style>
