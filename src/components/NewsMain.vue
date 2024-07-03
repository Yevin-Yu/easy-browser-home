<template>
    <div class="news-main">
        <div class="item-card" v-for="it in TYPE" :key="it">
            <div v-if="data[it]">
                <div class="title">{{data[it].title}}</div>
                <ul>
                    <li v-for="(item,index) in data[it].data.slice(0,10) " :key="item.id">
                        <span :style="{'background-color':colors[index]}">{{index+1}}</span>
                        <a :href="item.url" target="_blank"> {{item.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { reactive } from "vue";
const colors = ["#ea444d", "#ed702d", "#eead3f"];
const TYPE = ["juejin", "weibo", "douyin", "zhihu", "bilibili", "36kr", "baidu", "sspai", "ithome", "toutiao", "thepaper", "tieba"];
const data = reactive({});
TYPE.forEach((item) => {
    fetch(`https://api-hot.efefee.cn/${item}?cache=true`)
        .then((res) => res.json())
        .then((res) => (data[item] = res));
});
</script>
  
<style lang="less" scoped>
.news-main::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.news-main::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
    box-shadow: var(--shadow);
}
.news-main {
    width: 85vw;
    height: 55vh;
    margin: 7.5vh auto;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item-card {
        flex: 1;
        min-width: 280px;
        height: 400px;
        margin: 10px;
        margin-bottom: 20px;
        border-radius: 15px;
        background: var(--bgColorDefaut);
        box-shadow: var(--shadow);
        border: var(--border);
        color: var(--fontColor);
        padding: 12px;
        .title {
            font-size: 18px;
            margin-bottom: 10px;
        }
        ul {
            padding: 10px;
            list-style: none;
            padding: 0;
            li {
                font-size: 16px;
                line-height: 34px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                position: relative;
                padding-left: 32px;
                span {
                    position: absolute;
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    top: 6px;
                    left: 0;
                    line-height: 24px;
                    text-align: center;
                    border-radius: 5px;
                    background-color: #ccc;
                }
                a {
                    color: var(--fontColor);
                    text-decoration: none;
                }
            }
        }
    }
}
</style>