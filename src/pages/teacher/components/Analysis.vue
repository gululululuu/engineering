<template>
  <div class="analysisLeft">
    <div class='basicHead'>
      <p class='info'>请填写对评估课程达成情况的分析</p>
    </div>
    <div class="half">
      <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='CourseInfo' size='mini'>
        <el-form-item label='教学学期' prop='courseTerm'>
          <el-select v-model='CourseInfo.courseTerm' placeholder='请选择教学学期'>
            <el-option label='2020-2021 年度 第 一 学期' value='2020-2021 年度 第 一 学期'></el-option>
            <el-option label='2020-2021 年度 第 二 学期' value='2020-2021 年度 第 二 学期'></el-option>
            <el-option label='2019-2020 年度 第 一 学期' value='2019-2020 年度 第 一 学期'></el-option>
            <el-option label='2019-2020 年度 第 二 学期' value='2019-2020 年度 第 二 学期'></el-option>
            <el-option label='2018-2019 年度 第 一 学期' value='2018-2019 年度 第 一 学期'></el-option>
            <el-option label='2018-2019 年度 第 二 学期' value='2018-2019 年度 第 二 学期'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='目标一' prop='one'>
          <el-input type="textarea" v-model='CourseInfo.one' placeholder='请输入内容' maxlength="70" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label='目标三' prop='three'>
          <el-input type="textarea" v-model='CourseInfo.three' placeholder='请输入内容' maxlength="70" show-word-limit></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="anotherHalf">
      <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='CourseInfo' size='mini'>
        <el-form-item label='课程名称' prop='courseName'>
          <el-input v-model='CourseInfo.courseName' placeholder='请输入课程名称'></el-input>
        </el-form-item>
        <el-form-item label='目标二' prop='two'>
          <el-input type="textarea" v-model='CourseInfo.two' placeholder='请输入内容' maxlength="70" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label='目标四' prop='four'>
          <el-input type="textarea" v-model='CourseInfo.four' placeholder='请输入内容' maxlength="70" show-word-limit></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class='basicHead' style="margin-top: 200px;">
      <p class='info'>请填写对课程目标持续改进的措施</p>
    </div>
    <div class="half">
      <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='CourseInfo' size='mini'>
        <el-form-item label='目标一' prop='forOne'>
          <el-input type="textarea" v-model='CourseInfo.forOne' placeholder='请输入内容' maxlength="70" show-word-limit style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label='目标三' prop='forThree'>
          <el-input type="textarea" v-model='CourseInfo.forThree' placeholder='请输入内容' maxlength="70" show-word-limit></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="anotherHalf">
      <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='CourseInfo' size='mini'>
        <el-form-item label='目标二' prop='forTwo'>
          <el-input type="textarea" v-model='CourseInfo.forTwo' placeholder='请输入内容' maxlength="70" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label='目标四' prop='forFour'>
          <el-input type="textarea" v-model='CourseInfo.forFour' placeholder='请输入内容' maxlength="70" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label-position='right' label-width='199px'>
          <el-button size='mini' @click='submit()'>提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCourse',
  data () {
    return {
      labelPosition: 'right',
      rules: {
        courseTerm: [
          { required: true, message: '请选择上课日期', trigger: 'blur' }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        one: [
          { required: true, message: '请输入对目标一的达成情况分析', trigger: 'blur' }
        ],
        two: [
          { required: true, message: '请输入对目标二的达成情况分析', trigger: 'blur' }
        ],
        three: [
          { required: true, message: '请输入对目标三的达成情况分析', trigger: 'blur' }
        ],
        four: [
          { required: true, message: '请输入对目标四的达成情况分析', trigger: 'blur' }
        ],
        forOne: [
          { required: true, message: '请输入针对目标一的持续改进措施', trigger: 'blur' }
        ],
        forTwo: [
          { required: true, message: '请输入针对目标二的持续改进措施', trigger: 'blur' }
        ],
        forThree: [
          { required: true, message: '请输入针对目标三的持续改进措施', trigger: 'blur' }
        ],
        forFour: [
          { required: true, message: '请输入针对目标四的持续改进措施', trigger: 'blur' }
        ]
      },
      CourseInfo: {
        courseTerm: '',
        courseName: '',
        one: '',
        two: '',
        three: '',
        four: '',
        forOne: '',
        forTwo: '',
        forThree: '',
        forFour: ''
      }
    }
  },
  created () {
    this.initCourseAnalysis()
  },
  methods: {
    initCourseAnalysis () {
      let analysis = []
      localStorage.setItem('courseAnalysis', JSON.stringify(analysis))
    },
    submit () {
      try {
        let data = {
          courseTerm: this.CourseInfo.courseTerm,
          courseName: this.CourseInfo.courseName,
          one: this.CourseInfo.one,
          two: this.CourseInfo.two,
          three: this.CourseInfo.three,
          four: this.CourseInfo.four,
          forOne: this.CourseInfo.forOne,
          forTwo: this.CourseInfo.forTwo,
          forThree: this.CourseInfo.forThree,
          forFour: this.CourseInfo.forFour
        }
        let analysis = JSON.parse(localStorage.getItem('courseAnalysis'))
        analysis.push(data)
        localStorage.setItem('courseAnalysis', JSON.stringify(analysis))
        console.log(JSON.parse(localStorage.getItem('courseAnalysis')))
        this.$message.success('提交成功')
        this.clear()
      } catch (e) {
        this.$message.error('提交失败，请联系管理员校验')
      }
    },
    clear () {
      this.CourseInfo.courseTerm = ''
      this.CourseInfo.courseName = ''
      this.CourseInfo.one = ''
      this.CourseInfo.two = ''
      this.CourseInfo.three = ''
      this.CourseInfo.four = ''
      this.CourseInfo.forOne = ''
      this.CourseInfo.forTwo = ''
      this.CourseInfo.forThree = ''
      this.CourseInfo.forFour = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .analysisLeft
    position : absolute
    left : 22%
    top : 10%
    width : 550px
    height : 300px
    .half
      position : absolute
      left : 0
    .anotherHalf
      position : absolute
      right : 0
    .basicHead
      width : 100%
      height : 30px
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
