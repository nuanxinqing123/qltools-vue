import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import VueWechatTitle from 'vue-wechat-title'
// highlight 的样式，依赖包，组件
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// highlight

axios.defaults.timeout = 5000       // 超时时长
axios.defaults.headers.common['Authorization'] = "Bearer" + " " + localStorage.getItem("Bearer");
process.env.NODE_ENV === 'production' ? axios.defaults.baseURL = "/" : axios.defaults.baseURL = "/url"

createApp(App)
    .use(store)
    .use(router)
    .use(VueWechatTitle)
    .use(hljsVuePlugin)
    .mount('#app')
