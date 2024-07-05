<template>
  <!-- 用户信息 -->
  <UserMain></UserMain>
  <!-- 标题时间 -->
  <TopTime></TopTime>
  <!-- 搜索主体 -->
  <SearchMain></SearchMain>
  <!-- 主页 -->
  <Main v-if="store.activeMenuId === 1"></Main>
  <!-- 导航栏 -->
  <NavMain v-if="store.activeMenuId === 2"></NavMain>
  <!-- 新闻 -->
  <NewsMain v-if="store.activeMenuId === 3"></NewsMain>
  <!-- 笔记 -->
  <NotesMain v-if="store.activeMenuId === 4"></NotesMain>
  <!-- 设置 -->
  <SettingMain v-if="store.activeMenuId === 5"></SettingMain>
  <!-- 侧边菜单 -->
  <SideMenu></SideMenu>
</template>
<script setup>
// 引入组件
import UserMain from "@/components/UserMain.vue";
import TopTime from "@/components/TopTime.vue";
import SearchMain from "@/components/SearchMain.vue";
import Main from "@/components/Main.vue";
import NavMain from "@/components/NavMain.vue";
import NewsMain from "@/components/NewsMain.vue";
import NotesMain from "@/components/NotesMain.vue";
import SettingMain from "@/components/SettingMain.vue";
import SideMenu from "@/components/SideMenu.vue";
// 引入Stores
import { useMyStoreHook } from "@/stores/useStore";

let store = useMyStoreHook();
// 主题设置
import { onMounted } from "vue";
import { useTheme } from "@/hook/useTheme";

const theme = useTheme();
onMounted(() => {
  // 默认主题
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) theme.currentTheme.value = currentTheme;
  // 默认菜单
  const activeMenuId = localStorage.getItem("activeMenuId");
  if (activeMenuId) store.activeMenuId = parseInt(activeMenuId);
  // 默认背景
  const bgBase64 = localStorage.getItem("bgBase64");
  if (bgBase64) document.getElementById("app").style.backgroundImage = `url(${bgBase64})`;
});
</script>
<style scoped></style>
