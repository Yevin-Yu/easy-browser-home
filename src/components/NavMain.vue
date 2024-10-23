<template>
    <div class="nav-main">
        <ul>
            <li v-for="item in store.navMenu" @click="go(item)" :key="item.name">
                <div>
                    <img :src="item.iconPath" alt="icon" />
                </div>
                <span class="nav-item-name">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
// 引入Stores
import { useMyStoreHook } from "@/stores/useStore";
let store = useMyStoreHook();

onMounted(() => {
    const navMenu = JSON.parse(localStorage.getItem("navMenu"));
    if (navMenu) store.navMenuChange(navMenu);
});
function go(item) {
    window.open(item.linkPath);
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
        display: inline-block;
        padding-left: 0;

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
        .nav-item-name{
            font-size: 16px;
        }
    }
}
</style>