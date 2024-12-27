<template>
  <!-- 时间 -->
  <TopTime />
  <!-- 搜索 -->
  <SearchMain />
  <!-- 侧边栏 -->
  <SideMenu />
  <!-- 其他出口 -->
  <RouterView />
  <button style="margin-left: 300px;" @click="toggleTheme">
    切换主题
  </button>
</template>
<script setup>
import { RouterView } from "vue-router";
// 引入时间组件
import TopTime from "@/components/TopTime.vue";
// 引入搜索组件
import SearchMain from "@/components/SearchMain.vue";
// 引入侧边栏组件
import SideMenu from "@/components/SideMenu.vue";
// 引入主题切换
import { useTheme } from "@/hook/useTheme";
const { toggleTheme } = useTheme();
</script>
