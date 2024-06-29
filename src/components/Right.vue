<template>
  <div class="right">
    <div class="link-list">
      <h3>导航列表</h3>
      <button v-for="item in linkList" :key="item.name" @click="go(item)">
        <span class="img">
          <img  height="26px"  src="https://img.alicdn.com/imgextra/i3/O1CN01sffRIx1nb3dXCKdFC_!!6000000005107-2-tps-1024-1024.png" alt="">
        </span>
        <span class="text">
          {{ item.name }}
        </span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const linkList = ref([
  { name: "文心一言", link: "https://yiyan.baidu.com/" },
  { name: "GITHUB", link: "https://github.com/" },
  { name: "MDN", link: "https://developer.mozilla.org/" },
  { name: "微信读书", link: "https://weread.qq.com/" },
  { name: "Bilibili", link: "https://bilibili.com/" },
  { name: "抖音", link: "https://douyin.com/" },
  { name: "怡然博客", link: "http://r.yuwb.cn/" },
  { name: "耶温博客", link: "http://yuwb.cn/" },
]);
function go(item) {
  window.open(item.link);
}
</script>
<style  scoped>
.right {
  z-index: 99;
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  width: 350px;
  height: 70%;
  top: 20vh;
  background-color: transparent;
  transition: 0.5s;
  right: -300px;
  cursor: pointer;
  padding-left: 80px;
  box-sizing: border-box;
}

.right:hover {
  right: 0px;
}
.right .link-list h3{
  margin-top: 10px;
  font-size: 16px;
  color: #ccc;
  padding-left: 16px;
}
.right .link-list {
  border-radius: 24px 0 0 24px;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: -5px 5px 5px rgba(255, 255, 255, 0.2);
  overflow: auto;
  padding-top: 12px;
  font-size: 12px;
}
.right .link-list .text{
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 6px;
}

.right .link-list::-webkit-scrollbar {
  display: none;
}

.right .link-list button {
  width: calc(50% - 24px);
  text-align: center;
  outline: none;
  border: none;
  background: linear-gradient(90deg, rgba(235, 189, 146, 0.76) 0, rgba(165, 106, 169, 0.29) 58%);
  border-radius: 4px;
  color: #fff;
  backdrop-filter: blur(5px);
  cursor: pointer;
  letter-spacing: 2px;
  margin: 12px;
  box-sizing: border-box;
}
.right .link-list button .img{
  margin:6px;
  display: inline-block;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.33);
  backdrop-filter: blur(5px);
}
.right .link-list button .img img{
  position: relative;
  top: 8px;
}
.right .link-list button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

.right .link-list button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}
</style>
