<template>
    <div class="nav-main">
        <ul ref="navsList">
            <li v-for="item in navItems" @click="go(item)" :key="item.name">
                <div>
                    <img :src="item.iconPath" alt="icon" @error="onImageError(item)" />
                </div>
                <span class="nav-item-name">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import Sortable from "sortablejs";
import { onMounted, watch, ref } from "vue";
import { storeToRefs } from "pinia";
// 引入Stores
import { useMyStoreHook } from "@/stores/useStore";
let store = useMyStoreHook();
// 获取用户信息 是否登陆
import { useUserStore } from '@/stores/useAuthStore'
let { isLogin } = storeToRefs(useUserStore());
// 引入NavMenu
import { useNavStore } from "@/stores/useNavStore"
let { loadNavMenu, updateNavMenuSort } = useNavStore();
let { navItems } = storeToRefs(useNavStore());
// 加载NavMenu
watch(isLogin, () => {
    loadNavMenu(isLogin.value)
})
// 监听NavMenu变化
const navsList = ref(null);
onMounted(() => {
    Sortable.create(navsList.value, {
        group: "shared",
        animation: 150,
        ghostClass: "ghost",
        onEnd: ({ newIndex, oldIndex }) => {
            const item = navItems.value.splice(oldIndex, 1)[0];
            navItems.value.splice(newIndex, 0, item);
            updateNavMenuSort(isLogin.value, navItems.value)
        },
    });
})
// 点击跳转
function go(item) {
    window.open(item.linkPath);
}
// 图片加载失败
function onImageError(item) {
    item.iconPath = "https://yuwb.cn/nav/pwa.png";
}
</script>

<style lang="less" scoped>
.nav-main::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.nav-main::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
}

.nav-main {
    width: 65vw;
    height: 50vh;
    margin: 10vh auto;
    overflow: auto;
    text-align: center;

    ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        justify-content: center;

        li {
            display: inline-block;
            margin: 12px 25px;
            text-align: center;
            width: 80px;

            div {
                cursor: pointer;
                border-radius: 17px;
                min-width: 80px;
                height: 80px;
                border: var(--border);
                background-color: var(--bgColorDefaut);
                box-shadow: var(--shadow);

                img {
                    display: block;
                    padding: 12px;
                    background-color: #fff;
                    width: 50px;
                    height: 50px;
                    margin: 14px;
                    border-radius: 15px;
                    background-color: rgba(255, 255, 255, 0.5);
                }
            }

            div:hover,
            div:active {
                box-shadow: var(--sideShadowActive);

                img {
                    box-shadow: var(--shadow);
                }
            }

            span {
                width: 80px;
                display: inline-block;
                margin-top: 12px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: var(--fontColor);
            }
        }
    }
}

.isMobile {
    .nav-main {
        width: 90vw;
        margin: 5vh auto;
        padding: 24px;

        .nav-item-name {
            font-size: 18px;
        }

        ul {
            li {
                margin: 8px 16px;
            }
        }
    }
}
</style>