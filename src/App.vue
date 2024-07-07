<script setup lang="ts">
import { RouterView } from 'vue-router'
if (!localStorage.length) {
  fetch('localStorage.json')
    .then(response => {
      // 检查响应状态，确保请求成功
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 解析JSON数据
      return response.json();
    })
    .then(data => {
      // 遍历JSON对象的每个键值对并存储到localStorage
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          localStorage.setItem(key, data[key]);
        }
      }
      console.log('Data stored in localStorage');
    })
    .catch(error => {
      // 处理错误
      console.error('Error fetching or parsing data:', error);
    });
}
</script>

<template>
  <RouterView />
</template>

<style>
#app {
  position: absolute;
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--bgColor);
  /* background-image: url('@/assets/images/banner.jpg'); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
