<template>
    <div class="search">
        <div class="seach-engine" :style="{ top: styleTop() }">
            <div :style="{ visibility: item.active ? 'visible' : '' }" v-for="item in searchEngineList" :key="item.name"
                @click="selectSearchEngine(item)">
                {{ item.name }}
            </div>
        </div>
        <input ref="searchRef" type="search" v-model="searchKey" @keyup.enter="clickSearch" />
        <button @click="clickSearch">Search</button>
    </div>
</template>
<script setup>
import { onMounted, ref, watchEffect } from 'vue'
let searchKey = ref('')
const searchEngineList = ref([
    { name: "百度", active: true },
    { name: "Duck2Go", active: false },
    { name: "Google", active: false },
    { name: "Bing", active: false },
])

let searchRef = ref(null)   
onMounted(() => {
    searchRef.value.focus();
    window.addEventListener('focus', function () {
        console.log('页面获得焦点');
        // 执行页面获得焦点时的操作   
        searchRef.value.focus();
    });
})
function styleTop() {
    let index = searchEngineList.value.findIndex((it) => it.active);
    return index ? `-${(index * 32) - 10}px` : '10px';
}
function selectSearchEngine(item) {
    searchEngineList.value.map((it) => (it.active = false));
    item.active = true;
}
function clickSearch() {
    let { name } = searchEngineList.value.find((it) => it.active);
    if (name === "百度") {
        window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${searchKey.value}`);
    } else if (name === "Google") {
        window.open(`https://www.google.com.hk/search?q=${searchKey.value}`);
    } else if (name === "Bing") {
        window.open(`https://www.bing.com/search?q=${searchKey.value}`);
    } else if (name === "Duck2Go") {
        window.open(`https://duckduckgo.com/?t=h_&q=${searchKey.value}&ia=web`);
    }
    searchKey.value = "";
}
</script>
<style scoped>
.search {
    z-index: 99;
    width: 45vw;
    margin: 20vh auto 0;
    height: 52px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 12px;
    box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
    position: relative;
}

.search:focus-within {
    box-shadow: 5px 5px 15px #a96aa2da;
}

.search input {
    padding-left: 80px;
    padding-right: 100px;
    box-sizing: border-box;
    outline: none;
    border: none;
    color: #a96aa2;
    line-height: 52px;
    height: 52px;
    width: 100%;
    background-color: transparent;
    font-size: 18px;
}

.search button {
    outline: none;
    border: none;
    background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
    border-radius: 4px;
    color: #fff;
    padding: 8px 12px;
    backdrop-filter: blur(5px);
    cursor: pointer;
    letter-spacing: 2px;
    position: absolute;
    top: 10px;
    right: 12px;
}

.search button:hover {
    background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

.search button:active {
    background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}

.search .seach-engine {
    position: absolute;
    transition: 0.3s;
    -webkit-tap-highlight-color: transparent;
}

.search .seach-engine div {
    text-align: center;
    cursor: pointer;
    width: 80px;
    visibility: hidden;
    line-height: 32px;
    color: transparent;
    background-image: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
    background-clip: text;
}

.search .seach-engine:hover div {
    visibility: visible;
}
</style>
