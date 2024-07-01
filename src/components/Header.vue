<template>
  <div class="header">
    <div class="title">耶温导航</div>
    <el-button class="close setting" @click="openSetting" circle>
      <img height="20px" src="../assets/images/setting.svg" alt="close">
    </el-button>
  </div>
  <!-- 登录组件 -->
  <Login v-if="isShowLogin" @login-in="loginIn" :isShowLogin="isShowLogin"></Login>
  <!-- 设置页面 -->
  <Setting v-if="isShowSetting" @closeSetting="closeSetting"></Setting>
</template>
<script setup>
import Login from "@/components/Login.vue";
import Setting from "@/components/Setting.vue";
import { useCookieAuth } from "@/hook/useAuth";
import { ref } from "vue";

const { token, setToken, removeToken } = useCookieAuth();
// 数据
let isShowLogin = ref(false);
let isShowSetting = ref(false);

// 方法
function openSetting() {
  if (!token.value) {
    isShowLogin.value = true;
  } else {
    isShowSetting.value = true;
  }
}

function loginIn() {
  isShowLogin.value = false;
}

function closeSetting() {
  isShowSetting.value = false;
}
</script>
<style scoped>
.header {
  color: #fff;
  width: 100%;
  padding: 12px;
  position: absolute;
  top: 0;
  left: 0;
  line-height: 24px;
  display: flex;
  justify-content: space-between;

  .title {
    visibility: hidden;
    font-size: 24px;
  }

  .close {
    outline: none;
    border: none;
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: rgba(255, 255, 255, 0.4);
    color: #fff;
  }
}
</style>
