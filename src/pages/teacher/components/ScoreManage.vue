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
        <button class='investigation' @click='toUpExam()'><p class='invesFonts'>上传试卷</p></button>
        <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>导出试卷</p></button>
      </div>
    </div>
    <div class='Right'>
      <div v-show='isUpExam' class="MyInfo">
        <div v-show='isExamInfo'>
          <div class="rightForm">
            <div class='half'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='formData' size='mini'>
                <el-form-item label='年级' prop='term'>
                  <el-select v-model='formData.term' placeholder='请选择考试年级'>
                    <el-option label='2018 级' value='2018 级'></el-option>
                    <el-option label='2019 级' value='2019 级'></el-option>
                    <el-option label='2020 级' value='2020 级'></el-option>
                    <el-option label='2021 级' value='2021 级'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='课程名称' prop='courseName'>
                  <el-input v-model='formData.courseName' placeholder='请输入考试课程的名称'></el-input>
                </el-form-item>
                <el-form-item label='题目数量' prop='number'>
                  <el-input v-model='formData.number' placeholder='请输入试卷的大题总数(>=1)'></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class='anotherHalf'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='formData' size='mini'>
                <el-form-item label='课程编号' prop='courseId'>
                  <el-input v-model='formData.courseId' placeholder='请输入课程编号'></el-input>
                </el-form-item>
                <el-form-item label='课程目标数量' prop='totalAim'>
                  <el-input v-model='formData.totalAim' placeholder='请输入课程目标的数量(>=1)'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size='mini' @click='getExamInfo()' style="width: 180px;">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-show='isDetails'>
          <div class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class="rightForm">
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='formData' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :label="item.examName"
                    :value="item.examTotal"
                  >
                    <el-input placeholder='请输入该大题的分数' v-model="item.examTotal"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='center'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='formData' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :value="item.examNum"
                  >
                    <el-input placeholder='请输入该大题有几个小题' v-model="item.examNum"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='formData' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :value="item.examScore"
                  >
                    <el-input placeholder='请输入该大题每小题的分数' v-model="item.examScore"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='getQuestionInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="rightFormLower">
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in aims"
                    :key="item.value"
                    :label="item.aimName"
                    :value="item.totalAim"
                  >
                    <el-input placeholder='请输入该课程目标的总分' v-model="item.totalAim"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='center'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in aims"
                    :key="item.value"
                    :value="item.aimNum"
                  >
                    <el-input placeholder='请输入该目标有几个小题' v-model="item.aimNum"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in aims"
                    :key="item.value"
                    :value="item.aimPosition"
                  >
                    <el-input placeholder='请输入该目标分布在哪' v-model="item.aimPosition"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='getAimInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class='rightIntroduce'>
              <p>****注意事项****</p>
              <p>1. 请将每个大题下的每小题的分数按题号顺序以 '/' 分隔填入~(例如,第一个大题共4个小题共20分：3/5/5/7)</p>
              <p>2. 请将每个目标分布的位置按题号如第一大题第一小题'1-1'格式输入并将每个位置以 '/' 分隔填入~</p>
            </div>
          </div>
        </div>
      </div>
      <div v-show='isMyInfo' class='upload'>
        <Upload></Upload>
      </div>
      <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Upload from '../../../components/Upload.vue'
