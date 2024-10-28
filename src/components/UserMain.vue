<template>
    <div class="user-main" @click="openUserInfo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
            <path fill="currentColor"
                d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0">
            </path>
        </svg>
        <span v-if="!isMobile">耶温导航</span>
    </div>

    <!-- 用户弹窗 -->
    <el-dialog v-model="dialogVisible" :show-close="false" :title="isLogin ? '个人信息' : '登录'" width="500">
        <!-- 登录 -->
        <div v-if="!isLogin">
            <div class="login-content">
                <h3>邮箱</h3>
                <input type="text" v-model="loginParams.username" />
                <h3>密码</h3>
                <input type="password" v-model="loginParams.password" />
            </div>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="subLogin"> 登录 </el-button>
                <p class="tips">当前未开放注册，如有需要可以联系作者添加账号：iyuwb0521@outlook.com</p>
            </div>
        </div>
        <!-- 个人信息 -->
        <div v-else class="user-content">
            <ul>
                <li><span>用户名：</span><span>耶温</span></li>
                <li><span>邮箱：</span><span>yuwb0521@outlook.com</span></li>
                <li><span>最后登录：</span><span>2024-10-28 21:11:12</span></li>
            </ul>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">修改密码</el-button>
                <el-button type="primary" @click="loginOut">登出</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
// 获取是否是移动端
const isMobile = inject<boolean>('isMobile');
// 判断是否登录
const isLogin = inject<boolean>('isLogin');

let dialogVisible = ref(false);
let loginParams = ref({
    username: '',
    password: ''
})

function openUserInfo() {
    dialogVisible.value = true
}

function subLogin() {

}

function loginOut() {

}
</script>

<style lang="less" scoped>
.user-main:hover,
.user-main:active {
    box-shadow: var(--sideShadowActive);
}

.user-main {
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    position: absolute;
    right: 24px;
    top: 24px;
    border-radius: 55px;
    background: var(--bgColorDefaut);
    box-shadow: var(--shadow);
    border: var(--border);
    color: var(--fontColor);
    padding: 0 12px;

    svg {
        position: relative;
        top: 5px;
    }

    span {
        text-align: center;
        font-size: 14px;
        display: inline-block;
        width: 80px;
        padding: 0 10px 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: top;
    }
}

.login-content {
    h3 {
        color: var(--fontColor);
        padding: 12px;
    }

    input {
        outline: none;
        border: none;
        color: #333;
        background-color: #fff;
        height: 38px;
        width: 320px;
        border-radius: 16px;
        padding: 0 24px;
    }

}

.dialog-footer {
    text-align: center;
}

.tips {
    color: #999;
    font-size: 12px;
    margin-top: 20px;
}

.user-content {
    ul {
        list-style: none;
        color: var(--fontColor);
        font-size: 16px;

        li {
            text-align: left;
            padding: 6px;
            line-height: 24px;

            span:first-child {
                text-align: right;
                display: inline-block;
                width: 120px;
            }
        }
    }
}
</style>