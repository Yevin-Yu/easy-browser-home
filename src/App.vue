<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";

if (!localStorage.length || (!localStorage.newsMenu && !localStorage.notesList && !localStorage.navMenu)) {
    fetch("localStorage.json")
        .then((response) => {
            // 检查响应状态，确保请求成功
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 解析JSON数据
            return response.json();
        })
        .then((data) => {
            // 遍历JSON对象的每个键值对并存储到localStorage
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    localStorage.setItem(key, data[key]);
                }
            }
            console.log("Data stored in localStorage");
        })
        .catch((error) => {
            // 处理错误
            console.error("Error fetching or parsing data:", error);
        });
}
// 判断是否是APP
function isMobile() {
    // 检查navigator.userAgent中是否包含特定的移动端关键字
    return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1 ||
        navigator.userAgent.indexOf("iPhone") !== -1 ||
        (navigator.userAgent.indexOf("Android") !== -1 && navigator.userAgent.indexOf("Mobile") !== -1)
    );
}
const isApp = ref(isMobile());
</script>

<template>
    <div v-if="isApp" class="is-app">
        当前导航页只支持PC端 <br />
        移动端正在加急设计中 <br />
        敬请期待~
    </div>
    <RouterView v-else />
</template>

<style>
#app {
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    background-color: var(--bgColor);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.is-app {
    margin: 20vh 10vw;
    width: 80vw;
    height: 50vh;
    padding: 20px;
    font-size: 20px;
    line-height: 42px;
    color: var(--fontColor);
    border: var(--border);
    background-color: var(--bgColorDefaut);
    box-shadow: var(--shadow);
    border-radius: 15px;
}
</style>
