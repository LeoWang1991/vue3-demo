import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(ElementPlus, { size: 'small', locale: zhCn })

import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', svgIcon)

import directive from '@/directive'
directive(app)

// 路由拦截
import './permission'

import ElSvgIcon from '@/components/ElSvgIcon.vue'
app.component('ElSvgIcon', ElSvgIcon)

import errorLog from '@/hooks/useErrorLog'
errorLog()

// 状态管理库 
import { createPinia } from 'pinia'
app.use(createPinia())
app.use(router).mount('#app')