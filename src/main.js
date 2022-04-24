import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import VueWechatTitle from 'vue-wechat-title'

axios.defaults.timeout = 5000       // 超时时长

process.env.NODE_ENV === 'production' ? axios.defaults.baseURL = "/" : axios.defaults.baseURL = "/url"
axios.defaults.headers.common['Authorization'] = "Bearer" + " " + localStorage.getItem("Bearer");

createApp(App)
    .use(store)
    .use(router)
    .use(VueWechatTitle)
    .mount('#app')
