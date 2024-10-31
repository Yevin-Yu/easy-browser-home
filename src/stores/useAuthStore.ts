// src/stores/useUserStore.js
import { defineStore, mapActions } from "pinia";
import { ref, onMounted } from "vue";
import api from "@/api/api"; // 导入封装的 API

export const useUserStore = defineStore("user", () => {
    const isLogin = ref(false);
    isLogin.value = localStorage.getItem("token") ? true : false;

    const userInfo = ref({
        username: "",
        email: "",
        last_login: "",
    });
    onMounted(() => {
        // 加载用户信息
        updateUserInfo();
    });

    const updateIsLogin = (status: boolean) => {
        isLogin.value = status;
    };

    const updateUserInfo = () => {
        // 加载用户信息
        if (isLogin.value) {
            api.get("/user").then((res) => {
                if (res.code == 200) userInfo.value = res.data;
                else if (res.code == 401) {
                    localStorage.removeItem("token");
                    isLogin.value = false;
                }
            });
        }
    };

    return {
        isLogin,
        userInfo,
        updateIsLogin,
        updateUserInfo,
    };
});
