<template>
    <div class="search-main">
        <img src="@/assets/icon/search.svg" alt="icon" class="icon" />
        <input ref="searchRef" type="text" v-model="searchKey" @keyup.enter="onSearch" />
        <button @click="onSearch">搜索</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// 引入Stores
import { useMyStoreHook } from "@/stores/useStore";
let store = useMyStoreHook();

// 搜索
let searchKey = ref("");
function onSearch() {
    if (store.searchEngine === 1) window.open(`https://www.bing.com/search?q=${searchKey.value}`);
    else if (store.searchEngine === 2) window.open(`https://www.google.com.hk/search?q=${searchKey.value}`);
    else if (store.searchEngine === 3) window.open(`https://duckduckgo.com/?t=h_&q=${searchKey.value}&ia=web`);
    else if (store.searchEngine === 4) window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${searchKey.value}`);
    searchKey.value = "";
}

// 自动获取焦点
const searchRef = ref<HTMLInputElement | null>(null); 
onMounted(() => {
    // 默认引擎
    const searchEngine = localStorage.getItem("searchEngine");
    if (searchEngine) store.searchEngineChange(parseInt(searchEngine));
    // 默认焦点
    if (searchRef.value) searchRef.value.focus();
    window.addEventListener("focus", function () {
        console.log("页面获得焦点");
        // 执行页面获得焦点时的操作
        if (searchRef.value) searchRef.value.focus();
    });
});
</script>

<style lang="less" scoped>
.search-main {
    position: relative;
    margin: 0 auto;
    width: 50vw;
    color: var(--searchFontColor);

    input[type="text"] {
        font-size: 22px;
        padding: 0 120px 0 80px;
        height: 55px;
        outline: none;
        border: none;
        width: 50vw;
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

// 移动端
.isMobile {
    .search-main {
        width: 80vw;

        input[type="text"] {
            width: 80vw;
        }
    }
}
</style>