export default {
  name: 'ScoreManage',
  components: {
    Upload
  },
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isUpExam: false,
      isExamInfo: false,
      isDetails: false,
      labelPosition: 'right',
      formData: {
        term: '',
        courseName: '',
        number: '',
        courseId: '',
        totalAim: ''
      },
      rules: {
        term: [
          { required: true, message: '请选择上课日期', trigger: 'blur' }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入课程编码', trigger: 'blur' }
        ],
        courseId: [
          { required: true, message: '请输入课程学分', trigger: 'blur' }
        ],
        totalAim: [
          { required: true, message: '请输入课程目标的总数', trigger: 'blur' }
        ]
      },
      list: [{examName: '第1大题', examTotal: '', examNum: '', examScore: ''}],
      aims: [{aimName: '目标1', totalAim: '', aimNum: '', aimPosition: ''}]
    }
  },
  methods: {
    ...mapMutations(['delLogin']),
    backLogin () {
      this.$router.push('/login')
      this.delLogin()
      localStorage.removeItem('username')
    },
    backHome () {
      this.$router.push('/')
    },
    backStu () {
      this.$router.push('/teacher')
    },
    back () {
      this.isExamInfo = true
      this.isDetails = false
      this.clear()
    },
    toUpExam () {
      this.isUpExam = true
      this.isExamInfo = true
      this.isDetails = false
      this.isMyInfo = false
      this.isActive = false
      this.clear()
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isUpExam = false
      this.isActive = false
      this.clear()
    },
    clear () {
      this.list = []
      this.aims = []
      let _this = this
      Object.getOwnPropertyNames(this.formData).forEach((item) => {
        _this.formData[item] = ''
      })
    },
    getExamInfo () {
      if (this.formData.totalAim < 1 || this.formData.number < 1) {
        this.$message.error('题目数量和课程目标数量都不能少于1个，请您重新输入')
        this.clear()
        return 0
      } else {
        this.isDetails = true
        this.isExamInfo = false
        console.log(this.formData)
        if (this.list.length !== 0) {
          for (let i = 2; i < (parseInt(this.formData.number) + 1); i++) {
            this.list.push({examName: '第' + i + '大题', examTotal: '', examNum: '', examScore: ''})
          }
        } else {
          for (let i = 1; i <= (parseInt(this.formData.number)); i++) {
            this.list.push({examName: '第' + i + '大题', examTotal: '', examNum: '', examScore: ''})
          }
        }
        if (this.aims.length !== 0) {
          for (let i = 2; i < (parseInt(this.formData.totalAim) + 1); i++) {
            this.aims.push({aimName: '目标' + i, totalAim: '', aimNum: '', aimPosition: ''})
          }
        } else {
          for (let i = 1; i <= (parseInt(this.formData.totalAim)); i++) {
            this.aims.push({aimName: '目标' + i, totalAim: '', aimNum: '', aimPosition: ''})
          }
        }
      }
    },
    getQuestionInfo () {
      console.log(this.formData)
      // 每一小题的分数
      var result = []
      for (let i = 0; i < this.list.length; i++) {
        var s = []
        s = this.list[i].examScore.split('/')
        console.log(s)
        result.push(s)
      }
      console.log(result)
      console.log(this.list)
      this.$message.success('提交成功')
    },
    getAimInfo () {
      console.log(this.formData)
      // 每一目标的分布
      var result = []
      for (let i = 0; i < this.aims.length; i++) {
        var s = []
        s = this.aims[i].aimPosition.split('/')
        console.log(s)
        result.push(s)
      }
      console.log(result)
      console.log(this.aims)
      this.$message.success('提交成功')
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
      .upload
        text-align : center
        line-height : 500px
      .MyInfo
        position : absolute
        width : 100%
        height : 500px
        .rightIntroduce
          position : absolute
          right : 0
          display : inline
          width : 140px
          color : #DCDDE0
        .rightForm
          position : absolute
          overflow : auto
          top : 10%
          left : 9%
          width : 770px
          height : 300px
          margin : 0
          .half
            position : absolute
            left : 0
          .center
            position : absolute
            left : 24%
          .anotherHalf
            position : absolute
            right : 13%
        .rightFormLower
          position : absolute
          overflow : auto
          top : 330px
          left : 9%
          width : 770px
          height : 300px
          margin : 0
          .half
            position : absolute
            left : 0
          .center
            position : absolute
            left : 24%
          .anotherHalf
            position : absolute
            right : 13%
        .allInfo
          position : absolute
          left : 2%
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
            width : 1000px
            display : inline
            height : 30px
            cursor : pointer
            border-radius : 10px
            .backImg
              position : absolute
              top : 10%
              width : 25px
              height : 25px
              margin-left : 5px
            .backFonts
              position : absolute
              left : 3%
              top : 10%
              font-family : '宋体'
              font-size : 17px
              display : inline
              float : right
              margin : 3px 15px 0px 0px
        .basicInfo
          width : 290px
          height : 500px
          position : absolute
          left : 30%
          top : 10%
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
