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
          <button class='investigation' @click='toQuery()'><p class='invesFonts'>查询用户信息</p></button>
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
                    <el-select v-model='userData.userSex' placeholder='请选择新用户的性别'>
                      <el-option label='男' value='男'></el-option>
                      <el-option label='女' value='女'></el-option>
                    </el-select>
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
                    <el-button size='mini' @click='submitStuInfo()' style="width: 180px;">提交</el-button>
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
                    <el-select v-model='userData.userSex' placeholder='请选择新用户的性别'>
                      <el-option label='男' value='男'></el-option>
                      <el-option label='女' value='女'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label='院系' prop='userDepartment'>
                    <el-input v-model='userData.userDepartment' placeholder='请输入新用户的院系'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='userData' size='mini'>
                  <el-form-item label='工号' prop='userId'>
                    <el-input v-model='userData.userId' placeholder='请输入新用户的工号'></el-input>
                  </el-form-item>
                  <el-form-item label='职称' prop='userTitle'>
                    <el-select v-model='userData.userTitle' placeholder='请选择用户的职称'>
                      <el-option label='院领导' value='院领导'></el-option>
                      <el-option label='系主任' value='系主任'></el-option>
                      <el-option label='督学' value='督学'></el-option>
                      <el-option label='教学秘书' value='教学秘书'></el-option>
                      <el-option label='教师' value='教师'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label='住址' prop='userAddress'>
                    <el-input v-model='userData.userAddress' placeholder='请输入新用户的住址'></el-input>
                  </el-form-item>
                  <el-form-item label='专业' prop='userMajor'>
                    <el-input v-model='userData.userMajor' placeholder='请输入新用户的专业'></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='submitUserInfo()' style="width: 192px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div v-show='isAll' class="MyInfo">
          <div v-show="isAllSelect" class='allInfo'>
            <div class='rightForm'>
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='80px' :model='userData' size='mini'>
                  <el-form-item label='用户身份' prop='identity'>
                    <el-select v-model='userData.identity' placeholder='请选择用户的身份'>
                      <el-option label='院领导' value='院领导'></el-option>
                      <el-option label='系主任' value='系主任'></el-option>
                      <el-option label='督学' value='督学'></el-option>
                      <el-option label='教学秘书' value='教学秘书'></el-option>
                      <el-option label='教师' value='教师'></el-option>
                      <el-option label='学生' value='学生'></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label='姓名' prop='userName'>
                    <el-input v-model='userData.userName' placeholder='请输入用户的姓名'></el-input>
                  </el-form-item>
                  <el-form-item label='编号' prop='userId'>
                    <el-input v-model='userData.userId' placeholder='请输入用户的编号'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item>
                    <el-button size='mini' @click='getInfoByIdentity()' style="width: 180px;">提交&emsp;&emsp;&emsp;(只按身份查询)</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='getInfoByName()' style="width: 180px;">提交&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;(身份+姓名)</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='getInfoById()' style="width: 180px;">提交&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;(身份+编号)</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class='bottomFonts'>若要删除数据，请在查询之后再进行操作~</div>
          </div>
          <div v-show='isAllUser' class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border max-height="420" class="infoTable">
              <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入姓名" v-if="scope.row.isClick" v-model="tableData[scope.$index].userName"></el-input>
                  <span v-else>{{ tableData[scope.$index].userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="工号" align="center" width="100px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入工号" v-if="scope.row.isClick" v-model="tableData[scope.$index].userId"></el-input>
                  <span v-else>{{ tableData[scope.$index].userId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="年龄" align="center" width="100px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入年龄" v-if="scope.row.isClick" v-model="tableData[scope.$index].userAge"></el-input>
                  <span v-else>{{ tableData[scope.$index].userAge }}</span>
                </template>
              </el-table-column>
              <el-table-column label="性别" align="center" width="100px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入性别" v-if="scope.row.isClick" v-model="tableData[scope.$index].userSex"></el-input>
                  <span v-else>{{ tableData[scope.$index].userSex }}</span>
                </template>
              </el-table-column>
              <el-table-column label="院系" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入院系" v-if="scope.row.isClick" v-model="tableData[scope.$index].userDepartment"></el-input>
                  <span v-else>{{ tableData[scope.$index].userDepartment }}</span>
                </template>
              </el-table-column>
              <el-table-column label="专业" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入专业" v-if="scope.row.isClick" v-model="tableData[scope.$index].userMajor"></el-input>
                  <span v-else>{{ tableData[scope.$index].userMajor }}</span>
                </template>
              </el-table-column>
              <el-table-column label="职称" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入职称" v-if="scope.row.isClick" v-model="tableData[scope.$index].userTitle"></el-input>
                  <span v-else>{{ tableData[scope.$index].userTitle }}</span>
                </template>
              </el-table-column>
              <el-table-column label="住址" align="center" width="110px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入住址" v-if="scope.row.isClick" v-model="tableData[scope.$index].userAddress"></el-input>
                  <span v-else>{{ tableData[scope.$index].userAddress }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="170px" align='center'>
                <template slot-scope="scope">
                  <el-button @click="change(scope)" size='small' type='text'><p>编辑</p></el-button>
                  <el-button @click="save(scope)" size='small' type='text'><p>保存</p></el-button>
                  <el-button @click="deleteUserInfo(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show='isAllStu' class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border max-height="420" class="infoTable">
              <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入姓名" v-if="scope.row.isClick" v-model="tableData[scope.$index].userName"></el-input>
                  <span v-else>{{ tableData[scope.$index].userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="学号" align="center" width="100px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入学号" v-if="scope.row.isClick" v-model="tableData[scope.$index].userId"></el-input>
                  <span v-else>{{ tableData[scope.$index].userId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="年龄" align="center" width="100px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入年龄" v-if="scope.row.isClick" v-model="tableData[scope.$index].userAge"></el-input>
                  <span v-else>{{ tableData[scope.$index].userAge }}</span>
                </template>
              </el-table-column>
              <el-table-column label="性别" align="center" width="100px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入性别" v-if="scope.row.isClick" v-model="tableData[scope.$index].userSex"></el-input>
                  <span v-else>{{ tableData[scope.$index].userSex }}</span>
                </template>
              </el-table-column>
              <el-table-column label="班级" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入班级" v-if="scope.row.isClick" v-model="tableData[scope.$index].userClass"></el-input>
                  <span v-else>{{ tableData[scope.$index].userClass }}</span>
                </template>
              </el-table-column>
              <el-table-column label="专业" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入专业" v-if="scope.row.isClick" v-model="tableData[scope.$index].userMajor"></el-input>
                  <span v-else>{{ tableData[scope.$index].userMajor }}</span>
                </template>
              </el-table-column>
              <el-table-column label="住址" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入住址" v-if="scope.row.isClick" v-model="tableData[scope.$index].userAddress"></el-input>
                  <span v-else>{{ tableData[scope.$index].userAddress }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="170px" align='center'>
                <template slot-scope="scope">
                  <el-button @click="change(scope)" size='small' type='text'><p>编辑</p></el-button>
                  <el-button @click="save(scope)" size='small' type='text'><p>保存</p></el-button>
                  <el-button @click="deleteStuInfo(scope.row)" type="text" size="small">删除</el-button>
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
  inject: ['reload'],
  data () {
    return {
      isActive: true,
      isAdd: false,
      isSelect: false,
      isAddStu: false,
      isAddUser: false,
      isAll: false,
      isAllSelect: false,
      isAllUser: false,
      isAllStu: false,
      lastClick: null,
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
          { required: true, message: '请输入新用户的专业', trigger: 'blur' }
        ],
        userAddress: [
          { required: true, message: '请输入新用户的住址', trigger: 'blur' }
        ],
        userDepartment: [
          { required: true, message: '请输入新用户所在院系', trigger: 'blur' }
        ]
      },
      userData: {
        identity: '',
        userName: '',
        userId: '',
        userAge: '',
        userSex: '',
        userTitle: '',
        userClass: '',
        userMajor: '',
        userDepartment: '',
        userAddress: ''
      },
      tableData: []
    }
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
      this.isAdd = true
      this.isSelect = true
      this.isActive = false
      this.isAll = false
      this.isAddStu = false
      this.isAddUser = false
    },
    // 编辑信息
    change (scope) {
      // 再次点击则还原其他行
      if (this.lastClick) {
        this.$set(this.lastClick.row, 'isClick', false)
      }
      // 第一次点击，变成显示
      this.lastClick = scope
      this.$set(scope.row, 'isClick', true)
    },
    // 保存信息
    save (scope) {
      // 再次点击则还原其他行
      if (this.lastClick) {
        this.$set(this.lastClick.row, 'isClick', false)
      }
      // 第一次点击，变成隐藏
      this.lastClick = scope
      this.$set(scope.row, 'isClick', false)
      if (this.isAllUser) {
        this.updateUserInfo(scope)
      } else if (this.isAllStu) {
        this.updateStuInfo(scope)
      }
    },
    getIdentity () {
      if (this.userData.identity !== '学生') {
        if (this.isAdd === true) {
          this.isAddUser = true
          this.isSelect = false
          this.isAddStu = false
        }
      } else {
        if (this.isAdd === true) {
          this.isAddStu = true
          this.isAddUser = false
          this.isSelect = false
        }
      }
    },
    toQuery () {
      this.isAll = true
      this.isAllSelect = true
      this.isAllUser = false
      this.isAllStu = false
      this.isAdd = false
      this.isActive = false
      this.clear()
    },
    back () {
      if (this.isAdd === true) {
        this.isSelect = true
        this.isAddStu = false
        this.isAddUser = false
      } else if (this.isAll === true) {
        this.isAllSelect = true
        this.isAllStu = false
        this.isAllUser = false
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
    // 添加新学生的信息
    submitStuInfo () {
      try {
        let data = {
          userName: this.userData.userName,
          userId: this.userData.userId,
          userAge: this.userData.userAge,
          userSex: this.userData.userSex,
          userClass: this.userData.userClass,
          userAddress: this.userData.userAddress,
          userMajor: this.userData.userMajor
        }
        Object.getOwnPropertyNames(data).forEach((item) => {
          if (data[item] === '') {
            const error = {message: '未全部填写完成'}
            throw error
          }
        })
        this.$axios({
          method: 'post',
          url: '/students',
          params: {
            stuName: data.userName,
            id: data.userId,
            age: data.userAge,
            sex: data.userSex,
            class: data.userClass,
            address: data.userAddress,
            department: data.userMajor
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    // 添加新教师的信息
    submitUserInfo () {
      try {
        let data = {
          userName: this.userData.userName,
          userId: this.userData.userId,
          userAge: this.userData.userAge,
          userSex: this.userData.userSex,
          userAddress: this.userData.userAddress,
          userMajor: this.userData.userMajor,
          userDepartment: this.userData.userDepartment,
          userTitle: this.userData.userTitle
        }
        Object.getOwnPropertyNames(data).forEach((item) => {
          if (data[item] === '') {
            const error = {message: '未全部填写完成'}
            throw error
          }
        })
        this.$axios({
          method: 'post',
          url: '/users',
          params: {
            teaName: this.userData.userName,
            id: this.userData.userId,
            age: this.userData.userAge,
            sex: this.userData.userSex,
            address: this.userData.userAddress,
            department: this.userData.userDepartment,
            major: this.userData.userMajor,
            title: this.userData.userTitle
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    // 修改学生信息
    updateStuInfo (scope) {
      try {
        let data = scope.row
        this.$axios({
          method: 'put',
          url: '/students',
          params: {
            id: data.userId,
            stuName: data.userName,
            department: data.userMajor,
            age: data.userAge,
            sex: data.userSex,
            class: data.userClass,
            address: data.userAddress
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    // 修改教师信息
    updateUserInfo (scope) {
      let data = scope.row
      try {
        this.$axios({
          method: 'put',
          url: '/users',
          params: {
            id: data.userId,
            teaName: data.userName,
            department: data.userDepartment,
            major: data.userMajor,
            age: data.userAge,
            sex: data.userSex,
            address: data.userAddress,
            title: data.userTitle
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    // 删除教师信息
    deleteUserInfo (row) {
      this.$confirm('您确认将要删除此条信息？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: '/users',
          params: {
            id: row.userId
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
    // 删除学生信息
    deleteStuInfo (row) {
      this.$confirm('您确认将要删除此条信息？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: '/students',
          params: {
            id: row.userId
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
    // 根据用户的身份查询
    getInfoByIdentity () {
      if (this.userData.identity !== '学生') {
        this.isAllUser = true
        this.isAllSelect = false
        this.$axios({
          method: 'get', url: '/users', params: {title: this.userData.identity}
        }).then(res => {
          if (res.data) {
            let data = res.data.users
            let _this = this
            _this.tableData = []
            data.forEach((item) => {
              if (item.major === 'undefine') {
                item.major = '无'
              }
              let teaInfo = {
                userName: item.teaName,
                userId: item.id,
                userAge: item.age,
                userSex: item.sex,
                userTitle: item.title,
                userMajor: item.major,
                userDepartment: item.department,
                userAddress: item.address
              }
              _this.tableData.push(teaInfo)
            })
          }
          this.loading = false
        })
      } else {
        this.isAllStu = true
        this.isAllSelect = false
        this.$axios({
          method: 'get', url: '/students'
        }).then(res => {
          if (res.data) {
            let data = res.data.students
            let _this = this
            _this.tableData = []
            data.forEach((item) => {
              let stuInfo = {
                userName: item.stuName,
                userId: item.id,
                userAge: item.age,
                userSex: item.sex,
                userClass: item.class,
                userAddress: item.address,
                userMajor: item.department
              }
              _this.tableData.push(stuInfo)
            })
          }
          this.loading = false
        })
      }
    },
    // 根据用户的身份和姓名查询
    getInfoByName () {
      if (this.userData.identity !== '学生') {
        this.isAllUser = true
        this.isAllSelect = false
        this.$axios({
          method: 'get', url: '/users', params: {userName: this.userData.userName}
        }).then(res => {
          if (res.data) {
            let data = res.data.users
            console.log(data)
            let _this = this
            _this.tableData = []
            data.forEach((item) => {
              let teaInfo = {
                userName: item.teaName,
                userId: item.id,
                userAge: item.age,
                userSex: item.sex,
                userTitle: item.title,
                userMajor: item.major,
                userDepartment: item.department,
                userAddress: item.address
              }
              _this.tableData.push(teaInfo)
            })
          }
          this.loading = false
        })
      } else {
        this.isAllStu = true
        this.isAllSelect = false
        this.$axios({
          method: 'get', url: '/students', params: {userName: this.userData.userName}
        }).then(res => {
          console.log(res)
          if (res.data) {
            let data = res.data.students
            console.log(data)
            let _this = this
            _this.tableData = []
            data.forEach((item) => {
              let stuInfo = {
                userName: item.stuName,
                userId: item.id,
                userAge: item.age,
                userSex: item.sex,
                userClass: item.class,
                userAddress: item.address,
                userMajor: item.department
              }
              _this.tableData.push(stuInfo)
            })
          }
          this.loading = false
        })
      }
    },
    // 根据用户的身份和编号查询
    getInfoById () {
      if (this.userData.identity !== '学生') {
        this.isAllUser = true
        this.isAllSelect = false
        this.$axios({
          method: 'get', url: '/users' + '/' + this.userData.userId
        }).then(res => {
          if (res.data) {
            let data = res.data.user
            console.log(data)
            let _this = this
            _this.tableData = []
            let teaInfo = {
              userName: data.teaName,
              userId: data.id,
              userAge: data.age,
              userSex: data.sex,
              userTitle: data.title,
              userMajor: data.major,
              userDepartment: data.department,
              userAddress: data.address
            }
            _this.tableData.push(teaInfo)
          }
          this.loading = false
        })
      } else {
        this.isAllStu = true
        this.isAllSelect = false
        this.$axios({
          method: 'get', url: '/students' + '/' + this.userData.userId
        }).then(res => {
          if (res.data) {
            let data = res.data.student
            console.log(data)
            let _this = this
            _this.tableData = []
            let stuInfo = {
              userName: data.stuName,
              userId: data.id,
              userAge: data.age,
              userSex: data.sex,
              userClass: data.class,
              userAddress: data.address,
              userMajor: data.department
            }
            _this.tableData.push(stuInfo)
          }
          this.loading = false
        })
      }
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
        .bottomFonts
          position : absolute
          line-height : 500px
          left: 40%
          color : #DCDDE0
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
