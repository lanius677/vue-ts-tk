import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    meta?: {
      menu: boolean,
      title?: string,
      icon?: string,
      auth?: boolean
    }
  }
}

//引入页面
const Login=()=>import ('@/views/Login/Login.vue')
const Apply=()=>import ('@/views/Apply/Apply.vue')
const Check=()=>import ('@/views/Check/Check.vue')
const Home=()=>import ('@/views/Home/Home.vue')
const Sign=()=>import ('@/views/Sign/Sign.vue')
const Exception=()=>import ('@/views/Exception/Exception.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'home',
    component:Home,
    meta:{
      menu: true,
      title:'考勤管理',
      icon:'Document-Copy',
      auth:true
    },
    // 二级路由
    children:[
      {
        path:'sign',
        name:'sign',
        component:Sign,
        meta:{
          menu: true,
          title:'在线打卡签到',
          icon:'Calendar',
          auth:true
        },
      },
      {
        path:'exception',
        name:'exception',
        component:Exception,
        meta:{
          menu: true,
          title:'异常考勤查询',
          icon:'warning',
          auth:true
        },
      },
      {
        path:'apply',
        name:'apply',
        component:Apply,
        meta:{
          menu: true,
          title:'添加考勤审批',
          icon:'warning',
          auth:true
        },
      },
      {
        path:'check',
        name:'check',
        component:Check,
        meta:{
          menu: true,
          title:'我的考勤审批',
          icon:'finished',
          auth:true
        },
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router