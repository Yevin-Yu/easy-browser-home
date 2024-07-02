<template>
    <button @click="toggleTheme">切换主题</button>
    <!-- 用户信息 -->
    <UserMain></UserMain>
    <!-- 标题时间 -->
    <TopTime></TopTime>
    <!-- 搜索主体 -->
    <SearchMain></SearchMain>
    <!-- 导航栏 -->
    <NavMain></NavMain>
    <!-- 侧边菜单 -->
    <SideMenu></SideMenu>
</template>
<script setup>
// 引入组件
import UserMain from '@/components/UserMain.vue'
import TopTime from '@/components/TopTime.vue'
import SearchMain from '@/components/SearchMain.vue'
import NavMain from '@/components/NavMain.vue'
import SideMenu from '@/components/SideMenu.vue'
// 主题切换
import { useTheme } from '@/hook/useTheme';
const { toggleTheme } = useTheme();



</script>
<style scoped></style>
