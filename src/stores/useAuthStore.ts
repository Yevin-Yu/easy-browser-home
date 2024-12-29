// src/stores/useUserStore.js
import { defineStore } from "pinia";
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

    const newsList = ref([] as string[]);
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
                if (res.code == 200) {
                    userInfo.value = res.data;
                    // 将新闻列表转换为数组
                    newsList.value = JSON.parse(res.data.news_list);
                    localStorage.setItem("newsList", JSON.stringify(newsList.value));
                }
            }).catch(() => {
                isLogin.value = false;
            })
        } else {
            // 未登录默认
            let data = localStorage.getItem("newsList");
            if (data) {
                newsList.value = JSON.parse(data);
            } else {
                // 默认数据
                const data = ['weibo', 'baidu', 'zhihu', 'douyin', 'bilibili', 'tieba',
                    'juejin', '36kr', 'ithome', 'thepaper', 'toutiao', 'sspai',
                    '51cto', 'acfun', 'csdn', 'douban-group', 'douban-movie', 'hellogithub',
                    'hupu', 'huxiu', 'ifanr', 'jianshu', 'netease-news', 'ngabbs', 'nodeseek',
                    'qq-news', 'sina-news', 'weread']
                newsList.value = data;
                localStorage.setItem("newsList", JSON.stringify(data));
            }
        }
    };

    const updateNewList = (newList: string[]) => {
        if (isLogin.value) {
            api.post("/user/updateNewsList", {
                news_list: newList
            }).then((res) => {
                if (res.code == 200) {
                    updateUserInfo();
                }
            }).catch(() => {
                isLogin.value = false;
            })
        } else {
            newsList.value = newList;
            localStorage.setItem("newsList", JSON.stringify(newList));
        }
    }

    return {
        isLogin,
        userInfo,
        newsList,
        updateIsLogin,
        updateUserInfo,
        updateNewList
    };
});
