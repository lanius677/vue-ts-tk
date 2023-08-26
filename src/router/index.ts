import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import _ from 'lodash';

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
const Login = () => import('@/views/Login/Login.vue')
const Apply = () => import('@/views/Apply/Apply.vue')
const Check = () => import('@/views/Check/Check.vue')
const Home = () => import('@/views/Home/Home.vue')
const Sign = () => import('@/views/Sign/Sign.vue')
const Exception = () => import('@/views/Exception/Exception.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      menu: true,
      title: '考勤管理',
      icon: 'Document-Copy',
      auth: true
    },
    // 二级路由
    children: [
      {
        path: 'sign',
        name: 'sign',
        component: Sign,
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'Calendar',
          auth: true
        },
      },
      {
        path: 'exception',
        name: 'exception',
        component: Exception,
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true
        },
      },
      {
        path: 'apply',
        name: 'apply',
        component: Apply,
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'warning',
          auth: true
        },
      },
      {
        path: 'check',
        name: 'check',
        component: Check,
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


// 路由守卫 
router.beforeEach((to, from, next) => {
  const store = useUsersStore()
  const { token, userInfos } = storeToRefs(store)
  // 判断是否有权限和用户信息
  console.log('userInfos',store.userInfos)
  if (to.meta.auth && _.isEmpty(userInfos.value)) {

    if (token.value) {
      // 发起用户信息请求
      store.userInfosAction().then((res) => {
        if (res.data.errcode === 0) {
          store.updateUserInfos(res.data.infos)
          next()
        }
      })

      // 如果token没有，跳转到登录页
    } else {  
      next('/login')
    }

  } else {
    // 如有token访问login，就跳转到home
    if (token.value && to.path === '/login') {
      next('/')
    } else {
      // 如果有token进入页面
      next()
    }
  }
})


export default router