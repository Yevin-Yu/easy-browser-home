<template>
  <!-- 时间 -->
  <TopTime />
  <!-- 搜索 -->
  <SearchMain />
  <!-- 侧边栏 -->
  <SideMenu />
  <!-- 其他出口 -->
  <RouterView />
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia'
import { RouterView } from "vue-router";
// 引入时间组件
import TopTime from "@/components/TopTime.vue";
// 引入搜索组件
import SearchMain from "@/components/SearchMain.vue";
// 引入侧边栏组件
import SideMenu from "@/components/SideMenu.vue";

//  快捷键 空格 快速回到主页 并focus 搜索框
import { useRouter } from 'vue-router';
const router = useRouter();
// 监听 空格按键 事件 回到主页
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    router.push('/');
  }
});

// 用户信息
// 获取用户信息
import { useUserStore } from '@/stores/useAuthStore'
let { updateIsLogin, updateUserInfo } = useUserStore()
let { isLogin, userInfo } = storeToRefs(useUserStore());
</script>
