<template>
    <el-dialog class="setting" :fullscreen="isMobile" :style="{ height: !isMobile ? 'calc(100% - 100px)' : '' }"
        v-model="isShow" :close-on-click-modal="false" :modal="false" top="50px" title="设置" width="calc(100% - 180px)"
        :before-close="closeDialog">
        <div class="setting-content">
            <h3>【数据同步】</h3>
            <div class="item">
                <div class="text">
                    用户信息：
                    <span v-if="!isLogin">当前未登录</span>
                    <div v-else class="user-info">
                        <span>登录用户：{{ userInfo.username }}</span>
                        <span>登录邮箱：{{ userInfo.email }}</span>
                        <span>登录时间：{{ formatDate(userInfo.last_login, 'YYYY-MM-DD HH: mm: ss') }}</span>
                    </div>
                </div>
                <button v-if="!isLogin" class="button-default" @click="openUserLogin">点击登录</button>
                <button v-else class="button-default" @click="loginOut">退出登录</button>
                <button v-if="!isLogin" class="button-default" @click="openRegister">注册账号</button>
                <button v-else class="button-default" @click="openChangePassowrd">修改密码</button>
            </div>
            <h3>【主题设置】</h3>
            <div class="item">
                <div class="text">
                    当前主题：{{ currentTheme?.toLocaleUpperCase() }}
                </div>
                <button class="button-default" @click="toggleTheme">切换主题</button>
            </div>
            <h3>【提示帮助】</h3>
            <div class="item">
                <div class="text">
                    <p>新闻模块：点击新闻标题可以跳转原网站内查看更多信息。</p>
                    <p>新闻模块：可以通过拖拽 Card 进行排序，把自己需要的新闻信息放到最前排。</p>
                </div>
            </div>
        </div>
    </el-dialog>
    <!-- 注册弹窗 -->
    <!-- 注册 -->
    <el-dialog v-model="isShowRegister" :show-close="false" title="注册" width="500">
        <div>
            <div class="form-content">
                <div class="form-item">
                    <h3>用户名</h3>
                    <input type="text" v-model="registerParams.username" />
                </div>
                <div class="form-item">
                    <h3>邮箱</h3>
                    <input type="text" v-model="registerParams.email" />
                </div>
                <div class="form-item">
                    <h3>密码</h3>
                    <input type="password" v-model="registerParams.password" />
                </div>
                <div class="form-item">
                    <h3>确认密码</h3>
                    <input type="password" v-model="registerParams.confirm_password" />
                </div>
                <div class="form-item">
                    <h3>注册码</h3>
                    <input type="password" v-model="registerParams.code" />
                </div>
            </div>
            <div class="dialog-footer">
                <button class="button-default" @click="isShowRegister = false">取消</button>
                <button class="button-default" :class="{ 'is-loading-btn': isRegisterLoading }"
                    @click="subRegister">确认</button>
                <p class="tips">注册码可以联系作者获取：iyuwb0521@outlook.com</p>
            </div>
        </div>
    </el-dialog>
    <!-- 登录弹窗 -->
    <el-dialog v-model="isShowLogin" :show-close="false" title="登录" width="500">
        <div class="form-content">
            <div class="form-item">
                <h3>邮箱</h3>
                <input type="text" v-model="loginParams.email" />
            </div>
            <div class="form-item">
                <h3>密码</h3>
                <input type="password" v-model="loginParams.password" />
            </div>
        </div>
        <div class="dialog-footer">
            <button class="button-default" @click="isShowLogin = false">取消</button>
            <button class="button-default" type="primary" :class="{ 'is-loading-btn': isLoginLoading }"
                @click="subLogin"> 登录 </button>
        </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog v-model="isShowChangePassword" :show-close="false" title="修改密码" width="500">
        <div>
            <div class="form-content">
                <div class="form-item">
                    <h3>旧密码</h3>
                    <input type="password" v-model="resetPasswordParams.old_password" />
                </div>
                <div class="form-item">
                    <h3>新密码</h3>
                    <input type="password" v-model="resetPasswordParams.new_password" />
                </div>
                <div class="form-item">
                    <h3>确认新密码</h3>
                    <input type="password" v-model="resetPasswordParams.confirm_password" />
                </div>
            </div>
            <div class="dialog-footer">
                <button class="button-default" @click="isShowChangePassword = false">取消</button>
                <button class="button-default" :class="{ 'is-loading-btn': isChangeLoading }"
                    @click="changePassword">确认</button>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import api from '@/api/api'; // 导入封装的 API
