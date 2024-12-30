import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref, watchEffect, type Ref } from "vue";
import api from "@/api/api";
import { ElMessage } from "element-plus";
// 默认导航链接数据

const defaultNavMenu: NavItem[] =
    [
        {
            "name": "通义千问",
            "linkPath": "https://tongyi.aliyun.com",
            "iconPath": "https://img.alicdn.com/imgextra/i3/O1CN01sffRIx1nb3dXCKdFC_!!6000000005107-2-tps-1024-1024.png"
        },
        {
            "name": "必应",
            "linkPath": "https://cn.bing.com",
            "iconPath": "https://cn.bing.com/favicon.ico"
        },
        {
            "name": "百度",
            "linkPath": "https://www.baidu.com",
            "iconPath": "https://www.baidu.com/favicon.ico"
        },
        {
            "name": "谷歌",
            "linkPath": "https://www.google.com",
            "iconPath": "https://www.google.com/favicon.ico"
        },
        {
            "name": "GitHub",
            "linkPath": "https://github.com",
            "iconPath": "https://github.com/favicon.ico"
        },
        {
            "name": "MDN",
            "linkPath": "https://developer.mozilla.org/zh-CN",
            "iconPath": "https://developer.mozilla.org/favicon.ico"
        },
        {
            "name": "掘金",
            "linkPath": "https://juejin.cn",
            "iconPath": "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/favicon-32x32.png"
        },
        {
            "name": "CSDN",
            "linkPath": "https://www.csdn.net",
            "iconPath": "https://www.csdn.net/favicon.ico"
        },
        {
            "name": "抖音",
            "linkPath": "https://www.douyin.com",
            "iconPath": "https://www.douyin.com/favicon.ico"
        },
        {
            "name": "B站",
            "linkPath": "https://www.bilibili.com",
            "iconPath": "https://www.bilibili.com/favicon.ico"
        },
        {
            "name": "微博",
            "linkPath": "https://weibo.com",
            "iconPath": "https://weibo.com/favicon.ico"
        },
        {
            "name": "知乎",
            "linkPath": "https://www.zhihu.com",
            "iconPath": "https://static.zhihu.com/heifetz/favicon.ico"
        },
        {
            "name": "豆瓣",
            "linkPath": "https://www.douban.com",
            "iconPath": "https://www.douban.com/favicon.ico"
        },
        {
            "name": "淘宝",
            "linkPath": "https://www.taobao.com",
            "iconPath": "https://www.taobao.com/favicon.ico"
        },
        {
            "name": "京东",
            "linkPath": "https://www.jd.com",
            "iconPath": "https://www.jd.com/favicon.ico"
        },
        {
            "name": "苏宁",
            "linkPath": "https://www.suning.com",
            "iconPath": "https://www.suning.com/favicon.ico"
        },
        {
            "name": "爱奇艺",
            "linkPath": "https://www.iqiyi.com",
            "iconPath": "https://www.iqiyi.com/favicon.ico"
        },
        {
            "name": "优酷",
            "linkPath": "https://www.youku.com",
            "iconPath": "https://www.youku.com/favicon.ico"
        },
        {
            "name": "腾讯视频",
            "linkPath": "https://v.qq.com",
            "iconPath": "https://v.qq.com/favicon.ico"
        },
        {
            "name": "芒果TV",
            "linkPath": "https://www.mgtv.com",
            "iconPath": "https://www.mgtv.com/favicon.ico"
        },
        {
            "name": "网易",
            "linkPath": "https://www.163.com",
            "iconPath": "https://www.163.com/favicon.ico"
        },
        {
            "name": "耶温博客",
            "linkPath": "https://yuwb.cn",
            "iconPath": ""
        }
    ]


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
            if (navMenu && navMenu !== "[]") {
                navItems.value = JSON.parse(navMenu);
            } else {
                // 默认加载本地Nav
                navItems.value = defaultNavMenu;
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
