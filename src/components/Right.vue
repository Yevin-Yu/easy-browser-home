<template>
  <div class="right">
    <div class="link-list">
      <button v-for="item in linkList" :key="item.name" @click="go(item)">
        <div class="img">
          <img  height="32px"  src="https://img.alicdn.com/imgextra/i3/O1CN01sffRIx1nb3dXCKdFC_!!6000000005107-2-tps-1024-1024.png" alt="">
        </div>
        <br/>{{ item.name }}
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

.right .link-list {
  border-radius: 12px;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: -5px 5px 5px rgba(255, 255, 255, 0.2);
  overflow: auto;
  padding-top: 12px;
}

.right .link-list::-webkit-scrollbar {
  display: none;
}

.right .link-list button {
  width: 100px;
  text-align: center;
  outline: none;
  border: none;
  background: linear-gradient(90deg, rgb(235, 189, 146) 0, rgb(169, 106, 162) 58%);
  border-radius: 4px;
  color: #fff;
  padding: 8px 12px;
  backdrop-filter: blur(5px);
  cursor: pointer;
  letter-spacing: 2px;
  margin: 6px;
}
.right .link-list button .img{
  margin-bottom: 12px;
  display: inline-block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.33);
  backdrop-filter: blur(5px);
}
.right .link-list button .img img{
  position: relative;
  top: 9px;
}
.right .link-list button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

.right .link-list button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}
</style>
