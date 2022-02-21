<template>
  <div class="addCourse">
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
        <el-form-item label='课程名称' prop='courseName'>
          <el-input v-model='CourseInfo.courseName' placeholder='请输入课程名称'></el-input>
        </el-form-item>
        <el-form-item label='课程编码' prop='courseId'>
          <el-input v-model='CourseInfo.courseId' placeholder='请输入课程编码'></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="anotherHalf">
      <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='CourseInfo' size='mini'>
        <el-form-item label='学分' prop='courseCredit'>
          <el-input v-model='CourseInfo.courseCredit' placeholder='请输入课程学分'></el-input>
        </el-form-item>
        <el-form-item label='学时' prop='coursePeriod'>
          <el-input v-model='CourseInfo.coursePeriod' placeholder='请输入课程学时'></el-input>
        </el-form-item>
        <el-form-item label='申请人' prop='applicant'>
          <el-input v-model='CourseInfo.applicant' placeholder='请输入申请人'></el-input>
        </el-form-item>
        <el-form-item label-position='right' label-width='199px'>
          <el-button size='mini' @click='addCourse()'>提交</el-button>
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
        courseId: [
          { required: true, message: '请输入课程编码', trigger: 'blur' }
        ],
        courseCredit: [
          { required: true, message: '请输入课程学分', trigger: 'blur' }
        ],
        coursePeriod: [
          { required: true, message: '请输入课程学时', trigger: 'blur' }
        ],
        applicant: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ]
      },
      CourseInfo: {
        courseTerm: '',
        courseName: '',
        courseId: '',
        courseCredit: '',
        coursePeriod: '',
        applicant: ''
      }
    }
  },
  methods: {
    addCourse () {
      localStorage.setItem('CourseInfo', JSON.stringify(this.CourseInfo))
      console.log(localStorage.getItem('CourseInfo'))
      this.CourseInfo.courseTerm = ''
      this.CourseInfo.courseName = ''
      this.CourseInfo.courseId = ''
      this.CourseInfo.courseCredit = ''
      this.CourseInfo.coursePeriod = ''
      this.CourseInfo.applicant = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .addCourse
    position : absolute
    left : 22%
    top : 10%
    width : 550px
    height : 500px
    .half
      position : absolute
      left : 0
    .anotherHalf
      position : absolute
      right : 0
</style>
