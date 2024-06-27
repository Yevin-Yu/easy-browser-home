<template>
    <div class="header">
        <div class="title">耶温导航</div>
        <div class="setting" @click="openSetting">
            <img src="@/assets/set.svg" height="18px" alt="set">
        </div>
    </div>
    <!-- 登录组件 -->
    <Login v-if="isShowLogin" @login-in="loginIn" :isShowLogin="isShowLogin"></Login>
    <!-- 设置页面 -->
    <Setting v-if="isShowSetting" @closeSetting="closeSetting"></Setting>
</template>
<script setup>
import Login from '@/components/Login.vue'
import Setting from '@/components/Setting.vue'
import { useCookieAuth } from '@/hook/useAuth';
import { ref } from 'vue';
const { token, setToken, removeToken } = useCookieAuth();
// 数据
let isShowLogin = ref(false)
let isShowSetting = ref(false)
// 方法
function openSetting() {
    if (!token.value) {
        isShowLogin.value = true
    } else {
        isShowSetting.value = true
    }
}
function loginIn() {
    isShowLogin.value = false
}
function closeSetting(){
    isShowSetting.value = false
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

    .setting {
        img {
            cursor: pointer;
        }
    }
}
</style>
