import { createApp } from 'vue'
// 引入公共样式
import '@/styles/reset.scss'
// 引入动画
import '@/styles/transition.scss'
// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/elReset.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入路由
import router from './router'
// 引入请求拦截配置
import '@/api/interceptor'
// 引入mock
import './mock'
// 引入全局变量
import store from './store'
import App from './App.vue'

const app = createApp(App)
// eslint-disable-next-line no-restricted-syntax
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
