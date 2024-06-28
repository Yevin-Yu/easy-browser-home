<template>
  <div class="login">
    <div class="login-container">
      <form class="login-form" @submit.prevent="handleLogin">
        <h1>Login</h1>
        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" placeholder="Enter your username" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Enter your password" />
        </div>
        <button :disabled="isLoading" @click="login" type="submit" :class="{ 'btn-loading': isLoading }">
          <span v-if="!isLoading">Login</span>
          <span v-else>Loading...</span>
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
// hook
import { useCookieAuth } from "@/hook/useAuth";

const { token, setToken, removeToken } = useCookieAuth();
// Vue
import axiosInstance from "@/axios"; // 导入你的axios实例
import { useRouter } from "vue-router";

const router = useRouter();
import { ref, defineEmits } from "vue";

const emit = defineEmits(["login-in"]);
// 组件
import { ElMessage } from "element-plus";

let username = ref("");
let password = ref("");
let isLoading = ref(false);
let isShowLogin = defineProps(["isShowLogin"]);

function login() {
  isLoading.value = true;
  axiosInstance.post("/login", {
    username: username.value,
    password: password.value,
  }).then(res => {
    isLoading.value = false;
    if (res.status === 200) {
      setToken(res.data.token, { expires: 7 });
      isShowLogin.value = false;
      // 关闭登录弹窗
      emit("login-in");
      ElMessage({
        message: "Login success",
        type: "success",
      });
      router.go(0);
    } else {
      removeToken();
      ElMessage.error("Login error");
    }
  });
}

</script>
<style scoped>
.login {
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

.login-form {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  width: 350px;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2)
}

h1 {
  text-align: center;
  color: transparent;
  background-image: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
  background-clip: text;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #eee;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  color: #a96aa2;
  background-color: rgba(0, 0, 0, 0.5);
}

.btn-loading {
  opacity: 0.7;
  pointer-events: none;
}

button {
  margin: 10px auto;
  display: block;
  outline: none;
  border: none;
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
  border-radius: 4px;
  color: #fff;
  padding: 8px 12px;
  backdrop-filter: blur(5px);
  cursor: pointer;
  letter-spacing: 2px;
  width: 120px;
}

button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}
</style>
