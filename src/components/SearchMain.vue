<template>
    <div class="search-main">
        <img src="@/assets/icon/search.svg" alt="icon" class="icon" />
        <input ref="searchRef" type="text" v-model="searchKey" @keyup.enter="onSearch" />
        <button @click="onSearch">搜索</button>
    </div>
    <div class="nav-list">
        <NavMain />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 引入导航组件
import NavMain from "@/components/NavMain.vue";
// 搜索
let searchKey = ref("");
function onSearch() {
    window.open(`https://www.bing.com/search?q=${searchKey.value}`);
}
//  快捷键 空格 快速回到主页 并focus 搜索框
import { useRouter } from 'vue-router';
const router = useRouter();
const searchRef = ref<HTMLInputElement | null>(null);

// 获取屏幕尺寸 低于500式 为移动端
const isMobile = ref(false)
const screenWidth = ref(document.documentElement.clientWidth)
if (screenWidth.value < 500) {
    isMobile.value = true
}
router.afterEach((to) => {
    if (!isMobile.value) if (to.path === '/') searchRef.value?.focus();
});
</script>

<style lang="less" scoped>
.search-main {
    position: relative;
    margin: 0 auto;
    width: 50%;
    color: var(--searchFontColor);

    input[type="text"] {
        font-size: 22px;
        padding: 0 120px 0 80px;
        height: 55px;
        outline: none;
        border: none;
        width: 100%;
        border-radius: 55px;
        background: var(--searchInputBg);
        box-shadow: var(--searchShadow);
    }

    .icon {
        position: absolute;
        left: 24px;
        top: 18px;
    }

    button {
        font-size: 16px;
        outline: none;
        border: none;
        width: 105px;
        cursor: pointer;
        position: absolute;
        right: 1px;
        top: 1px;
        height: 53px;
        border-radius: 55px;
        color: var(--searchBtColor);
        background: var(--searchBtnBg);
        box-shadow: var(--searchShadow);
        transition: box-shadow 0.5s ease;
    }

    button:hover,
    button:active {
        box-shadow: var(--sideShadowActive);
    }
}

.nav-list {
    margin: 50px auto 0;
    width: 60%;
    height: calc(100% - 450px);
    box-sizing: border-box;
    overflow-y: auto;
    border-radius: 12px;
}

// 媒体查询
@media screen and (max-width: 768px) {
    .search-main {
        width: 90%;
    }

    .nav-list {
        width: 90%;
        height: calc(100% - 400px);
    }
}
</style>