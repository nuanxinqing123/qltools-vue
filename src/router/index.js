import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import axios from "axios";
const routes = [{
		path: '/',
		name: 'Index',
		meta: {
			requireAuth: false,
			title: '首页'
		},
		component: () => import('../views/IndexView.vue'),
		beforeEnter: () => {
			axios.get("/v1/api/set/setting?key=webTitle").then((res) => {//将接口赋予的值给title
					console.log(res)
					window.document.title = res.data.data.value?res.data.data.value:"青龙Tools"
			})
		}
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			requireAuth: false,
			title: '管理员登录'
		},
		component: () => import('../views/SignView/LoginView'),
		beforeEnter: () => {
			window.document.title = "管理员登录"
		}
	},
	{
		path: '/register',
		name: 'register',
		meta: {
			requireAuth: false,
			title: '管理员注册'
		},
		component: () => import('../views/SignView/RegisterView'),
		beforeEnter: () => {
			window.document.title = "管理员注册"
		}
	},
	{
		path: '/admin',
		name: 'admin',
		meta: {
			requireAuth: true,
			title: '后台管理'
		},
		component: () => import('../views/Admin/AdminView'),
		beforeEnter: () => {
			window.document.title = "后台管理"
		}
	},
	{
		path: '/admin/env',
		name: 'adminEnv',
		meta: {
			requireAuth: true,
			title: '变量管理'
		},
		component: () => import('../views/Admin/AdminEnvView'),
		beforeEnter: () => {
			window.document.title = "变量管理"
		}
	},
	{
		path: '/admin/panel',
		name: 'adminPanel',
		meta: {
			requireAuth: true,
			title: '面板管理'
		},
		component: () => import('../views/Admin/AdminPanelView'),
		beforeEnter: () => {
			window.document.title = "面板管理"
		}
	},
	{
		path: '/admin/plugin',
		name: 'adminPlugin',
		meta: {
			requireAuth: true,
			title: '插件管理'
		},
		component: () => import('../views/Admin/AdminPluginView'),
		beforeEnter: () => {
			window.document.title = "插件管理"
		}
	},
	{
		path: '/admin/transfer',
		name: 'adminTransfer',
		meta: {
			requireAuth: true,
			title: '容器管理'
		},
		component: () => import('../views/Admin/AdminTransferView'),
		beforeEnter: () => {
			window.document.title = "容器管理"
		}
	},
	{
		path: '/admin/cdk',
		name: 'adminCD-KEY',
		meta: {
			requireAuth: true,
			title: 'CD-KEY管理'
		},
		component: () => import('../views/Admin/AdminAboutCDK'),
		beforeEnter: () => {
			window.document.title = "CD-KEY管理"
		}
	},
	{
		path: '/admin/message',
		name: 'adminMessage',
		meta: {
			requireAuth: true,
			title: '推送管理'
		},
		component: () => import('../views/Admin/AdminMsgView'),
		beforeEnter: () => {
			window.document.title = "推送管理"
		}
	},
	{
		path: '/admin/settings',
		name: 'adminSettings',
		meta: {
			requireAuth: true,
			title: '网站设置'
		},
		component: () => import('../views/Admin/AdminSettingsView'),
		beforeEnter: () => {
			window.document.title = "网站设置"
		}
	},
	{
		path: '/admin/about',
		name: 'adminAbout',
		meta: {
			requireAuth: true,
			title: '关于面板'
		},
		component: () => import('../views/Admin/AdminAboutView'),
		beforeEnter: () => {
			window.document.title = "关于面板"
		}
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => { //to进来是这个，from带来的值,next即将去的路由
	if (to.meta.requireAuth) {
		let Token = localStorage.getItem('Bearer')
		if (Token === null || Token === "") {
			router.push('login')
		} else {
			let TokenData = {
				"token": localStorage.getItem('Bearer')
			};
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
