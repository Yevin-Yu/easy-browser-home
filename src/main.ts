import "@/assets/css/main.css";

import { createApp, ref } from "vue";
import { createPinia } from "pinia";

import { isMobile } from "@/utils/tools";

import App from "./App.vue";
import router from "./router";

// Element引入组件
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

// 全局属性 是否是移动端
app.provide("isMobile", isMobile());

app.mount("#app");
