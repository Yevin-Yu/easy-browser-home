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
    <el-dialog v-model="isShowUserInfo" :show-close="false" :title="isLogin ? '个人信息' : '登录'" width="500">
        <!-- 登录 -->
        <div v-if="!isLogin">
            <div class="login-content">
                <h3>邮箱</h3>
                <input type="text" v-model="loginParams.email" />
                <h3>密码</h3>
                <input type="password" v-model="loginParams.password" />
            </div>
            <div class="dialog-footer">
                <el-button @click="isShowUserInfo = false">取消</el-button>
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
                <el-button @click="openChangePassowrd">修改密码</el-button>
                <el-button type="primary" @click="loginOut">登出</el-button>
            </div>
        </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog v-model="isShowChangePassword" :show-close="false" title="修改密码" width="500">
        <div>
            <div class="login-content">
                <h3>旧密码</h3>
                <input type="password" v-model="resetPasswordParams.old_password" />
                <h3>新密码</h3>
                <input type="password" v-model="resetPasswordParams.new_password" />
                <h3>确认新密码</h3>
                <input type="password" v-model="resetPasswordParams.confirm_password" />
            </div>
            <div class="dialog-footer">
                <el-button @click="isShowChangePassword = false">取消</el-button>
                <el-button type="primary" @click="changePassword">确认</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, inject, watchEffect, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import api from '@/api/api'; // 导入封装的 API
// 获取是否是移动端
const isMobile = inject<boolean>('isMobile');
// 时间格式化
import { formatDate } from '@/hook/useFormatDate'
// 获取用户信息
import { useUserStore } from '@/stores/useAuthStore'
let { updateIsLogin, updateUserInfo } = useUserStore()
let { isLogin, userInfo } = storeToRefs(useUserStore());



// 弹窗登陆以及信息相关
let isShowUserInfo = ref(false);
let loginParams = ref({ email: '', password: '' })
function openUserInfo() {
    isShowUserInfo.value = true
}
// 登录
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
        isShowUserInfo.value = false
        localStorage.setItem('token', data.data.token);
        updateIsLogin(true)
        updateUserInfo()
    }
}
// 登出
function loginOut() {
    localStorage.removeItem('token');
    updateIsLogin(false)
}

// 修改密码
const isShowChangePassword = ref(false)
const resetPasswordParams = ref({ old_password: '', new_password: '', confirm_password: '' })
function openChangePassowrd() {
    isShowUserInfo.value = false
    isShowChangePassword.value = true
}
function changePassword() {
    if (resetPasswordParams.value.old_password == '' || resetPasswordParams.value.new_password == '' || resetPasswordParams.value.confirm_password == '') {
        return ElMessage({
            message: '请输入完整信息',
            type: 'warning',
        })
    }
    if (resetPasswordParams.value.new_password != resetPasswordParams.value.confirm_password) {
        return ElMessage({
            message: '两次密码不一致',
            type: 'warning',
        })
    }
    api.post('/login/reset', resetPasswordParams.value).then(res => {
        if (res.code == 200) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            isShowChangePassword.value = false
        }
    })
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
        top: 7px;
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