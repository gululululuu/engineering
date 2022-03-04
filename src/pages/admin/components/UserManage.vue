<template>
  <div>
    <div class='Center'>
      <div class='head'>
        <p class='headFonts'>用户管理中心</p>
        <p class="headOut" @click="backLogin()">注销</p>
        <p class='headMe' @click='backCollege()'>我的</p>
      </div>
      <div class='Left'>
        <div class='back'>
          <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
          <p class='backFonts' @click='backHome()'>返回首页</p>
        </div>
        <div class='inputBox'>
          <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>添加用户信息</p></button>
          <button class='investigation' @click='toAlter()'><p class='invesFonts'>修改用户信息</p></button>
          <button class='investigation' @click='toQuery()'><p class='invesFonts'>查询用户信息</p></button>
          <button class='investigation' @click='toDelte()'><p class='invesFonts'>删除用户信息</p></button>
        </div>
      </div>
      <div class='Right'>
        <div v-show='isAdd' class='MyInfo'>
          <div v-show="isSelect" class='basicInfo'>
            <div class='basicHead'>
              <p class='info'>添加用户前请先选择用户的身份</p>
            </div>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='userData' size='mini'>
              <el-form-item label='用户身份' prop='identity'>
                <el-select v-model='userData.identity' placeholder='请选择新用户的身份'>
                  <el-option label='院领导' value='院领导'></el-option>
                  <el-option label='系领导' value='系领导'></el-option>
                  <el-option label='督学' value='督学'></el-option>
                  <el-option label='教学秘书' value='教学秘书'></el-option>
                  <el-option label='教师' value='教师'></el-option>
                  <el-option label='学生' value='学生'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size='mini' @click='getIdentity()' style="width: 190px;">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-show='isAddStu' class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class='rightForm'>
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='姓名' prop='userName'>
                    <el-input v-model='userData.userName' placeholder='请输入新用户的姓名'></el-input>
                  </el-form-item>
                  <el-form-item label='年龄' prop='userAge'>
                    <el-input v-model='userData.userAge' placeholder='请输入新用户的年龄'></el-input>
                  </el-form-item>
                  <el-form-item label='性别' prop='userSex'>
                    <el-input v-model='userData.userSex' placeholder='请输入新用户的性别'></el-input>
                  </el-form-item>
                  <el-form-item label='专业' prop='userMajor'>
                    <el-input v-model='userData.userMajor' placeholder='请输入新用户的专业'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='学号' prop='userId'>
                    <el-input v-model='userData.userId' placeholder='请输入新用户的学号'></el-input>
                  </el-form-item>
                  <el-form-item label='班级' prop='userClass'>
                    <el-input v-model='userData.userClass' placeholder='请输入新用户的班级'></el-input>
                  </el-form-item>
                  <el-form-item label='住址' prop='userAddress'>
                    <el-input v-model='userData.userAddress' placeholder='请输入新用户的住址'></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='submitAddInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div v-show='isAddUser' class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class='rightForm'>
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='姓名' prop='userName'>
                    <el-input v-model='userData.userName' placeholder='请输入新用户的姓名'></el-input>
                  </el-form-item>
                  <el-form-item label='年龄' prop='userAge'>
                    <el-input v-model='userData.userAge' placeholder='请输入新用户的年龄'></el-input>
                  </el-form-item>
                  <el-form-item label='性别' prop='userSex'>
                    <el-input v-model='userData.userSex' placeholder='请输入新用户的性别'></el-input>
                  </el-form-item>
                  <el-form-item label='院系' prop='userMajor'>
                    <el-input v-model='userData.userMajor' placeholder='请输入新用户的院系'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='工号' prop='userId'>
                    <el-input v-model='userData.userId' placeholder='请输入新用户的工号'></el-input>
                  </el-form-item>
                  <el-form-item label='职称' prop='userTitle'>
                    <el-input v-model='userData.userTitle' placeholder='请输入新用户的职称'></el-input>
                  </el-form-item>
                  <el-form-item label='住址' prop='userAddress'>
                    <el-input v-model='userData.userAddress' placeholder='请输入新用户的住址'></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='submitAddInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div v-show='isAlter' class='MyInfo'>
          <div v-show="isAlterSelect" class='basicInfo'>
            <div class='basicHead'>
              <p class='info'>修改用户信息前请先选择用户的身份</p>
            </div>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' :model='userData' size='mini'>
              <el-form-item label='用户身份' prop='identity'>
                <el-select v-model='userData.identity' placeholder='请选择新用户的身份'>
                  <el-option label='院领导' value='院领导'></el-option>
                  <el-option label='系领导' value='系领导'></el-option>
                  <el-option label='督学' value='督学'></el-option>
                  <el-option label='教学秘书' value='教学秘书'></el-option>
                  <el-option label='教师' value='教师'></el-option>
                  <el-option label='学生' value='学生'></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size='mini' @click='getIdentity()' style="width: 190px;">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-show='isAlterStu' class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class='rightForm'>
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='姓名' prop='userName'>
                    <el-input v-model='userData.userName' placeholder='请输入用户的新姓名'></el-input>
                  </el-form-item>
                  <el-form-item label='年龄' prop='userAge'>
                    <el-input v-model='userData.userAge' placeholder='请输入用户的新年龄'></el-input>
                  </el-form-item>
                  <el-form-item label='性别' prop='userSex'>
                    <el-input v-model='userData.userSex' placeholder='请输入用户的性别'></el-input>
                  </el-form-item>
                  <el-form-item label='专业' prop='userMajor'>
                    <el-input v-model='userData.userMajor' placeholder='请输入用户的新专业'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='学号' prop='userId'>
                    <el-input v-model='userData.userId' placeholder='请输入用户的新学号'></el-input>
                  </el-form-item>
                  <el-form-item label='班级' prop='userClass'>
                    <el-input v-model='userData.userClass' placeholder='请输入用户的新班级'></el-input>
                  </el-form-item>
                  <el-form-item label='住址' prop='userAddress'>
                    <el-input v-model='userData.userAddress' placeholder='请输入用户的新住址'></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='submitAddInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div v-show='isAlterUser' class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class='rightForm'>
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='姓名' prop='userName'>
                    <el-input v-model='userData.userName' placeholder='请输入用户的新姓名'></el-input>
                  </el-form-item>
                  <el-form-item label='年龄' prop='userAge'>
                    <el-input v-model='userData.userAge' placeholder='请输入用户的新年龄'></el-input>
                  </el-form-item>
                  <el-form-item label='性别' prop='userSex'>
                    <el-input v-model='userData.userSex' placeholder='请输入用户的性别'></el-input>
                  </el-form-item>
                  <el-form-item label='院系' prop='userMajor'>
                    <el-input v-model='userData.userMajor' placeholder='请输入用户的新院系'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='工号' prop='userId'>
                    <el-input v-model='userData.userId' placeholder='请输入用户的新工号'></el-input>
                  </el-form-item>
                  <el-form-item label='职称' prop='userTitle'>
                    <el-input v-model='userData.userTitle' placeholder='请输入用户的新职称'></el-input>
                  </el-form-item>
                  <el-form-item label='住址' prop='userAddress'>
                    <el-input v-model='userData.userAddress' placeholder='请输入用户的新住址'></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='submitAddInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div v-show='isAll' class="MyInfo">
          <div class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
              <el-button size='mini' class="addButton" @click='addCourse()'>添加课程</el-button>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border max-height="420" class="infoTable">
              <el-table-column prop="userName" label="名称" width="120" align="center"></el-table-column>
              <el-table-column prop="userId" label="课程编号" width="120" align="center"></el-table-column>
              <el-table-column prop="address" label="成绩组成"  align="center">
                <el-table-column prop="quantity" label="定量"  align="center">
                  <el-table-column prop="userAge" label="试卷" width="120" align="center"></el-table-column>
                  <el-table-column prop="userSex" label="作业" width="120" align="center"></el-table-column>
                  <el-table-column prop="userClass" label="实验" width="120" align="center"></el-table-column>
                  <el-table-column prop="userTitle" label="随堂检验" width="120" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="quality" label="定性" align="center">
                  <el-table-column prop="teaEvaluate" label="教师评价" width="120" align="center"></el-table-column>
                  <el-table-column prop="stuEvaluate" label="学生自我评价" width="120" align="center"></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button @click="alter(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteInfo(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'UserManage',
  data () {
    return {
      isActive: true,
      isAdd: false,
      isSelect: false,
      isAddStu: false,
      isAddUser: false,
      isAlter: false,
      isAlterSelect: false,
      isAlterStu: false,
      isAlterUser: false,
      isAll: false,
      labelPosition: 'right',
      loading: true,
      rules: {
        identity: [
          { required: true, message: '请选择新用户的身份', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入新用户的姓名', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请输入新用户的编号', trigger: 'blur' }
        ],
        userAge: [
          { required: true, message: '请输入新用户的年龄', trigger: 'blur' }
        ],
        userSex: [
          { required: true, message: '请输入新用户的性别', trigger: 'blur' }
        ],
        userClass: [
          { required: true, message: '请输入新用户所在的班级', trigger: 'blur' }
        ],
        userTitle: [
          { required: true, message: '请输入新用户的职称', trigger: 'blur' }
        ],
        userMajor: [
          { required: true, message: '请输入新用户所在院系', trigger: 'blur' }
        ],
        userAddress: [
          { required: true, message: '请输入新用户的住址', trigger: 'blur' }
        ]
      },
      userData: {
        identity: '',
        userName: '',
        userId: '',
        teaId: '',
        userAge: '',
        userSex: '',
        userTitle: '',
        userClass: '',
        userMajor: '',
        userAddress: ''
      },
      tableData: [],
      identity: '',
      alterInfo: []
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
    backCollege () {
      this.$router.push('/admin')
    },
    toMyInfo () {
      this.isAdd = true
      this.isSelect = true
      this.isActive = false
      this.isAlter = false
      this.isAll = false
      this.isAddStu = false
      this.isAddUser = false
    },
    getIdentity () {
      if (this.userData.identity !== '学生') {
        if (this.isAdd === true) {
          this.isAddUser = true
          this.isSelect = false
          this.isAddStu = false
        } else if (this.isAlter === true) {
          this.isAlterUser = true
          this.isAlterSelect = false
          this.isAlterStu = false
        }
      } else {
        if (this.isAdd === true) {
          this.isAddStu = true
          this.isAddUser = false
          this.isSelect = false
        } else if (this.isAlter === true) {
          this.isAlterStu = true
          this.isAlterSelect = false
          this.isAlterUser = false
        }
      }
    },
    toAlter () {
      this.isAlter = true
      this.isAlterSelect = true
      this.isAdd = false
      this.isAll = false
      this.isActive = false
      this.isAlterStu = false
      this.isAlterUser = false
      this.clear()
    },
    toQuery () {
      this.isAll = true
      this.isAdd = false
      this.isAlter = false
      this.isActive = false
      this.clear()
    },
    back () {
      if (this.isAdd === true) {
        this.isSelect = true
        this.isAddStu = false
        this.isAddUser = false
      } else if (this.isAlter === true) {
        this.isAlterSelect = true
        this.isAlterStu = false
        this.isAlterUser = false
      }
      this.clear()
      this.tableData = []
    },
    clear () {
      let _this = this
      Object.getOwnPropertyNames(this.userData).forEach((item) => {
        _this.userData[item] = ''
      })
    },
    // 添加课程信息
    addCourse () {
      this.isAdd = true
      this.isAlter = false
      this.isAll = false
    },
    submitAddInfo () {
      try {
        let data = {
          identity: this.userData.identity,
          userName: this.userData.userName,
          userId: this.userData.userId,
          userAge: this.userData.userAge,
          userSex: this.userData.userSex,
          userClass: this.userData.userClass,
          userTitle: this.userData.userTitle
        }
        Object.getOwnPropertyNames(data).forEach((item) => {
          if (data[item] === '') {
            const error = {message: '未全部填写完成'}
            throw error
          }
        })
        let _this = this
        switch (data.identity) {
          case '院领导':
          case '系领导':
          case '督学':
          case '教学秘书':
          case '教师':
            _this.identity = 'users'
            break
          case '学生':
            _this.identity = 'students'
            break
        }
        this.$axios({
          method: 'post',
          url: '/' + this.identity,
          params: {
            identity: this.userData.identity,
            userName: this.userData.userName,
            userId: this.userData.userId,
            userAge: this.userData.userAge,
            userSex: this.userData.userSex,
            userClass: this.userData.userClass,
            userTitle: this.userData.userTitle
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    // 修改成绩组成占比
    submit () {
      try {
        let data = {
          identity: this.userData.identity,
          userName: this.userData.userName,
          userId: this.userData.userId,
          userAge: this.userData.userAge,
          userSex: this.userData.userSex,
          userClass: this.userData.userClass,
          userTitle: this.userData.userTitle
        }
        Object.getOwnPropertyNames(data).forEach((item) => {
          if (data[item] === '') {
            const error = {message: '未全部填写完成'}
            throw error
          }
        })
        this.$axios({
          method: 'put',
          url: '/courses',
          params: {
            identity: this.userData.identity,
            userName: this.userData.userName,
            userId: this.userData.userId,
            userAge: this.userData.userAge,
            userSex: this.userData.userSex,
            userClass: this.userData.userClass,
            userTitle: this.userData.userTitle
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
      this.isAll = false
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
          url: '/courses',
          params: {
            userId: row.userId
          }
        }).then(res => {
          if (res.data.msg === '删除成功') {
            this.$message.success('删除成功，请重新刷新页面来查看')
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
    queryAll () {
      this.isAll = true
      this.isAdd = false
      this.isAlter = false
      this.$axios.get('/courses').then(res => {
        if (res.data) {
          let data = res.data.courses
          console.log(data)
          let _this = this
          data.forEach((item) => {
            let course = {
              userName: item.userName,
              userId: item.id,
              userAge: item.userAge,
              userSex: item.userSex,
              userClass: item.userClass,
              userTitle: item.userTitle
            }
            _this.tableData.push(course)
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
          .anotherHalf
            position : absolute
            right : 0
        .allInfo
          position : absolute
          left : 5%
          top : 10%
          width : 1000px
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
          .el-table
            .warning-row
              background: oldlace
            .success-row
              background: #f0f9eb
        .basicInfo
          width : 270px
          height : 500px
          position : absolute
          left : 35%
          top : 10%
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
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
