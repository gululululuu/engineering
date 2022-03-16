<template>
  <div>
    <div class="analysisLeft">
      <div class='basicHead'>
        <p class='info'>请填写对评估课程达成情况的分析</p>
      </div>
      <div class="half">
        <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='courseInfo' size='mini'>
          <el-form-item label='课程名称' prop='courseName'>
            <el-select v-model='courseInfo.courseName' placeholder='请选择要上传的科目'>
              <el-option
                v-for="item in courses"
                :key='item.courseId'
                :value="item.courseName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-position='right'>
            <el-button size='mini' @click='query()' style="width: 192px;">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="anotherHalf">
        <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='courseInfo' size='mini'>
          <el-form-item
            v-for="item in analysis"
            :key="item.value"
            :label="item.aimName"
          >
            <el-input type="textarea" maxLength="70" v-model="item.aimValue" placeholder='请输入内容'></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="analysisRight">
      <div class='basicHead'>
        <p class='info'>请填写对课程目标持续改进的措施</p>
      </div>
      <div class="half">
        <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='courseInfo' size='mini'>
          <el-form-item
            v-for="item in methods"
            :key="item.value"
            :label="item.aimName"
          >
            <el-input type="textarea" maxLength="70"  v-model="item.aimValue" placeholder='请输入内容'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="anotherHalf">
        <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='courseInfo' size='mini'>
          <el-form-item label-position='right'>
            <el-button size='mini' @click='submit()' style="width : 180px">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
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
      courseInfo: {
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
      },
      courses: [],
      analysis: [],
      methods: []
    }
  },
  // 在数据库中查找当前教师教授的所有课程
  created () {
    this.initCourseAnalysis()
    var id = JSON.parse(localStorage.getItem('userId'))
    this.$axios({
      methods: 'get',
      url: '/courses',
      params: {id: id}
    }).then(res => {
      const data = res.data.courses
      let _this = this
      data.forEach(item => {
        let course = {
          courseName: item.courseName,
          courseId: item.id
        }
        _this.courses.push(course)
      })
    })
  },
  methods: {
    initCourseAnalysis () {
      let analysis = []
      localStorage.setItem('courseAnalysis', JSON.stringify(analysis))
    },
    submit () {
      console.log(this.analysis)
      console.log(this.methods)
      try {
        let data = {
          courseName: this.courseInfo.courseName
        }
        let len = this.analysis.length
        for (let i = 0; i < (len * 2); i++) {
          if (i < len) {
            data[i] = this.analysis[i].aimValue
          } else {
            data[i] = this.methods[i - 3].aimValue
          }
        }
        let courseAnalysis = JSON.parse(localStorage.getItem('courseAnalysis'))
        courseAnalysis.push(data)
        localStorage.setItem('courseAnalysis', JSON.stringify(courseAnalysis))
        console.log(JSON.parse(localStorage.getItem('courseAnalysis')))
        this.$message.success('提交成功')
        this.clear()
      } catch (e) {
        console.log(e)
        this.$message.error('提交失败，请联系管理员校验')
      }
    },
    query () {
      this.analysis = []
      this.methods = []
      this.$axios({
        method: 'get', url: '/aims', params: {courseName: this.courseInfo.courseName}
      }).then(res => {
        console.log(res)
        const data = res.data.aim
        let _this = this
        for (let i = 1; i <= data.aimNumber; i++) {
          _this.analysis.push({aimName: '目标' + i, aimValue: ''})
          _this.methods.push({aimName: '目标' + i, aimValue: ''})
        }
      })
    },
    clear () {
      let _this = this
      Object.getOwnPropertyNames(this.courseInfo).forEach((item) => {
        _this.courseInfo[item] = ''
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .analysisLeft
    position : absolute
    left : 2%
    top : 5%
    width : 500px
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
  .analysisRight
    position : absolute
    right : 2%
    top : 5%
    width : 500px
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
