<template>
  <div class='Center'>
    <div class='head'>
      <p class='headFonts'>课程专区</p>
      <p class='headMe' @click='backStu()'>我的</p>
    </div>
    <div class='Left'>
      <div class='back'>
        <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
        <p class='backFonts' @click='backHome()'>返回首页</p>
      </div>
      <div class='inputBox'>
        <button class='leftButton' @click='toMyInfo()'><p class='buttonFonts'>课程评估</p></button>
        <button class='leftButton' @click='toAdd()'><p class='buttonFonts'>添加课程</p></button>
      </div>
    </div>
    <div class='Right'>
      <div v-show='isMyInfo'>
        <div class="rightUpload">
          <div v-if="isUpload" @click='toUpload()' class="upload">
            <Upload></Upload>
          </div>
          <div v-else>
            <ScatterDiagram></ScatterDiagram>
          </div>
        </div>
      </div>
      <div v-show="isToAdd">
        <div class="rightUpload">
          <AddCourse></AddCourse>
        </div>
      </div>
      <p v-show="isActive" class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
import Upload from '../../../components/Upload.vue'
import ScatterDiagram from '../../../components/ScatterDiagram.vue'
import AddCourse from './AddCourse.vue'
export default {
  name: 'Curriculum',
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isToAdd: false,
      isUpload: true
    }
  },
  components: {
    Upload,
    ScatterDiagram,
    AddCourse
  },
  methods: {
    backStu () {
      this.$router.push('/student')
    },
    backHome () {
      this.$router.push('/')
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isActive = false
      this.isToAdd = false
    },
    toAdd () {
      this.isToAdd = true
      this.isActive = false
      this.isMyInfo = false
    },
    toUpload () {
      this.isUpload = false
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
        .leftButton
          width : 100%
          cursor : pointer
          border-radius : 5px
          background-color : skyblue
          border : 1px solid #CCCCCC
          margin-top : 5%
          .buttonFonts
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
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
