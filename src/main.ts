import '@/assets/styles/reset.scss'
import '@/assets/styles/common.scss'
import '@/assets/styles/iconfont.scss'
// 图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 国际化语言
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import { createApp } from 'vue'
import App from './App.vue'

// 路由
import router from './router'

// Store
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.use(router)
app.mount('#app')
