<template>
  <div>
    <div class='Center'>
      <div class='head'>
        <p class='headFonts'>课程管理中心</p>
        <p class="headOut" @click="backLogin()">注销</p>
        <p class='headMe' @click='backCollege()'>我的</p>
      </div>
      <div class='Left'>
        <div class='back'>
          <img src='../../../assets/img/back.png' class='backImg' @click='backHome()'/>
          <p class='backFonts' @click='backHome()'>返回首页</p>
        </div>
        <div class='inputBox'>
          <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>成绩百分比</p></button>
          <button class='investigation' @click='toRelation()'><p class='invesFonts'>毕业要求支撑</p></button>
          <button class='investigation' @click='toAims()'><p class='invesFonts'>课程目标</p></button>
        </div>
      </div>
      <div class='Right'>
        <div v-show="isAims"><AimsManage></AimsManage></div>
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
              <el-button size='mini' class="addButton" @click='addCourse()'>添加课程</el-button>
            </div>
            <el-table :data="tableData" border max-height="500" class="infoTable">
              <el-table-column prop="courseName" label="课程名称" align="center"></el-table-column>
              <el-table-column prop="courseId" label="课程编号" align="center"></el-table-column>
              <el-table-column prop="courseCredit" label="学分" align="center"></el-table-column>
              <el-table-column prop="courseHour" label="学时" align="center"></el-table-column>
              <el-table-column prop="address" label="成绩组成"  align="center">
                <el-table-column prop="quantity" label="定量"  align="center">
                  <el-table-column prop="midTerm" label="期中试卷" align="center"></el-table-column>
                  <el-table-column prop="finalExam" label="期末试卷" align="center"></el-table-column>
                  <el-table-column prop="work" label="作业" align="center"></el-table-column>
                  <el-table-column prop="experiment" label="实验" align="center"></el-table-column>
                  <el-table-column prop="test" label="随堂检验" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="quality" label="定性"  align="center">
                  <el-table-column prop="teaEvaluate" label="教师评价" align="center"></el-table-column>
                  <el-table-column prop="stuEvaluate" label="学生自我评价" align="center"></el-table-column>
                </el-table-column>
              </el-table-column>
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
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='formData' size='mini'>
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
                </el-form>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='courseData' size='mini'>
                  <el-form-item label='课程名称' prop='courseName'>
                    <el-input v-model='courseData.courseName' placeholder='请输入新的课程名称'></el-input>
                  </el-form-item>
                  <el-form-item label='课程编号' prop='courseId'>
                    <el-input v-model='courseData.courseId' placeholder='请输入课程编号'></el-input>
                  </el-form-item>
                  <el-form-item label='实验占比' prop='experiment'>
                    <el-input v-model='courseData.experiment' placeholder='请输入实验占比'></el-input>
                  </el-form-item>
                  <el-form-item label='作业占比' prop='work'>
                    <el-input v-model='courseData.work' placeholder='请输入作业占比'></el-input>
                  </el-form-item>
                  <el-form-item label='教师评价占比' prop='teaEvaluate'>
                    <el-input v-model='courseData.teaEvaluate' placeholder='请输入教师评价占比'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='courseData' size='mini'>
                  <el-form-item label='学分' prop='courseCredit'>
                    <el-input v-model='courseData.courseCredit' placeholder='请输入新的课程学分'></el-input>
                  </el-form-item>
                  <el-form-item label='学时' prop='courseHour'>
                    <el-input v-model='courseData.courseHour' placeholder='请输入课程学时'></el-input>
                  </el-form-item>
                  <el-form-item label='随堂检测占比' prop='test'>
                    <el-input v-model='courseData.test' placeholder='请输入随堂检测占比'></el-input>
                  </el-form-item>
                  <el-form-item label='期中考试占比' prop='midTerm'>
                    <el-input v-model='courseData.midTerm' placeholder='请输入期中考试占比'></el-input>
                  </el-form-item>
                  <el-form-item label='期末考试占比' prop='finalExam'>
                    <el-input v-model='courseData.finalExam' placeholder='请输入期末考试占比'></el-input>
                  </el-form-item>
                  <el-form-item label='学生评价占比' prop='stuEvaluate'>
                    <el-input v-model='courseData.stuEvaluate' placeholder='请输入学生评价占比'></el-input>
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
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item label='课程名称'>
                    <el-tag class="tag">{{ courseData.courseName }}</el-tag>
                  </el-form-item>
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
                  <el-form-item label='随堂检测占比' prop='test'>
                    <el-input v-model='courseData.test' placeholder='请输入随堂检测占比'></el-input>
                  </el-form-item>
                  <el-form-item label='实验占比' prop='experiment'>
                    <el-input v-model='courseData.experiment' placeholder='请输入实验占比'></el-input>
                  </el-form-item>
                  <el-form-item label='作业占比' prop='work'>
                    <el-input v-model='courseData.work' placeholder='请输入作业占比'></el-input>
                  </el-form-item>
                  <el-form-item label='教师评价占比' prop='teaEvaluate'>
                    <el-input v-model='courseData.teaEvaluate' placeholder='请输入教师评价占比'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='courseData' size='mini'>
                  <el-form-item label='课程编号'>
                    <el-tag class="tag">{{ courseData.courseId }}</el-tag>
                  </el-form-item>
                  <el-form-item label='学分' prop='teaEvaluate'>
                    <el-input v-model='courseData.courseCredit' placeholder='请输入课程学分'></el-input>
                  </el-form-item>
                  <el-form-item label='学时' prop='teaEvaluate'>
                    <el-input v-model='courseData.courseHour' placeholder='请输入课程学时'></el-input>
                  </el-form-item>
                  <el-form-item label='期中考试占比' prop='midTerm'>
                    <el-input v-model='courseData.midTerm' placeholder='请输入期中考试占比'></el-input>
                  </el-form-item>
                  <el-form-item label='期末考试占比' prop='finalExam'>
                    <el-input v-model='courseData.finalExam' placeholder='请输入期末考试占比'></el-input>
                  </el-form-item>
                  <el-form-item label='学生评价占比' prop='stuEvaluate'>
                    <el-input v-model='courseData.stuEvaluate' placeholder='请输入学生评价占比'></el-input>
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
              <el-button size='mini' class="addButton" @click='addCourse()'>添加课程</el-button>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border max-height="420" class="infoTable">
              <el-table-column prop="courseName" label="课程名称" align="center"></el-table-column>
              <el-table-column prop="courseId" label="课程编号" align="center"></el-table-column>
              <el-table-column prop="courseCredit" label="学分" align="center"></el-table-column>
              <el-table-column prop="courseHour" label="学时" align="center"></el-table-column>
              <el-table-column prop="address" label="成绩组成"  align="center">
                <el-table-column prop="quantity" label="定量"  align="center">
                  <el-table-column prop="midTerm" label="期中试卷" align="center"></el-table-column>
                  <el-table-column prop="finalExam" label="期末试卷" align="center"></el-table-column>
                  <el-table-column prop="work" label="作业" align="center"></el-table-column>
                  <el-table-column prop="experiment" label="实验" align="center"></el-table-column>
                  <el-table-column prop="test" label="随堂检验" align="center"></el-table-column>
                </el-table-column>
                <el-table-column prop="quality" label="定性" align="center">
                  <el-table-column prop="teaEvaluate" label="教师评价" align="center"></el-table-column>
                  <el-table-column prop="stuEvaluate" label="学生自我评价" align="center"></el-table-column>
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
        <div v-show='isRelation' class='MyInfo'>
          <div v-show='isRSelect' class='basicInfo'>
            <el-form :label-position='labelPosition' label-width='80px' :rules='rules' size='mini'>
              <el-form-item label='课程名称'>
                <el-select v-model='selectedCourseName' placeholder='请选择课程名称'>
                  <el-option
                    v-for="item in relationData"
                    :key="item.value"
                    :label="item.courseName"
                    :value="item.courseName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-position='right' label-width='80px'>
                <el-button size='mini' @click='getCourseInfo()'>查询</el-button>
                <el-button size='mini' @click='getAllRelation()' style="margin-left: 49px;">查询所有</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-show='isRInfo' class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
              <el-button size='mini' class="addButton" @click='addRelation()'>添加支撑</el-button>
            </div>
            <el-table :data="tableData" border max-height="420" class="infoTable">
              <el-table-column label="课程名称" align="center" width="170px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入课程名称" v-if="scope.row.isClick" v-model="tableData[scope.$index].courseName"></el-input>
                  <span v-else>{{ tableData[scope.$index].courseName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="毕业要求" align="center" width="150px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入毕业要求" v-if="scope.row.isClick" v-model="tableData[scope.$index].graduRequirement"></el-input>
                  <span v-else>{{ tableData[scope.$index].graduRequirement }}</span>
                </template>
              </el-table-column>
              <el-table-column label="毕业要求指标点" align="center" width="360px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入毕业要求指标点" v-if="scope.row.isClick" v-model="tableData[scope.$index].graduationPoint"></el-input>
                  <span v-else>{{ tableData[scope.$index].graduationPoint }}</span>
                </template>
              </el-table-column>
              <el-table-column label="课程目标" align="center" width="140px">
                <template slot-scope="scope">
                  <el-input placeholder="请输入课程目标" v-if="scope.row.isClick" v-model="tableData[scope.$index].aim"></el-input>
                  <span v-else>{{ tableData[scope.$index].aim }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="160px" align='center'>
                <template slot-scope="scope">
                  <el-button @click="change(scope)" type="text" size="small">编辑</el-button>
                  <el-button @click="save(scope)" size='small' type='text'><p>保存</p></el-button>
                  <el-button @click="deleteRInfo(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="isRAdd" class="allInfo">
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
                  <el-form-item label='毕业要求' prop='graduRequirement'>
                    <el-input v-model='courseData.graduRequirement' placeholder='请输入毕业要求'></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='130px' :rules='rules' :model='courseData' size='mini'>
                  <el-form-item label='毕业要求指标点' prop='graduationPoint'>
                    <el-input v-model='courseData.graduationPoint' placeholder='请输入毕业要求指标点'></el-input>
                  </el-form-item>
                  <el-form-item label='课程目标' prop='aim'>
                    <el-input v-model='courseData.aim' placeholder='请输入课程目标'></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='submitRAddInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AimsManage from './AimsManage'
export default {
  name: 'CurriculumManage',
  inject: ['reload'],
  components: {
    AimsManage
  },
  data () {
    return {
      isActive: true,
      isAims: false,
      isMyInfo: false,
      isRelation: false,
      isRSelect: false,
      isRInfo: false,
      isRAdd: false,
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
        graduationPoint: [
          { required: true, message: '请输入毕业指标点', trigger: 'blur' }
        ],
        graduRequirement: [
          { required: true, message: '请输入毕业要求', trigger: 'blur' }
        ],
        aim: [
          { required: true, message: '请输入课程目标', trigger: 'blur' }
        ],
        term: [
          { required: true, message: '请选择课程学期', trigger: 'blur' }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        teaId: [
          { required: true, message: '请输入教师编号', trigger: 'blur' }
        ],
        courseId: [
          { required: true, message: '请输入课程编号', trigger: 'blur' }
        ],
        courseCredit: [
          { required: true, message: '请输入课程学分', trigger: 'blur' }
        ],
        courseHour: [
          { required: true, message: '请输入课程学时', trigger: 'blur' }
        ],
        midTerm: [
          { required: true, message: '请输入期中考试评价占比', trigger: 'blur' }
        ],
        finalExam: [
          { required: true, message: '请输入期末考试评价占比', trigger: 'blur' }
        ],
        work: [
          { required: true, message: '请输入作业评价占比', trigger: 'blur' }
        ],
        experiment: [
          { required: true, message: '请输入实验评价占比', trigger: 'blur' }
        ],
        test: [
          { required: true, message: '请输入随堂测验评价占比', trigger: 'blur' }
        ],
        teaEvaluate: [
          { required: true, message: '请输入教师评价占比', trigger: 'blur' }
        ],
        stuEvaluate: [
          { required: true, message: '请输入学生评价占比', trigger: 'blur' }
        ]
      },
      courseData: {
        courseName: '',
        courseId: '',
        courseCredit: '',
        courseHour: '',
        teaId: '',
        midTerm: '',
        finalExam: '',
        work: '',
        test: '',
        experiment: '',
        teaEvaluate: '',
        stuEvaluate: '',
        graduationPoint: '',
        graduRequirement: '',
        aim: ''
      },
      tableData: [],
      relationData: [],
      relationInfo: [],
      alterInfo: [],
      selectedCourseName: '',
      lastClick: null
    }
  },
  created () {
    let _this = this
    this.$axios({
      method: 'get', url: '/relations'
    }).then(res => {
      const data = res.data.relations
      _this.relationInfo = data
      var obj = {}
      data.forEach(item => {
        if (!obj[item.courseName]) {
          obj[item.courseName] = 1
          _this.relationData.push({courseName: item.courseName})
        }
      })
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
    toAims () {
      this.isAims = true
      this.offInfos()
      this.offRelations()
      this.isActive = false
    },
    offInfos () {
      this.isMyInfo = false
      this.isSelect = false
      this.isAdd = false
      this.isAlter = false
      this.isOne = false
      this.isAll = false
    },
    offRelations () {
      this.isRelation = false
      this.isRSelect = false
      this.isRInfo = false
      this.isRAdd = false
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isSelect = true
      this.isAdd = false
      this.isAlter = false
      this.isAll = false
      this.isOne = false
      this.isActive = false
      this.offRelations()
      this.isAims = false
      this.clear()
    },
    toRelation () {
      this.isRelation = true
      this.isRSelect = true
      this.isRInfo = false
      this.isRAdd = false
      this.offInfos()
      this.isAims = false
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
        this.isRAdd = false
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
    change (scope) {
      // 再次点击则还原其他行
      if (this.lastClick) {
        this.$set(this.lastClick.row, 'isClick', false)
      }
      // 第一次点击，变成显示
      this.lastClick = scope
      this.$set(scope.row, 'isClick', true)
    },
    // 保存学生成绩信息
    save (scope) {
      // 再次点击则还原其他行
      if (this.lastClick) {
        this.$set(this.lastClick.row, 'isClick', false)
      }
      // 第一次点击，变成隐藏
      this.lastClick = scope
      this.$set(scope.row, 'isClick', false)
      this.setRelationInfo(scope)
    },
    // 修改联系信息
    setRelationInfo (scope) {
      let data = scope.row
      this.$axios({
        method: 'put', url: '/relations', params: { data: JSON.stringify(data) }
      })
    },
    // 打开添加支撑页面
    addRelation () {
      this.isRAdd = true
      this.isRInfo = false
    },
    // 打开添加课程信息页面
    addCourse () {
      this.isAdd = true
      this.isAlter = false
      this.isOne = false
      this.isAll = false
      this.isSelect = false
    },
    // 添加课程信息
    submitAddInfo () {
      try {
        let data = {
          term: this.formData.term,
          courseName: this.courseData.courseName,
          courseId: this.courseData.courseId,
          midTerm: this.courseData.midTerm,
          finalExam: this.courseData.finalExam,
          work: this.courseData.work,
          experiment: this.courseData.experiment,
          test: this.courseData.test,
          teaEvaluate: this.courseData.teaEvaluate,
          stuEvaluate: this.courseData.stuEvaluate
        }
        Object.getOwnPropertyNames(data).forEach((item) => {
          if (data[item] === '') {
            const error = {message: '未全部填写完成'}
            throw error
          }
        })
        this.$axios({
          method: 'post',
          url: '/courses',
          params: {
            term: this.formData.term,
            courseName: this.courseData.courseName,
            courseId: this.courseData.courseId,
            courseCredit: this.courseData.courseCredit,
            courseHour: this.courseData.courseHour,
            midTerm: this.courseData.midTerm,
            finalExam: this.courseData.finalExam,
            work: this.courseData.work,
            experiment: this.courseData.experiment,
            test: this.courseData.test,
            teaEvaluate: this.courseData.teaEvaluate,
            stuEvaluate: this.courseData.stuEvaluate
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    // 修改课程信息
    submit () {
      try {
        let data = {
          term: this.formData.term,
          courseName: this.courseData.courseName,
          courseId: this.courseData.courseId,
          courseCredit: this.courseData.courseCredit,
          courseHour: this.courseData.courseHour,
          midTerm: this.courseData.midTerm,
          finalExam: this.courseData.finalExam,
          work: this.courseData.work,
          experiment: this.courseData.experiment,
          test: this.courseData.test,
          teaEvaluate: this.courseData.teaEvaluate,
          stuEvaluate: this.courseData.stuEvaluate
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
            term: this.formData.term,
            courseName: this.courseData.courseName,
            courseId: this.courseData.courseId,
            courseCredit: this.courseData.courseCredit,
            courseHour: this.courseData.courseHour,
            midTerm: this.courseData.midTerm,
            finalExam: this.courseData.finalExam,
            work: this.courseData.work,
            experiment: this.courseData.experiment,
            test: this.courseData.test,
            teaEvaluate: this.courseData.teaEvaluate,
            stuEvaluate: this.courseData.stuEvaluate
          }
        }).then(res => {})
        this.$message.success('提交成功')
      } catch (e) {
        console.log(e)
        this.$message.error('请确认您是否全部正确填写完成')
      }
    },
    // 打开修改课程信息界面
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
          url: '/courses',
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
    // 删除联系信息
    deleteRInfo (row) {
      this.$confirm('您确认将要删除此条课程信息？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: '/relations',
          params: {
            id: row.id
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
    // 添加毕业要求联系信息
    submitRAddInfo () {
      console.log(this.courseData)
      try {
        this.$axios({
          method: 'post', url: '/relations', params: { data: JSON.stringify(this.courseData) }
        }).then(res => {
          this.$message.success('添加成功！')
        })
      } catch (e) {
        console.log(e)
      }
    },
    // 查询所有联系信息
    getAllRelation () {
      this.clear()
      this.isRInfo = true
      this.isRSelect = false
      let _this = this
      this.relationInfo.forEach(item => {
        _this.tableData.push(item)
      })
    },
    // 查询某课程的联系信息
    getCourseInfo () {
      this.clear()
      this.isRInfo = true
      this.isRSelect = false
      if (this.courseData.courseName === '') {
        this.$message.warning('请选择课程名称')
      } else {
        let _this = this
        this.relationInfo.forEach(item => {
          if (item.courseName === this.selectedCourseName) {
            _this.tableData.push(item)
          }
        })
      }
    },
    // 查询某学期的课程信息
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
      this.$axios({
        method: 'get', url: '/courses', params: {term: this.formData.term}
      }).then(res => {
        if (res.data) {
          let data = res.data.courses
          let _this = this
          data.forEach((item) => {
            let course = {
              courseName: item.courseName,
              teaId: item.userId,
              courseId: item.id,
              courseCredit: item.courseCredit,
              courseHour: item.courseHour,
              midTerm: item.midTerm,
              finalExam: item.finalExam,
              work: item.work,
              experiment: item.experiment,
              test: item.test,
              teaEvaluate: item.teaEvaluate,
              stuEvaluate: item.stuEvaluate
            }
            _this.tableData.push(course)
          })
        }
      })
    },
    // 查询所有学期的课程信息
    queryAll () {
      this.isAll = true
      this.isOne = false
      this.isAdd = false
      this.isSelect = false
      this.isAlter = false
      this.$axios.get('/courses').then(res => {
        if (res.data) {
          let data = res.data.courses
          let _this = this
          data.forEach((item) => {
            let course = {
              courseName: item.courseName,
              teaId: item.userId,
              courseId: item.id,
              courseCredit: item.courseCredit,
              courseHour: item.courseHour,
              midTerm: item.midTerm,
              finalExam: item.finalExam,
              work: item.work,
              experiment: item.experiment,
              test: item.test,
              teaEvaluate: item.teaEvaluate,
              stuEvaluate: item.stuEvaluate
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
