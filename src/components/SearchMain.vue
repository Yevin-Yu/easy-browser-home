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
import { ref, onMounted } from "vue";
// 引入导航组件
import NavMain from "@/components/NavMain.vue";
// 搜索
let searchKey = ref("");
function onSearch() {
    window.open(`https://www.bing.com/search?q=${searchKey.value}`);
}
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
    }
}
</style>