<template>
  <div id="yuwbNav" class="nav">
    <!-- header -->
    <Header></Header>
    <!-- 搜索 -->
    <Search></Search>
    <!-- 侧边栏 -->
    <Right></Right>
    <!-- 中间 -->
    <Center></Center>
  </div>
</template>

<script setup>
import Search from "@/components/Search.vue";
import Header from "@/components/Header.vue";
import Right from "@/components/Right.vue";
import Center from "@/components/Center.vue";
import axiosInstance from "@/axios";
import { onMounted,ref } from "vue";
import { useCookieAuth } from "@/hook/useAuth.js";

const { token } = useCookieAuth();
onMounted(() => {
  // 加载用户自己上传背景
  const bg_base64 = localStorage.getItem("bg_base64");
  if (bg_base64) {
    document.getElementById("yuwbNav").style.backgroundImage = `url(${bg_base64})`;
  }
  if (token.value) {
    axiosInstance.get("/user/bg").then(res => {
      if (res.status === 200) {
        const base64ImageData = `data:image/png;base64,${res.data.bg_base64}`;
        document.getElementById("yuwbNav").style.backgroundImage = `url(${base64ImageData})`;
        // 储存图片优化加载问题
        localStorage.setItem("bg_base64", base64ImageData);
      }
    });
  }
});
</script>

<style scoped>
.nav {
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #000000;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow-x: hidden;
}

@media (max-width: 1000px) {
  .nav .search {
    z-index: 99;
    width: 80vw;
  }

  .nav .content {
    width: 80vw;
  }

  .nav .search input {
    padding-right: 20px;
  }

  .nav .search button {
    display: none;
  }
}

@media (max-width: 1200px) {
  .nav .content {
    display: block;
  }

  .nav .content .left-content {
    width: 100%;
    border-right: 2px solid transparent;

  }

  .nav .content .right-content {
    width: 100%;
    border-left: 2px solid transparent;
  }
}

@media (max-width: 600px) {
  .nav .content .left-list {
    width: 120px;
  }

  .nav .content {
    height: 50vh;
  }
}
</style>
