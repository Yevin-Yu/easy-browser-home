<template>
    <div class="user-main" @click="go">
        <img src="@/assets/images/user.jpg" alt="user">
        <span v-if="!isMobile">耶温导航</span>
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
// 获取是否是移动端
const isMobile = inject<boolean>('isMobile');

function go() {
    window.open('https://github.com/iyuwb/browser-nav-front')
}
</script>

<style lang="less" scoped>
.user-main:hover,
.user-main:active {
    box-shadow: var(--sideShadowActive);
}

.user-main {
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    position: absolute;
    right: 24px;
    top: 24px;
    border-radius: 55px;
    background: var(--bgColorDefaut);
    box-shadow: var(--shadow);
    border: var(--border);
    color: var(--fontColor);
    padding: 0 12px;

    img {
        width: 30px;
        height: 30px;
        position: relative;
        background-color: pink;
        border-radius: 50%;
        position: relative;
        top: -3px;
        vertical-align: middle;
    }

    span {
        text-align: center;
        font-size: 14px;
        display: inline-block;
        width: 80px;
        padding: 0 10px 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: top;
    }
}
</style>