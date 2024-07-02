<template>
    <div class="side-menu">
        <ul>
            <li class="active">首页</li>
            <li>导航</li>
            <li>待办</li>
            <li>笔记</li>
            <li>设置</li>
        </ul>
    </div>
</template>
<script setup>
// 主题切换
import { useTheme } from "@/hook/useTheme";
const { toggleTheme } = useTheme();
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
        }
        li.active {
            box-shadow: var(--sideShadowActive);
        }
    }
}
.dark-theme {
    .side-menu {
        li {
            backdrop-filter: var(--sideFilter);
            border: var(--sideBoder);
            background: var(--sideBg);
            box-shadow: var(--sideShadow);
        }
        li.active {
            background: var(--sideBgActive);    
        }
    }
}
</style>
