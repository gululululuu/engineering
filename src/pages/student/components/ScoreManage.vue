<template>
  <div class='Center'>
    <div class='head'>
      <p class='headFonts'>成绩专区</p>
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
      <div v-if='isMyInfo' class='MyInfo'>
        <table>
          <tr>
            <td style='width: 80px;'><p class='info'>开课时间：</p></td>
            <td><CustomTreeSelect></CustomTreeSelect></td>
          </tr>
          <tr>
            <td style='width: 80px;'><p class='info'>课程名称：</p></td>
            <td>
              <el-input placeholder='请选择...' type='text' v-model='searchVal'/>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <ul v-show="hasItem" class="result">
                <li
                v-for="(item, index) of newItems"
                :key="index"
                :value='item.value'
                v-text='item.name'
                style="list-style: none;"
                >
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-button class="queryBtn" @click="NewItems()"><p class="info">查询</p></el-button>
            </td>
          </tr>
        </table>
      </div>
      <p v-else class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
import CustomTreeSelect from '../../../components/TreeSelect.vue'
export default {
  name: 'ScoreManage',
  components: {
    CustomTreeSelect
  },
  data () {
    return {
      isMyInfo: false,
      hasItem: false,
      searchVal: '',
      newItems: [],
      items: [{
        name: '上海',
        value: 'sh'
      }, {
        name: '北京',
        value: 'bj'
      }, {
        name: '重庆',
        value: 'cq'
      }, {
        name: '嗨嗨嗨',
        value: 'hhh'
      }, {
        name: '海上',
        value: 'hs'
      }, {
        name: '京都',
        value: 'jd'
      }]
    }
  },
  methods: {
    backHome () {
      this.$router.push('/')
    },
    backStu () {
      this.$router.push('/student')
    },
    toMyInfo () {
      this.isMyInfo = true
    },
    NewItems () {
      var _this = this
      var NewItems = []
      this.items.map((item) => {
        if (item.name.search(_this.searchVal) !== -1) {
          NewItems.push(item)
        }
      })
      this.newItems = NewItems
      console.log(this.newItems)
      console.log(this.newItems[0].name)
      this.hasItem = true
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
      // border-radius : 10px
      float : left
      margin-right : 20px
      .back
        width : 100%
        height : 30px
        cursor : pointer
        // background-color : #CCCCCC
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
        width : 330px
        height : 500px
        .info
          width : 80px
          line-height : 18px
          text-align : center
          margin : 0
          font-family : '宋体'
          font-size : 16px
        .result
          height : 50px
        .queryBtn
          margin : 10px 120px
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
