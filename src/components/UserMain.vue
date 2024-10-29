<template>
    <div class="user-main" @click="openUserInfo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
            <path fill="currentColor"
                d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0">
            </path>
        </svg>
        <span v-if="!isMobile">{{ isLogin ? userInfo.username : '未登录' }}</span>
    </div>

    <!-- 用户弹窗 -->
    <el-dialog v-model="dialogVisible" :show-close="false" :title="isLogin ? '个人信息' : '登录'" width="500">
        <!-- 登录 -->
        <div v-if="!isLogin">
            <div class="login-content">
                <h3>邮箱</h3>
                <input type="text" v-model="loginParams.email" />
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
                <li><span>用户名：</span><span>{{ userInfo.username }}</span></li>
                <li><span>邮箱：</span><span>{{ userInfo.email }}</span></li>
                <li><span>最后登录：</span><span>{{ formatDate(userInfo.last_login, 'YYYY-MM-DD HH:mm:ss') }}</span></li>
            </ul>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">修改密码</el-button>
                <el-button type="primary" @click="loginOut">登出</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { ElMessage } from 'element-plus'
import api from '@/api/api'; // 导入封装的 API

import { formatDate } from '@/hook/useFormatDate'
// 获取是否是移动端
const isMobile = inject<boolean>('isMobile');
// 判断是否登录
const isLogin = inject<boolean>('isLogin');

let dialogVisible = ref(false);
let loginParams = ref({
    email: '',
    password: ''
})


let userInfo = ref({
    username: '',
    email: '',
    last_login: ''
})
onMounted(() => {
    // 获取当前登录用户信息
    api.get('/user').then(res => {
        if (res.code == 200) {
            userInfo.value = res.data
            console.log(res.data)
        }
    })
})

function openUserInfo() {
    dialogVisible.value = true
}

async function subLogin() {
    if (loginParams.value.email == '' || loginParams.value.password == '') {
        return ElMessage({
            message: '邮箱或密码不能为空',
            type: 'warning',
        })
    }
    let data = await api.post('/login', loginParams.value)
    if (data.code == 200) {
        ElMessage({
            message: '登录成功',
            type: 'success',
        })
        dialogVisible.value = false
        localStorage.setItem('token', data.data.token);
        // 刷新页面
        setTimeout(() => {
            location.reload()
        }, 500)
    }
}

function loginOut() {
    localStorage.removeItem('token');
    // 刷新页面
    setTimeout(() => {
        location.reload()
    }, 500)
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