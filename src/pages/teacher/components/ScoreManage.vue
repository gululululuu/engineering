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
        <button class='investigation' @click='toUpWork()'><p class='invesFonts'>上传作业</p></button>
        <button class='investigation' @click='toUpExp()'><p class='invesFonts'>上传实验</p></button>
        <button class='investigation' @click='toUpTest()'><p class='invesFonts'>上传随堂</p></button>
        <button class='investigation' @click='toUpScore()'><p class='invesFonts'>上传成绩</p></button>
        <button class='investigation' @click='toMyInfo()'><p class='invesFonts'>导出试卷</p></button>
      </div>
    </div>
    <div class='Right'>
      <div v-show='isUpExam' class="MyInfo">
        <div v-show='isExamInfo'>
          <div class="examForm">
            <div class='half'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='examData' size='mini'>
                <el-form-item label='年级' prop='term'>
                  <el-select v-model='examData.term' placeholder='请选择考试年级'>
                    <el-option label='2018 级' value='2018 级'></el-option>
                    <el-option label='2019 级' value='2019 级'></el-option>
                    <el-option label='2020 级' value='2020 级'></el-option>
                    <el-option label='2021 级' value='2021 级'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='课程名称' prop='courseName'>
                  <el-select v-model='examData.courseName' placeholder='请选择要上传的科目'>
                    <el-option
                      v-for="item in courses"
                      :key='item.courseId'
                      :value="item.courseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class='anotherHalf'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='examData' size='mini'>
                <el-form-item label='题目数量' prop='number'>
                  <el-input v-model='examData.number' placeholder='请输入试卷的大题总数(>=1)'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size='mini' @click='getExamInfo()' style="width: 192px;">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-show='isExamDetails'>
          <div class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class="rightForm">
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
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
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
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
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :value="item.examScore"
                  >
                    <el-input placeholder='请输入该大题每小题的分数' v-model="item.examScore"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='setQuestionInfo()' style="width: 180px;">提交</el-button>
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
                    <el-input placeholder='请输入该目标下的考核占比' v-model="item.aimPosition"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='getAimInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class='rightIntroduce'>
              <p>****注意事项****</p>
              <p>1. 请将每个大题下的每小题的分数按题号顺序以 '/' 分隔填入~</p>
              <p>(例如,第一个大题共4个小题共20分：3/5/5/7)</p>
              <p>2. 请将每个该目标下的考核占比按随堂检测/作业/实验/试卷的顺序填入</p>
              <p>3. 考核占比格式如：随堂检测(0.1)/作业(0.1)/实验(0.1)/试卷(0.7)以</p>
              <p>0.1/0.1/0.1/0.7填入~</p>
            </div>
          </div>
        </div>
      </div>
      <div v-show='isUpWork' class="MyInfo">
        <div v-show='isWorkInfo'>
          <div class="examForm">
            <div class='half'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='workData' size='mini'>
                <el-form-item label='年级' prop='term'>
                  <el-select v-model='workData.term' placeholder='请选择考试年级'>
                    <el-option label='2018 级' value='2018 级'></el-option>
                    <el-option label='2019 级' value='2019 级'></el-option>
                    <el-option label='2020 级' value='2020 级'></el-option>
                    <el-option label='2021 级' value='2021 级'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='课程名称' prop='courseName'>
                  <el-select v-model='workData.courseName' placeholder='请选择要上传的科目'>
                    <el-option
                      v-for="item in courses"
                      :key='item.courseId'
                      :value="item.courseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class='anotherHalf'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='workData' size='mini'>
                <el-form-item label='作业次数' prop='number'>
                  <el-input v-model='workData.number' placeholder='请输入作业的总次数(>=1)'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size='mini' @click='getWorkInfo()' style="width: 180px;">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-show='isWorkDetails'>
          <div class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class="rightForm">
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :label="item.workName"
                    :value="item.workNum"
                  >
                    <el-input placeholder='请输入此作业考了哪些目标' v-model="item.workNum"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :value="item.workScore"
                  >
                    <el-input placeholder='请输入此作业下每个目标的满分' v-model="item.workScore"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='setWorkInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class='rightIntroduce'>
              <p>****注意事项****</p>
              <p>1. 请将每个作业考核的课程目标依次按格式输入</p>
              <p>2. 请将每个作业下每个目标的满分依次按格式输入</p>
              <p>3. 输入格式：</p>
              <p>若是目标一，则输入 1 ；</p>
              <p>若是多个目标，则用'/'分割开，如：目标一和目标三，则输入 1/3 即可~</p>
            </div>
          </div>
        </div>
      </div>
      <div v-show='isUpExp' class="MyInfo">
        <div v-show='isExpInfo'>
          <div class="examForm">
            <div class='half'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='expData' size='mini'>
                <el-form-item label='年级' prop='term'>
                  <el-select v-model='expData.term' placeholder='请选择考试年级'>
                    <el-option label='2018 级' value='2018 级'></el-option>
                    <el-option label='2019 级' value='2019 级'></el-option>
                    <el-option label='2020 级' value='2020 级'></el-option>
                    <el-option label='2021 级' value='2021 级'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='课程名称' prop='courseName'>
                  <el-select v-model='expData.courseName' placeholder='请选择要上传的科目'>
                    <el-option
                      v-for="item in courses"
                      :key='item.courseId'
                      :value="item.courseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class='anotherHalf'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='expData' size='mini'>
                <el-form-item label='实验次数' prop='number'>
                  <el-input v-model='expData.number' placeholder='请输入实验的总次数(>=1)'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size='mini' @click='getExpInfo()' style="width: 180px;">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-show='isExpDetails'>
          <div class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class="rightForm">
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :label="item.expName"
                    :value="item.expNum"
                  >
                    <el-input placeholder='请输入此实验考了哪些目标' v-model="item.expNum"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :value="item.expScore"
                  >
                    <el-input placeholder='请输入此实验下每个目标的满分' v-model="item.expScore"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='setExpInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class='rightIntroduce'>
              <p>****注意事项****</p>
              <p>1. 请将每个实验考核的课程目标依次按格式输入</p>
              <p>2. 请将每个实验下每个目标的满分依次按格式输入</p>
              <p>3. 输入格式：</p>
              <p>若是目标一，则输入 1 ；</p>
              <p>若是多个目标，则用'/'分割开，如：目标一和目标三，则输入 1/3 即可~</p>
            </div>
          </div>
        </div>
      </div>
      <div v-show='isUpTest' class="MyInfo">
        <div v-show='isTestInfo'>
          <div class="examForm">
            <div class='half'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='testData' size='mini'>
                <el-form-item label='年级' prop='term'>
                  <el-select v-model='testData.term' placeholder='请选择考试年级'>
                    <el-option label='2018 级' value='2018 级'></el-option>
                    <el-option label='2019 级' value='2019 级'></el-option>
                    <el-option label='2020 级' value='2020 级'></el-option>
                    <el-option label='2021 级' value='2021 级'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='课程名称' prop='courseName'>
                  <el-select v-model='testData.courseName' placeholder='请选择要上传的科目'>
                    <el-option
                      v-for="item in courses"
                      :key='item.courseId'
                      :value="item.courseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class='anotherHalf'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' :model='testData' size='mini'>
                <el-form-item label='随堂测验次数' prop='number'>
                  <el-input v-model='testData.number' placeholder='请输入随堂测验的总次数(>=1)'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size='mini' @click='getTestInfo()' style="width: 180px;">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div v-show='isTestDetails'>
          <div class="allInfo">
            <div class="backLastest">
              <img src='../../../assets/img/back.png' class='backImg' @click='back()'/>
              <p class='backFonts' @click='back()'>返回上一层</p>
            </div>
            <div class="rightForm">
              <div class='half'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :label="item.testName"
                    :value="item.testNum"
                  >
                    <el-input placeholder='请输入此测验考了哪些目标' v-model="item.testNum"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='anotherHalf'>
                <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                  <el-form-item
                    v-for="item in list"
                    :key="item.value"
                    :value="item.testScore"
                  >
                    <el-input placeholder='请输入此测验下每个目标的满分' v-model="item.testScore"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size='mini' @click='setTestInfo()' style="width: 180px;">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class='rightIntroduce'>
              <p>****注意事项****</p>
              <p>1. 请将每个测验考核的课程目标依次按格式输入</p>
              <p>2. 请将每个测验下每个目标的满分依次按格式输入</p>
              <p>3. 输入格式：</p>
              <p>若是目标一，则输入 1 ；</p>
              <p>若是多个目标，则用'/'分割开，如：目标一和目标三，则输入 1/3 即可~</p>
            </div>
          </div>
        </div>
      </div>
      <div v-show='isUpScore' class='MyInfo'>
        <div v-show='isUpSelect' class="basicInfo">
          <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
            <el-form-item label='科目' prop='selectName'>
              <el-select v-model='selectName' placeholder='请选择要上传的科目'>
                <el-option
                  v-for="item in courses"
                  :key='item.courseId'
                  :value="item.courseName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size='mini' @click='getStudentInfo()' style="width: 180px;">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show='isUpInfo'>
          <div class='upInfo'>
            <el-form>
              <el-form-item label="课程名" prop='selectName'>
                <el-tag type="info">{{selectName}}</el-tag>
                <el-button @click='submitScore()' size='small' style="float: right; margin-top: 10px;">下一步</el-button>
              </el-form-item>
            </el-form>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" border max-height="420" class="infoTable">
              <el-table-column prop="stuName" label="学生姓名" align="center"></el-table-column>
              <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
              <el-table-column prop="midExam" label="期中成绩" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入期中成绩" v-if="scope.row.isClick" v-model="tableData[scope.$index].midExam"></el-input>
                  <span v-else>{{ tableData[scope.$index].midExam }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="exam" label="试卷成绩" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入试卷成绩" v-if="scope.row.isClick" v-model="tableData[scope.$index].exam"></el-input>
                  <span v-else>{{ tableData[scope.$index].exam }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="experiment" label="实验成绩" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入实验成绩" v-if="scope.row.isClick" v-model="tableData[scope.$index].experiment"></el-input>
                  <span v-else>{{ tableData[scope.$index].experiment }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="test" label="随堂检测成绩" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入随堂检测成绩" v-if="scope.row.isClick" v-model="tableData[scope.$index].test"></el-input>
                  <span v-else>{{ tableData[scope.$index].test }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="work" label="作业成绩" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入作业成绩" v-if="scope.row.isClick" v-model="tableData[scope.$index].work"></el-input>
                  <span v-else>{{ tableData[scope.$index].work }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="attach1" label="附加成绩1" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入随堂检测成绩" v-if="scope.row.isClick" v-model="tableData[scope.$index].attach1"></el-input>
                  <span v-else>{{ tableData[scope.$index].attach1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="attach2" label="附加成绩2" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入作业成绩" v-if="scope.row.isClick" v-model="tableData[scope.$index].attach2"></el-input>
                  <span v-else>{{ tableData[scope.$index].attach2 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="change(scope)" size='small' type='text'>编辑</el-button>
                  <el-button @click="save(scope)" size='small' type='text'>保存</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-show="isUpPercentage">
          <div class='rightForm'>
            <div class='half'>
              <el-form :label-position='labelPosition' label-width='110px' :rules='rules' size='mini'>
                <el-form-item label='期中考试'>
                  <el-input v-model='percentageData.midExam' placeholder='请输入期中考试占比'></el-input>
                </el-form-item>
                <el-form-item label='期末考试'>
                  <el-input v-model='percentageData.exam' placeholder='请输入期末考试占比'></el-input>
                </el-form-item>
                <el-form-item label='附加成绩1'>
                  <el-input v-model='percentageData.attach1' placeholder='请输入附加成绩1占比'></el-input>
                </el-form-item>
                <el-form-item label='附加成绩2'>
                  <el-input v-model='percentageData.attach2' placeholder='请输入附加成绩2占比'></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class='anotherHalf'>
              <el-form :label-position='labelPosition' label-width='110px' size='mini'>
                <el-form-item label='随堂测验'>
                  <el-input v-model='percentageData.test' placeholder='请输入随堂测验占比'></el-input>
                </el-form-item>
                <el-form-item label='作业'>
                  <el-input v-model='percentageData.work' placeholder='请输入作业占比'></el-input>
                </el-form-item>
                <el-form-item label='实验'>
                  <el-input v-model='percentageData.exp' placeholder='请输入实验占比'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size='mini' @click='upload()' style="width: 180px;">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <div v-show='isMyInfo' class='MyInfo'>
        <ExportInvesAndScore></ExportInvesAndScore>
      </div>
      <p v-show='isActive' class='rightFonts'>请在左侧选择您要进行的操作~</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ExportInvesAndScore from './ExportInvesAndScore'
export default {
  name: 'ScoreManage',
  components: {
    ExportInvesAndScore
  },
  data () {
    return {
      isActive: true,
      isMyInfo: false,
      isUpExam: false,
      isUpScore: false,
      isUpInfo: false,
      isUpPercentage: false,
      isUpSelect: false,
      isExamInfo: false,
      isUpWork: false,
      isWorkInfo: false,
      isUpExp: false,
      isExpInfo: false,
      isUpTest: false,
      isTestInfo: false,
      isExamDetails: false,
      isExpDetails: false,
      isWorkDetails: false,
      isTestDetails: false,
      loading: true,
      labelPosition: 'right',
      examData: {
        term: '',
        courseName: '',
        number: '',
        courseId: '',
        totalAim: '',
        selectName: '',
        assessment: ''
      },
      workData: {
        term: '',
        courseName: '',
        number: ''
      },
      expData: {
        term: '',
        courseName: '',
        number: ''
      },
      testData: {
        term: '',
        courseName: '',
        number: ''
      },
      percentageData: {
        exam: '',
        midExam: '',
        test: '',
        work: '',
        exp: '',
        attach1: '',
        attach2: ''
      },
      rules: {
        term: [
          { required: true, message: '请选择上课日期', trigger: 'blur' }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入大题总数', trigger: 'blur' }
        ],
        courseId: [
          { required: true, message: '请输入课程学分', trigger: 'blur' }
        ],
        totalAim: [
          { required: true, message: '请输入课程目标的总数', trigger: 'blur' }
        ],
        selectName: [
          { required: true, message: '请选择要提交的科目', trigger: 'blur' }
        ],
        assessment: [
          { required: true, message: '请选择考核方式', trigger: 'blur' }
        ]
      },
      list: [{examName: '第1大题', examTotal: '', examNum: '', examScore: ''}],
      aims: [{aimName: '目标1', totalAim: '', aimNum: '', aimPosition: ''}],
      courses: [],
      tableData: [],
      lastClick: null,
      selectName: ''
    }
  },
  // 在数据库中查找当前教师教授的所有课程
  created () {
    var id = JSON.parse(localStorage.getItem('userId'))
    this.$axios({
      methods: 'get',
      url: '/tea_course',
      params: {teacherId: id}
    }).then(res => {
      const data = res.data.courses
      let _this = this
      data.forEach(item => {
        let course = {
          courseName: item.Course.courseName,
          courseId: item.Course.id
        }
        _this.courses.push(course)
      })
    })
  },
  mounted () {
    this.tableData.forEach(item => {
      this.$set(item, 'isClick', false)
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
    backStu () {
      this.$router.push('/teacher')
    },
    back () {
      if (this.isUpExam) {
        this.isExamInfo = true
        this.isExamDetails = false
      } else if (this.isUpWork) {
        this.isWorkInfo = true
        this.isWorkDetails = false
      } else if (this.isUpExp) {
        this.isExpInfo = true
        this.isExpDetails = false
      } else if (this.isUpTest) {
        this.isTestInfo = true
        this.isTestDetails = false
      }
      this.clear()
    },
    toUpExam () {
      this.isUpExam = true
      this.isExamInfo = true
      this.isUpScore = false
      this.isUpExp = false
      this.isUpWork = false
      this.isUpTest = false
      this.isExamDetails = false
      this.isMyInfo = false
      this.isActive = false
    },
    toUpWork () {
      this.isUpWork = true
      this.isWorkInfo = true
      this.isUpScore = false
      this.isUpExp = false
      this.isUpExam = false
      this.isUpTest = false
      this.isWorkDetails = false
      this.isMyInfo = false
      this.isActive = false
      this.clear()
    },
    toUpExp () {
      this.isUpExp = true
      this.isExpInfo = true
      this.isUpScore = false
      this.isUpWork = false
      this.isUpExam = false
      this.isUpTest = false
      this.isExpDetails = false
      this.isMyInfo = false
      this.isActive = false
      this.clear()
    },
    toUpTest () {
      this.isUpTest = true
      this.isTestInfo = true
      this.isUpScore = false
      this.isUpWork = false
      this.isUpExam = false
      this.isUpExp = false
      this.isTestDetails = false
      this.isMyInfo = false
      this.isActive = false
      this.clear()
    },
    toUpScore () {
      this.isUpScore = true
      this.isUpSelect = true
      this.isUpInfo = false
      this.isUpPercentage = false
      this.isMyInfo = false
      this.isUpExam = false
      this.isUpTest = false
      this.isUpExp = false
      this.isUpWork = false
      this.isActive = false
      this.clear()
    },
    submitScore () {
      this.isUpPercentage = true
      this.isUpInfo = false
    },
    toMyInfo () {
      this.isMyInfo = true
      this.isUpScore = false
      this.isUpExam = false
      this.isUpTest = false
      this.isUpExp = false
      this.isUpWork = false
      this.isActive = false
    },
    clear () {
      this.list = []
      this.aims = []
      this.tableData = []
      let _this = this
      Object.getOwnPropertyNames(this.workData).forEach((item) => {
        _this.workData[item] = ''
      })
      Object.getOwnPropertyNames(this.workData).forEach((item) => {
        _this.workData[item] = ''
      })
      Object.getOwnPropertyNames(this.expData).forEach((item) => {
        _this.expData[item] = ''
      })
      Object.getOwnPropertyNames(this.testData).forEach((item) => {
        _this.testData[item] = ''
      })
    },
    // 编辑学生成绩信息
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
      console.log(this.tableData)
    },
    // 上传学生成绩
    async upload () {
      let mid = this.percentageData.midExam
      let final = this.percentageData.exam
      let work = this.percentageData.work
      let exp = this.percentageData.exp
      let test = this.percentageData.test
      let attach1 = this.percentageData.attach1
      let attach2 = this.percentageData.attach2
      this.tableData.forEach(item => {
        let score = 0
        console.log(item.hasOwnProperty('midExam'))
        if (item.hasOwnProperty('midExam')) {
          score = score + mid * parseInt(item.midExam)
        }
        if (item.hasOwnProperty('exam')) {
          score = score + final * parseInt(item.exam)
        }
        if (item.hasOwnProperty('work')) {
          score = score + work * parseInt(item.work)
        }
        if (item.hasOwnProperty('experiment')) {
          score = score + exp * parseInt(item.experiment)
        }
        if (item.hasOwnProperty('test')) {
          score = score + test * parseInt(item.test)
        }
        if (item.hasOwnProperty('attach1')) {
          score = score + attach1 * parseInt(item.attach1)
        }
        if (item.hasOwnProperty('attach2')) {
          score = score + attach2 * parseInt(item.attach2)
        }
        item.score = score
      })
      await this.addStuCourseInfo()
      console.log(this.tableData)
    },
    addStuCourseInfo () {
      let courseId = ''
      this.courses.forEach(item => {
        if (item.courseName === this.selectName) {
          courseId = item.courseId
        }
      })
      try {
        this.$confirm('您确认要上传成绩？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$axios({
            method: 'delete',
            url: '/stu_course',
            params: {
              courseId: courseId
            }
          }).then(res => { console.log(res) })
          this.$axios({
            method: 'post',
            url: '/stu_course',
            params: {
              courseId: courseId,
              tableData: JSON.stringify(this.tableData)
            }
          })
          this.$message.success('上传成功')
        }).catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel' ? '放弃删除' : '停留在当前页面'
          })
        })
      } catch (e) {
        this.$message.error('提交出错，请联系管理员处理')
      }
    },
    getStudentInfo () {
      this.isUpInfo = true
      this.isUpSelect = false
      let courseId = ''
      this.courses.forEach(item => {
        if (item.courseName === this.selectName) {
          courseId = item.courseId
        }
      })
      this.$axios({
        method: 'get',
        url: '/tea_stu',
        params: {courseId: courseId}
      }).then(res => {
        const data = res.data.students
        let _this = this
        data.forEach(item => {
          let obj = {
            stuName: item.Student.stuName,
            stuId: item.Student.id
          }
          _this.tableData.push(obj)
        })
        this.loading = false
      })
    },
    // 获取教师选择的课程下的学生名单
    getUserInfo () {
      let courseId = ''
      this.courses.forEach(item => {
        if (item.courseName === this.examData.courseName) {
          courseId = item.courseId
        }
      })
      this.$axios({
        method: 'get',
        url: '/stu_course',
        params: {courseId: courseId}
      }).then(res => {
        const data = res.data.students
        console.log(data)
        localStorage.setItem('stuInfo', JSON.stringify(data))
      })
    },
    getExamInfo () {
      if (this.examData.number < 1) {
        this.$message.error('题目数量不能少于1个，请您重新输入')
        this.clear()
        return 0
      } else {
        this.isExamDetails = true
        this.isExamInfo = false
        this.list = []
        console.log(this.examData)
        if (this.list.length !== 0) {
          for (let i = 2; i < (parseInt(this.examData.number) + 1); i++) {
            this.list.push({examName: '第' + i + '大题', examTotal: '', examNum: '', examScore: ''})
          }
        } else {
          for (let i = 1; i <= (parseInt(this.examData.number)); i++) {
            this.list.push({examName: '第' + i + '大题', examTotal: '', examNum: '', examScore: ''})
          }
        }
        try {
          this.$axios({
            method: 'get', url: '/aims', params: { courseName: this.examData.courseName }
          }).then(res => {
            const data = res.data.aim
            let aimNum = parseInt(data.aimNumber)
            let _this = this
            _this.aims = []
            _this.examData.totalAim = aimNum
            if (this.aims.length !== 0) {
              for (let i = 2; i < (aimNum + 1); i++) {
                this.aims.push({aimName: '目标' + i, totalAim: '', aimNum: '', aimPosition: ''})
              }
            } else {
              for (let i = 1; i <= aimNum; i++) {
                this.aims.push({aimName: '目标' + i, totalAim: '', aimNum: '', aimPosition: ''})
              }
            }
          })
          this.getUserInfo()
        } catch (e) {
          this.$message.warning('请确认您输入的信息是否有误')
        }
      }
    },
    getWorkInfo () {
      if (this.workData.number < 1) {
        this.$message.error('作业的数量不能少于1个，请您重新输入')
        this.clear()
        return 0
      } else {
        this.isWorkDetails = true
        this.isWorkInfo = false
        console.log(this.workData)
        if (this.list.length !== 0) {
          for (let i = 2; i < (parseInt(this.workData.number) + 1); i++) {
            this.list.push({workName: '作业' + i, workNum: '', workScore: ''})
          }
        } else {
          for (let i = 1; i <= (parseInt(this.workData.number)); i++) {
            this.list.push({workName: '作业' + i, workNum: '', workScore: ''})
          }
        }
      }
    },
    getExpInfo () {
      if (this.expData.number < 1) {
        this.$message.error('实验的数量不能少于1个，请您重新输入')
        this.clear()
        return 0
      } else {
        this.isExpDetails = true
        this.isExpInfo = false
        console.log(this.expData)
        if (this.list.length !== 0) {
          for (let i = 2; i < (parseInt(this.expData.number) + 1); i++) {
            this.list.push({expName: '实验' + i, expNum: '', expScore: ''})
          }
        } else {
          for (let i = 1; i <= (parseInt(this.expData.number)); i++) {
            this.list.push({expName: '实验' + i, expNum: '', expScore: ''})
          }
        }
      }
    },
    getTestInfo () {
      if (this.testData.totalAim < 1 || this.testData.number < 1) {
        this.$message.error('随堂测验的数量都不能少于1个，请您重新输入')
        this.clear()
        return 0
      } else {
        this.isTestDetails = true
        this.isTestInfo = false
        console.log(this.testData)
        if (this.list.length !== 0) {
          for (let i = 2; i < (parseInt(this.testData.number) + 1); i++) {
            this.list.push({testName: '测验' + i, testNum: '', testScore: ''})
          }
        } else {
          for (let i = 1; i <= (parseInt(this.testData.number)); i++) {
            this.list.push({testName: '测验' + i, testNum: '', testScore: ''})
          }
        }
      }
    },
    setWorkInfo () {
      console.log(this.workData)
      // 每一小题的分数
      var result = []
      var scores = []
      for (let i = 0; i < this.list.length; i++) {
        var num = []
        var score = []
        num = this.list[i].workNum.split('/')
        score = this.list[i].workScore.split('/')
        result.push(num)
        scores.push(score)
      }
      var arr = []
      localStorage.setItem('work', JSON.stringify(arr))
      var test = JSON.parse(localStorage.getItem('work'))
      test.push(result)
      test.push(this.list)
      test.push(this.workData)
      test.push(scores)
      localStorage.setItem('work', JSON.stringify(test))
      console.log(JSON.parse(localStorage.getItem('work')))
      this.$message.success('提交成功')
    },
    setExpInfo () {
      console.log(this.expData)
      // 每一小题的分数
      var result = []
      var scores = []
      for (let i = 0; i < this.list.length; i++) {
        var num = []
        var score = []
        num = this.list[i].expNum.split('/')
        score = this.list[i].expScore.split('/')
        result.push(num)
        scores.push(score)
      }
      var arr = []
      localStorage.setItem('experiment', JSON.stringify(arr))
      var test = JSON.parse(localStorage.getItem('experiment'))
      test.push(result)
      test.push(this.list)
      test.push(this.expData)
      test.push(scores)
      localStorage.setItem('experiment', JSON.stringify(test))
      console.log(JSON.parse(localStorage.getItem('experiment')))
      this.$message.success('提交成功')
    },
    setTestInfo () {
      console.log(this.testData)
      // 每一小题的分数
      var result = []
      var scores = []
      for (let i = 0; i < this.list.length; i++) {
        var num = []
        var score = []
        num = this.list[i].testNum.split('/')
        score = this.list[i].testScore.split('/')
        result.push(num)
        scores.push(score)
      }
      var arr = []
      localStorage.setItem('test', JSON.stringify(arr))
      var test = JSON.parse(localStorage.getItem('test'))
      test.push(result)
      test.push(this.list)
      test.push(this.testData)
      test.push(scores)
      localStorage.setItem('test', JSON.stringify(test))
      console.log(JSON.parse(localStorage.getItem('test')))
      this.$message.success('提交成功')
    },
    async setQuestionInfo () {
      console.log(this.examData)
      // 每一小题的分数
      var result = []
      for (let i = 0; i < this.list.length; i++) {
        var s = []
        s = this.list[i].examScore.split('/')
        result.push(s)
      }
      var arr = []
      localStorage.setItem('question', JSON.stringify(arr))
      var test = JSON.parse(localStorage.getItem('question'))
      test.push(result)
      test.push(this.list)
      localStorage.setItem('question', JSON.stringify(test))
      console.log(JSON.parse(localStorage.getItem('question')))
      await this.setWeight()
      this.$message.success('提交成功')
    },
    getAimInfo () {
      console.log(this.examData)
      // 每一目标的分布
      var result = []
      for (let i = 0; i < this.aims.length; i++) {
        var s = []
        s = this.aims[i].aimPosition.split('/')
        result.push(s)
      }
      var arr = []
      localStorage.setItem('aim', JSON.stringify(arr))
      var test = JSON.parse(localStorage.getItem('aim'))
      test.push(result)
      test.push(this.aims)
      test.push(this.examData)
      localStorage.setItem('aim', JSON.stringify(test))
      console.log(JSON.parse(localStorage.getItem('aim')))
      this.$message.success('提交成功')
    },
    setWeight () {
      this.$axios({
        methods: 'get',
        url: '/courses',
        params: {courseName: this.examData.courseName}
      }).then(res => {
        console.log(res)
        const result = res.data.courses[0]
        this.examData.courseId = result.id
        console.log(this.examData)
        var weight = []
        weight.push(parseFloat((1 - result.stuEvaluate - result.teaEvaluate).toFixed(1)), result.stuEvaluate, result.teaEvaluate)
        localStorage.setItem('weight', JSON.stringify(weight))
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
        .rightIntroduce
          position : absolute
          right : 0
          display : inline
          width : 140px
          color : #DCDDE0
        .examForm
          position : absolute
          overflow : auto
          top : 10%
          left : 15%
          width : 800px
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
          height : 300px
          position : absolute
          left : 30%
          top : 10%
        .upInfo
          width : 900px
          position : absolute
          left : 10%
          top : 3%
      .rightFonts
        text-align : center
        line-height : 500px
        color : #DCDDE0
</style>
