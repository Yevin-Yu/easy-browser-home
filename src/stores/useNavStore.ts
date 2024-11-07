import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref, watchEffect, type Ref } from "vue";
import api from "@/api/api";
import { ElMessage } from "element-plus";
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
            api.get("nav")
                .then((res) => {
                    if (res.code === 200) {
                        if (res.data.length === 0) {
                            // 接口获取用户导航为空时，默认批量上传本地Nav。
                            const navMenu = JSON.parse(localStorage.getItem("navMenu") || "[]");
                            navItems.value = navMenu;
                            api.post("nav/batch", { navMenu })
                                .then((res) => {
                                    if (res.code === 200) {
                                        ElMessage.success("导航菜单同步成功");
                                    }
                                })
                                .catch(() => {
                                    ElMessage.error("导航菜单同步失败");
                                });
                        } else {
                            navItems.value = res.data;
                            // 获取数据 同步到本地
                            localStorage.setItem("navMenu", JSON.stringify(res.data));
                        }
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
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
            api.post("nav", params)
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("添加成功");
                        loadNavMenu(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            navItems.value.push(params);
            localStorage.setItem("navMenu", JSON.stringify(navItems.value));
        }
    };

    const editNavMenu = (isLogin: boolean, params: NavItem) => {
        if (isLogin) {
            api.post("nav/update", params)
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("修改成功");
                        loadNavMenu(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
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
            api.post("nav/delete", { id: params.id })
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("删除成功");
                        loadNavMenu(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            navItems.value.splice(index, 1);
            localStorage.setItem("navMenu", JSON.stringify(navItems.value));
        }
    };

    const updateNavMenuSort = (isLogin: boolean, params: NavItem[]) => {
        if (isLogin) {
            // 重新排序
            const params = navItems.value.map((item, index) => {
                return {
                    id: item.id,
                    sort_order: index,
                };
            });
            api.post("nav/sort", params)
                .then((res) => {
                    if (res.code === 200) {
                        ElMessage.success("排序成功");
                        loadNavMenu(isLogin);
                    }
                })
                .catch(() => {
                    ElMessage.error("系统异常，请稍后再试");
                });
        } else {
            navItems.value = params;
            localStorage.setItem("navMenu", JSON.stringify(navItems.value));
        }
    };

    return {
        navItems,
        loadNavMenu,
        addNavMenu,
        editNavMenu,
        delNavMenu,
        updateNavMenuSort,
    };
});
