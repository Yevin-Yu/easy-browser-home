<template>
    <div class="nav-main">
        <ul ref="navsList">
            <li v-for="item in navItems" @click="go(item)" :key="item.name">
                <img :src="item.iconPath" alt="link" @error="onImageError(item)" />
                <span class="nav-item-name">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
// 获取用户信息 是否登陆
import { useUserStore } from '@/stores/useAuthStore'
let { isLogin } = storeToRefs(useUserStore());
// 加载NavMenu
import { useNavStore } from "@/stores/useNavStore"
let { loadNavMenu } = useNavStore();
let { navItems } = storeToRefs(useNavStore());
watch(isLogin, () => {
    loadNavMenu(isLogin.value)
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
    width: 100%;
    height: 100%;
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
            margin: 12px 18px;
            text-align: center;
            width: 60px;

            img {
                display: block;
                padding: 18px;
                background-color: #fff;
                width: 60px;
                height: 60px;
                border-radius: 15px;
                background-color: var(--bgColorDefaut);
                overflow: hidden;
                cursor: pointer;
                box-shadow: var(--shadow);

                // 
                &:hover {
                    box-shadow: var(--activeShadow);
                }
            }

            .nav-item-name {
                display: block;
                width: 60px;
                padding-top: 12px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: var(--fontColorDefaut);
                line-height: 12px;
            }
        }
    }
}
</style>