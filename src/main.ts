import '@/assets/reset.scss'
import '@/assets/common.scss'
import '@/assets/iconfont.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 国际化语言
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
