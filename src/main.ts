import { createApp } from 'vue'
import './style.css'
// 引入路由
import router from './router'
// 引入请求拦截配置
import '@/api/interceptor'
// 引入mock
import './mock'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
