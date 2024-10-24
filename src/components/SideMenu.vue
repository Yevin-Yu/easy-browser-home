<template>
    <div class="side-menu">
        <ul>
            <li @click.stop="onSideMenu(item)" :class="{'active':item.value === store.activeMenuId}" v-for="item in sideMenuList" :key="item.value">
                {{item.label}}
            </li>
        </ul>
    </div>
</template>
<script setup>
// 引入Stores
import { useMyStoreHook } from "@/stores/useStore";
let store = useMyStoreHook();



// SideMenu
import { reactive } from "vue";
const sideMenuList = reactive([
    { value: 1, label: "首页" },
    { value: 2, label: "导航" },
    { value: 3, label: "新闻" },
    { value: 4, label: "笔记" },
    { value: 5, label: "设置" },
]);
function onSideMenu(item) {
    store.activeMenuIdChange(item.value);
}
</script>
<style lang="less" scoped>
.side-menu {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    ul {
        list-style: none;
        padding: 0;
        li {
            transition: 0.5s;
            box-sizing: border-box;
            color: var(--sideFontColor);
            cursor: pointer;
            width: 45px;
            font-size: 16px;
            padding: 16px;
            margin-bottom: 18px;
            border-radius: 0 10px 10px 0;
            backdrop-filter: var(--sideFilter);
            border: var(--sideBoder);
            background: var(--sideBg);
            box-shadow: var(--sideShadow);
            transition: box-shadow 0.5s ease;
        }
        li.active {
            box-shadow: var(--sideShadowActive);
        }
        li:hover,
        li:active {
            box-shadow: var(--sideShadowActive);
        }
    }
}
</style>
