<template>
  <div>
    <div v-show='isMyInfo' class='MyInfo'>
      <div v-show='isSelect' class='basicInfo'>
        <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='formData' size='mini'>
          <el-form-item label='教学学期' prop='term'>
            <el-select v-model='formData.term' placeholder='请选择教学学期'>
              <el-option label='大学一年级 第 一 学期' value='大学一年级 第 一 学期'></el-option>
              <el-option label='大学一年级 第 二 学期' value='大学一年级 第 二 学期'></el-option>
              <el-option label='大学二年级 第 一 学期' value='大学二年级 第 一 学期'></el-option>
              <el-option label='大学二年级 第 二 学期' value='大学二年级 第 二 学期'></el-option>
              <el-option label='大学三年级 第 一 学期' value='大学三年级 第 一 学期'></el-option>
              <el-option label='大学三年级 第 二 学期' value='大学三年级 第 二 学期'></el-option>
              <el-option label='大学四年级 第 一 学期' value='大学四年级 第 一 学期'></el-option>
              <el-option label='大学四年级 第 二 学期' value='大学四年级 第 二 学期'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-position='right' label-width='80px'>
            <el-button size='mini' @click='query()'>查询</el-button>
            <el-button size='mini' @click='queryAll()' style="margin-left: 25px;">查询所有学期</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="isOne" class="allInfo">
        <div class="backLastest">
          <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
          <p class='backFonts' @click='back()'>返回上一层</p>
          <el-button size='mini' class="addButton" @click='addCourse()'>添加课程目标</el-button>
        </div>
        <el-table :data="tableData" border max-height="500" class="infoTable">
          <el-table-column prop="courseName" label="课程名称" align="center"></el-table-column>
          <el-table-column prop="courseId" label="课程编号" align="center"></el-table-column>
          <el-table-column prop="aimNumber" label="课程目标" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align='center'>
            <template slot-scope="scope">
              <el-button @click="alter(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteInfo(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if='isAdd' class="allInfo">
        <div class="backLastest">
          <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
          <p class='backFonts' @click='back()'>返回上一层</p>
        </div>
        <div class='rightForm'>
          <div class='half'>
            <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='courseData' size='mini'>
              <el-form-item label='课程名称' prop='courseName'>
                <el-input v-model='courseData.courseName' placeholder='请输入新的课程名称'></el-input>
              </el-form-item>
              <el-form-item label='课程目标' prop='aimNumber'>
                <el-input v-model='courseData.aimNumber' placeholder='请输入课程目标的数量'></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class='anotherHalf'>
            <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='courseData' size='mini'>
              <el-form-item label='课程编号' prop='courseId'>
                <el-input v-model='courseData.courseId' placeholder='请输入课程编号'></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size='mini' @click='submitAddInfo()' style="width: 180px;">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div v-if='isAlter' class="allInfo">
        <div class="backLastest">
          <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
          <p class='backFonts' @click='back()'>返回上一层</p>
        </div>
        <div class='rightForm'>
          <div class='half'>
            <el-form :label-position='labelPosition' label-width='110px' :model='courseData' :rules='rules' size='mini'>
              <el-form-item label='课程名称'>
                <el-tag class="tag">{{ courseData.courseName }}</el-tag>
              </el-form-item>
              <el-form-item label='课程目标' prop='aimNumber'>
                <el-input v-model='courseData.aimNumber' placeholder='请输入课程目标的数量'></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class='anotherHalf'>
            <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='courseData' size='mini'>
              <el-form-item label='课程编号'>
                <el-tag class="tag">{{ courseData.courseId }}</el-tag>
              </el-form-item>
              <el-form-item>
                <el-button size='mini' @click='submit()' style="width: 192px;">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div v-if='isAll' class="allInfo">
        <div class="backLastest">
          <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
          <p class='backFonts' @click='back()'>返回上一层</p>
          <el-button size='mini' class="addButton" @click='addCourse()'>添加课程目标</el-button>
        </div>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border max-height="420" class="infoTable">
          <el-table-column prop="courseName" label="课程名称" align="center"></el-table-column>
          <el-table-column prop="courseId" label="课程编号" align="center"></el-table-column>
          <el-table-column prop="aimNumber" label="课程目标" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="alter(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteInfo(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AimsManage',
  inject: ['reload'],
  data () {
    return {
      isMyInfo: true,
      isSelect: true,
      isOne: false,
      isAdd: false,
      isAlter: false,
      isAll: false,
      labelPosition: 'right',
      loading: true,
      formData: {
        term: ''
      },
      rules: {
        term: [
          { required: true, message: '请选择课程学期', trigger: 'blur' }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        aimNumber: [
          { required: true, message: '请输入课程目标数量', trigger: 'blur' }
        ],
        courseId: [
          { required: true, message: '请输入课程编号', trigger: 'blur' }
        ]
      },
      courseData: {
        courseName: '',
        courseId: '',
        aimNumber: ''
      },
      tableData: [],
      alterInfo: [],
      coursesInfo: [],
      selectedCourseName: ''
    }
  },
  created () {
    this.$axios({
      method: 'get', url: '/courses'
    }).then(res => {
      const data = res.data.courses
      this.coursesInfo = data
    })
  },
  methods: {
    ...mapMutations(['delLogin']),
    backLogin () {
      this.$router.push('/login')
      this.delLogin()
      localStorage.removeItem('userId')
    },
    backHome () {
      this.$router.push('/')
    },
    backCollege () {
      this.$router.push('/admin')
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isActive = false
      this.isRelation = false
      this.clear()
    },
    toRelation () {
      this.isRelation = true
      this.isRSelect = true
      this.isRInfo = false
      this.isMyInfo = false
      this.isActive = false
      this.clear()
    },
    back () {
      if (this.isMyInfo) {
        this.isSelect = true
        this.isOne = false
        this.isAll = false
        this.isAdd = false
        this.isAlter = false
      } else if (this.isRelation) {
        this.isRSelect = true
        this.isRInfo = false
      }
      this.clear()
    },
    clear () {
      let _this = this
      _this.tableData = []
      _this.formData.term = ''
      Object.getOwnPropertyNames(this.courseData).forEach((item) => {
        _this.courseData[item] = ''
      })
    },
    // 添加课程信息
    addCourse () {
      this.isAdd = true
      this.isAlter = false
      this.isOne = false
      this.isAll = false
      this.isSelect = false
    },
    submitAddInfo () {
      try {
        let data = {
          courseName: this.courseData.courseName,
          courseId: this.courseData.courseId,
          aimNumber: this.courseData.aimNumber
        }
        Object.getOwnPropertyNames(data).forEach((item) => {
          if (data[item] === '') {
            const error = {message: '未全部填写完成'}
            throw error
          }
        })
        this.$axios({
          method: 'post',
          url: '/aims',
          params: {
            courseName: this.courseData.courseName,
            courseId: this.courseData.courseId,
            aimNumber: this.courseData.aimNumber
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    // 修改课程目标信息
    submit () {
      try {
        let data = {
          courseName: this.courseData.courseName,
          courseId: this.courseData.courseId,
          aimNumber: this.courseData.aimNumber
        }
        Object.getOwnPropertyNames(data).forEach((item) => {
          if (data[item] === '') {
            const error = {message: '未全部填写完成'}
            throw error
          }
        })
        this.$axios({
          method: 'put',
          url: '/aims',
          params: {
            courseName: this.courseData.courseName,
            courseId: this.courseData.courseId,
            aimNumber: this.courseData.aimNumber
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    alter (row) {
      this.isAlter = true
      this.isAdd = false
      this.isOne = false
      this.isAll = false
      this.isSelect = false
      this.courseData.courseName = row.courseName
      this.courseData.courseId = row.courseId
    },
    // 删除课程信息
    deleteInfo (row) {
      this.$confirm('您确认将要删除此条课程信息？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: '/aims',
          params: {
            courseId: row.courseId
          }
        }).then(res => {
          if (res.data.msg === '删除成功') {
            this.$message.success('删除成功')
            this.reload()
          } else {
            this.$message.warning('不存在该数据，请重新刷新页面来查看')
          }
        }).catch(e => { console.log(e) })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel' ? '放弃删除' : '停留在当前页面'
        })
      })
    },
    getCourseInfo () {
      this.clear()
      this.isRInfo = true
      this.isRSelect = false
      let _this = this
      this.relationInfo.forEach(item => {
        if (item.courseName === this.selectedCourseName) {
          _this.tableData.push(item)
        }
      })
    },
    query () {
      this.isOne = true
      this.isAll = false
      this.isAdd = false
      this.isAlter = false
      this.isSelect = false
      if (this.formData.term === '') {
        this.$message.warning('请选择学期后重试')
        return 0
      }
      let courses = []
      this.coursesInfo.forEach(course => {
        if (course.term === this.formData.term) {
          courses.push(course.courseName)
        }
      })
      this.$axios({
        method: 'get', url: '/aims'
      }).then(res => {
        if (res.data) {
          let data = res.data.aims
          let _this = this
          data.forEach((item) => {
            if (courses.includes(item.courseName)) {
              let aim = {
                courseName: item.courseName,
                aimNumber: item.aimNumber,
                courseId: item.id
              }
              _this.tableData.push(aim)
            }
          })
        }
      })
    },
    queryAll () {
      this.isAll = true
      this.isOne = false
      this.isAdd = false
      this.isSelect = false
      this.isAlter = false
      this.$axios.get('/aims').then(res => {
        if (res.data) {
          let data = res.data.aims
          let _this = this
          data.forEach((item) => {
            let aim = {
              courseName: item.courseName,
              aimNumber: item.aimNumber,
              courseId: item.id
            }
            _this.tableData.push(aim)
          })
        }
        this.loading = false
      })
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
        .rightForm
          position : absolute
          top : 10%
          left : 22%
          width : 600px
          height : 500px
          margin : 0
          .half
            position : absolute
            left : 0
            .tag
              background-color : dodgerblue
              color : white
              width : 192px
              text-align : center
          .anotherHalf
            position : absolute
            right : 0
            .tag
              background-color : dodgerblue
              color : white
              width : 192px
              text-align : center
        .allInfo
          position : absolute
          left : 5%
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
          .infoTable
            position : absolute
            top : 30px
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
              left : 5%
              top : 10%
              font-family : '宋体'
              font-size : 17px
              display : inline
              float : right
              margin : 3px 15px 0px 0px
            .addButton
              position : absolute
              right : 0
              top : 10%
        .basicInfo
          width : 270px
          height : 500px
          position : absolute
          left : 35%
          top : 10%
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
