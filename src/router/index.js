import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import PersonalInfo from '../views/PersonalInfo.vue'
import CreationSpaceHomePage from '../views/CreationSpaceHomePage.vue'
import CreationSpaceWriteBlog from '../views/CreationSpaceWriteBlog.vue'
import Login from '../views/Login.vue'
import Regist from '../views/Regist.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist,
    meta: { title: '注册' }
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    component: PersonalInfo,
    meta: { title: '个人中心' }
  },
  {
    path: '/creationSpace',
    name: 'creationSpace',
    component: CreationSpaceHomePage,
    meta: { title: '创作中心' }
  },
  {
    path: '/creationSpaceNew',
    name: 'newBlog',
    component: CreationSpaceWriteBlog,
    meta: { title: '创作中心' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
