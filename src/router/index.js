import { createRouter, createWebHashHistory } from 'vue-router'
import axios from "axios";

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: {
      requireAuth: false,
      title: '青龙Tools'
    },
    component: () => import('../views/IndexView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false,
      title: '管理员登录'
    },
    component: () => import('../views/SignView/LoginView')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      requireAuth: false,
      title: '管理员注册'
    },
    component: () => import('../views/SignView/RegisterView')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requireAuth: true,
      title: '后台管理'
    },
    component: () => import('../views/Admin/AdminView'),
  },
  {
    path: '/admin/env',
    name: 'adminEnv',
    meta: {
      requireAuth: true,
      title: '变量管理'
    },
    component: () => import('../views/Admin/AdminEnvView'),
  },
  {
    path: '/admin/panel',
    name: 'adminPanel',
    meta: {
      requireAuth: true,
      title: '面板管理'
    },
    component: () => import('../views/Admin/AdminPanelView'),
  },
  {
    path: '/admin/plugin',
    name: 'adminPlugin',
    meta: {
      requireAuth: true,
      title: '插件管理'
    },
    component: () => import('../views/Admin/AdminPluginView'),
  },
  {
    path: '/admin/transfer',
    name: 'adminTransfer',
    meta: {
      requireAuth: true,
      title: '容器管理'
    },
    component: () => import('../views/Admin/AdminTransferView'),
  },
  {
    path: '/admin/message',
    name: 'adminMessage',
    meta: {
      requireAuth: true,
      title: '推送管理'
    },
    component: () => import('../views/Admin/AdminMsgView'),
  },
  {
    path: '/admin/settings',
    name: 'adminSettings',
    meta: {
      requireAuth: true,
      title: '网站设置'
    },
    component: () => import('../views/Admin/AdminSettingsView'),
  },
  {
    path: '/admin/about',
    name: 'adminAbout',
    meta: {
      requireAuth: true,
      title: '关于面板'
    },
    component: () => import('../views/Admin/AdminAboutView'),
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    let Token = localStorage.getItem('Bearer')
    if (Token === null || Token === ""){
      router.push('login')
    } else {
      let TokenData = {"token": localStorage.getItem('Bearer')};
      // 检查Token是否有效
      axios.post("/v1/api/check/token", TokenData).then((res) => {
        if (res.data.data === true) {
          next()
        } else {
          // Token失效
          localStorage.clear()
          router.push('login')
        }
      })
    }
  } else {
    next()
  }
})

export default router
