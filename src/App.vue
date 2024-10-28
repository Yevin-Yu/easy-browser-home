<script setup lang="ts">
import { inject, onMounted } from "vue";
import { RouterView } from "vue-router";

import api from '@/api/api.js'; // 导入封装的 API

onMounted(async () => {
    let data = await api.get('/user')
    console.log(data)
})

// 获取是否是移动端
const isMobile = inject<boolean>('isMobile');

// 响应式布局
import { useResponsiveLayout } from '@/hook/useResponsiveLayout';
// 375 * 1.5 = 562.5
useResponsiveLayout({ designWidth: 562.5 });

// 初始化数据
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

</script>

<template>
    <!-- 主出口 -->
    <div :class="{ 'isMobile': isMobile }">
        <RouterView />
    </div>
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
</style>
