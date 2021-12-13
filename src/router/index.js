import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)
const Login = () => import('@/pages/login/Login.vue')
const CollegeLeader = () => import('@/pages/collegeLeader/CollegeLeader.vue')
const CollegePersonalCenter = () => import('@/pages/collegeLeader/components/PersonalCenter.vue')
const Evaluation = () => import('@/pages/collegeLeader/components/Evaluation.vue')
const Dean = () => import('@/pages/dean/Dean.vue')
const Inspector = () => import('@/pages/inspector/Inspector.vue')
const Secretary = () => import('@/pages/secretary/Secretary.vue')
const Teacher = () => import('@/pages/teacher/Teacher.vue')
const Curriculum = () => import('@/pages/teacher/components/Curriculum.vue')
const Student = () => import('@/pages/student/Student.vue')
const ScoreManage = () => import('@/pages/student/components/ScoreManage.vue')
const PersonalCenter = () => import('@/pages/student/components/PersonalCenter.vue')

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/collegeLeader',
      name: 'CollegeLeader',
      component: CollegeLeader
    },
    {
      path: '/collegePersonalCenter',
      name: 'CollegePersonalCenter',
      component: CollegePersonalCenter
    },
    {
      path: '/evaluation',
      name: 'Evaluation',
      component: Evaluation
    },
    {
      path: '/dean',
      name: 'Dean',
      component: Dean
    },
    {
      path: '/inspector',
      name: 'Inspector',
      component: Inspector
    },
    {
      path: '/secretary',
      name: 'Secretary',
      component: Secretary
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
    },
    {
      path: '/curriculum',
      name: 'Curriculum',
      component: Curriculum
    },
    {
      path: '/student',
      name: 'Student',
      component: Student
    },
    {
      path: '/scoreManage',
      name: 'ScoreManage',
      component: ScoreManage
    },
    {
      path: '/studentPersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === null || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
