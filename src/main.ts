import '@/assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { isMobile } from '@/utils/tools'

import App from './App.vue'
import router from './router'

// Element引入组件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus);

app.provide('isMobile', isMobile())
app.mount('#app')
