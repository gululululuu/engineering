<template>
  <div>
    <div class='Center'>
      <div class='head'>
        <p class='headFonts'>评估中心</p>
        <p class='headMe' @click='backCollege()'>我的</p>
      </div>
      <div class='Left'>
        <div class='back'>
          <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
          <p class='backFonts' @click='backHome()'>返回首页</p>
        </div>
        <div class='inputBox'>
          <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>奖学金评定</p></button>
        </div>
      </div>
      <div class='Right'>
        <div v-if='isMyInfo' class='MyInfo'>
          <div class='basicInfo'>
            <div style="text-align: center; padding-bottom: 5px;"><Upload></Upload></div>
            <div class='basicHead'>
              <p class='info'>奖学金名单</p>
            </div>
          </div>
        </div>
        <p v-else class='rightFonts'>请在左侧选择您要进行的操作~</p>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from '../../../components/Upload.vue'
export default {
  name: 'Evaluation',
  components: {
    Upload
  },
  data () {
    return {
      isMyInfo: false
    }
  },
  methods: {
    backHome () {
      this.$router.push('/')
    },
    backCollege () {
      this.$router.push('/collegeLeader')
    },
    toMyInfo () {
      this.isMyInfo = true
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
