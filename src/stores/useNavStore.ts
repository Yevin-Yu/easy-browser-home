import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref, watchEffect, type Ref } from "vue";
import api from "@/api/api";
import { isLogin } from "@/utils/tools";
// 定义导航项的类型
interface NavItem {
    id?: number;
    name: string;
    iconPath: string; // 可以是图标的名称或路径
    linkPath: string;
    sort_order?: number;
}

export const useNavStore = defineStore("nav", () => {
    // 定义导航数组
    const navItems = ref<NavItem[]>([]);

    onMounted(() => {
        let isLogin = localStorage.getItem("token") ? true : false;
        loadNavMenu(isLogin);
    });

    const loadNavMenu = (isLogin: boolean) => {
        if (isLogin) {
            // 加载已登陆用户的导航菜单
            api.get("nav").then((res) => {
                if (res.code === 200) {
                    navItems.value = res.data;
                }
            });
        } else {
            // 未登陆用户
            const navMenu = localStorage.getItem("navMenu");
            if (navMenu) {
                navItems.value = JSON.parse(navMenu);
            } else {
                navItems.value = [];
            }
        }
    };

    const addNavMenu = (isLogin: boolean, params: NavItem) => {
        if (isLogin) {
            api.post("nav", params).then((res) => {
                if (res.code === 200) {
                    loadNavMenu(isLogin);
                }
            });
        } else {
            navItems.value.push(params);
            localStorage.setItem("navMenu", JSON.stringify(navItems.value));
        }
    };

    const editNavMenu = (isLogin: boolean, params: NavItem) => {
        if (isLogin) {
            api.post("nav/update", params).then((res) => {
                if (res.code === 200) {
                    loadNavMenu(isLogin);
                }
            });
        } else {
            const index = navItems.value.findIndex((item) => item.id === params.id);
            if (index !== -1) {
                navItems.value[index] = params;
                localStorage.setItem("navMenu", JSON.stringify(navItems.value));
            }
        }
    };

    const delNavMenu = (isLogin: boolean, params: NavItem, index: number) => {
        if (isLogin) {
            api.post("nav/delete", { id: params.id }).then((res) => {
                if (res.code === 200) {
                    loadNavMenu(isLogin);
                }
            });
        } else {
            navItems.value.splice(index, 1);
            localStorage.setItem("navMenu", JSON.stringify(navItems.value));
        }
    };

    return {
        navItems,
        loadNavMenu,
        addNavMenu,
        editNavMenu,
        delNavMenu,
    };
});