// 时间格式化
import { formatDate } from '@/hook/useFormatDate'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const isShow = ref(false)
onMounted(() => {
    isShow.value = true
})
// 设置弹窗关闭
function closeDialog() {
    isShow.value = false
    // 跳转到首页
    router.push('/');
}

// 获取屏幕尺寸 低于500式 为移动端
const isMobile = ref(false)
const screenWidth = ref(document.documentElement.clientWidth)
if (screenWidth.value < 500) {
    isMobile.value = true
}

// 获取用户信息
import { useUserStore } from '@/stores/useAuthStore'
let { updateIsLogin, updateUserInfo } = useUserStore()
let { isLogin, userInfo } = storeToRefs(useUserStore());
// 退出登录
function loginOut() {
    localStorage.removeItem('token');
    updateIsLogin(false)
}

// 注册弹窗 
const isShowRegister = ref(false)
const registerParams = ref({ username: '', email: '', password: '', confirm_password: '', code: '' })
function openRegister() {
    isShowRegister.value = true
}
const isRegisterLoading = ref(false)
function subRegister() {
    if (
        registerParams.value.username == '' ||
        registerParams.value.email == '' ||
        registerParams.value.password == '' ||
        registerParams.value.confirm_password == '' ||
        registerParams.value.code == ''
    ) {
        return ElMessage({
            message: '请输入完整信息',
            type: 'warning',
        })
    }
    let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailReg.test(registerParams.value.email)) {
        return ElMessage({
            message: '邮箱格式不正确',
            type: 'warning',
        })
    }
    if (registerParams.value.password != registerParams.value.confirm_password) {
        return ElMessage({
            message: '两次密码不一致',
        })
    }
    isRegisterLoading.value = true
    api.post('/login/register', registerParams.value).then(res => {
        if (res.code == 200) {
            ElMessage({
                message: '注册成功',
                type: 'success',
            })
            isShowRegister.value = false
        } else {
            ElMessage({
                message: res.message,
                type: 'warning',
            })
        }
        isRegisterLoading.value = false
    }).catch(() => {
        ElMessage({
            message: '系统错误，请稍后再试',
            type: 'error',
        })
        isRegisterLoading.value = false
    })
}

// 弹窗登陆以及信息相关
let isShowLogin = ref(false);
let loginParams = ref({ email: '', password: '' })
function openUserLogin() {
    isShowLogin.value = true
}
const isLoginLoading = ref(false)
async function subLogin() {
    if (loginParams.value.email == '' || loginParams.value.password == '') {
        return ElMessage({
            message: '邮箱或密码不能为空',
            type: 'warning',
        })
    }
    isLoginLoading.value = true
    let data = await api.post('/login', loginParams.value).catch(() => {
        isLoginLoading.value = false
    })
    if (data && data.code == 200) {
        ElMessage({
            message: '登录成功',
            type: 'success',
        })
        isShowLogin.value = false
        localStorage.setItem('token', data.data.token);
        updateIsLogin(true)
        updateUserInfo()
        isLoginLoading.value = false
    } else {
        ElMessage({
            message: data && data.message || '系统错误，请稍后再试',
            type: 'error',
        })
        isLoginLoading.value = false
    }
}

// 引入主题切换 主题切换不保存云端
import { useTheme } from "@/hook/useTheme";
const { toggleTheme, currentTheme } = useTheme();

// 修改密码
const isShowChangePassword = ref(false)
const resetPasswordParams = ref({ old_password: '', new_password: '', confirm_password: '' })
function openChangePassowrd() {
    isShowChangePassword.value = true
}
const isChangeLoading = ref(false)
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
    isChangeLoading.value = true
    api.post('/login/reset', resetPasswordParams.value).then(res => {
        if (res.code == 200) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            resetPasswordParams.value = { email: '', password: '', confirm_password: '' }
            isShowChangePassword.value = false
        } else {
            ElMessage({
                message: res.message,
                type: 'error',
            })
        }
        isChangeLoading.value = false
    }).catch(() => {
        ElMessage({
            message: '系统错误，请稍后再试',
            type: 'error',
        })
        isChangeLoading.value = false
    })
}
</script>

<style lang="less" scoped>
.setting {

    .setting-content {
        padding: 12px;
        text-align: left;

        .item {
            padding: 12px 24px;

            .text {
                line-height: 34px;
            }

            .user-info {
                span {
                    padding-right: 24px;
                }
            }
        }
    }
}

.form-content {
    h3 {
        color: var(--fontColor);
        padding: 12px;
        display: inline-block;
        width: 120px;
    }

    input {
        outline: none;
        border: none;
        color: #333;
        background-color: #fff;
        height: 38px;
        width: 300px;
        border-radius: 16px;
        padding: 0 24px;
    }

}
</style>