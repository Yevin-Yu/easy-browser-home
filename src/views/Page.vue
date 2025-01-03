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
import { ElNotification } from 'element-plus'
import { ref, watchEffect, watch } from "vue";
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
// 监听  ctrl + 空格按键 事件 回到主页
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.ctrlKey) {
    router.push('/');
  }
});
// 引入主题切换 主题切换不保存云端
import { useTheme } from "@/hook/useTheme";
const { toggleTheme, currentTheme } = useTheme();

// 获取用户信息
import { useUserStore } from '@/stores/useAuthStore'
let { updateIsLogin, updateUserInfo } = useUserStore()
let { isLogin, userInfo } = storeToRefs(useUserStore());

// 获取待办 加载TodoList

import { useTodoStore } from "@/stores/useTodoStore"
let { loadTodos } = useTodoStore();
let { todoItems } = storeToRefs(useTodoStore());
watch(isLogin, () => {
  loadTodos(isLogin.value)
})

// 时间格式化
import { formatDate } from '@/hook/useFormatDate'
// 提示
watchEffect(() => {
  // 获取待办中今天的未完成事项 和 已超时的事项
  if (sessionStorage.getItem('isTodayNotificationTodo') == formatDate(new Date(), 'YYYY-MM-DD')) return
  // 统计今日需关注和已超时的事项
  let todayTodo = todoItems.value.filter(item => formatDate(item.time, 'YYYY-MM-DD') == formatDate(new Date(), 'YYYY-MM-DD') && item.checked == false)
  let todayTodoOverdue = todoItems.value.filter(item => formatDate(item.time, 'YYYY-MM-DD') < formatDate(new Date(), 'YYYY-MM-DD') && item.checked == false)
  if(!todayTodo.length && !todayTodoOverdue.length) return
  // 显示通知
  ElNotification({
    title: '待办提示',
    message: `今日有${todayTodo.length}个需关注，${todayTodoOverdue.length}个已超时。`,
    position: 'top-right',
    type: 'warning',
  })
  // 保存时间
  sessionStorage.setItem('isTodayNotificationTodo', formatDate(new Date(), 'YYYY-MM-DD'))
})
</script>
