<script setup>
import { ref } from "vue";
import { useMainStore } from "@/stores/useMainStore";

const mainStore = useMainStore();
const linkList = ref([
  { name: "文心一言", link: "https://yiyan.baidu.com/" },
  { name: "GITHUB", link: "https://github.com/" },
  { name: "MDN", link: "https://developer.mozilla.org/" },
  { name: "微哈哈哈哈哈哈啊哈信读书", link: "https://weread.qq.com/" },
  { name: "Bilibili", link: "https://bilibili.com/" },
  { name: "抖音", link: "https://douyin.com/" },
  { name: "怡然博客", link: "http://r.yuwb.cn/" },
  { name: "耶温博客", link: "http://yuwb.cn/" },
]);

function go(item) {
  window.open(item.link);
}

function delNavItem() {
  console.log(123);
}

function isAddNav() {

}
</script>

<template>
  <div>
    <h3 class="title">导航列表 </h3>
    <div class="nav-center">
      <button class="button" v-for="item in linkList" :key="item.name" @click="go(item)">
        <el-button @click.stop="delNavItem" v-if="mainStore.isEditNav" class="close" circle>
          <img height="12px" src="@/assets/close.svg" alt="close">
        </el-button>
        <span class="img">
          <img height="26px"
               src="https://img.alicdn.com/imgextra/i3/O1CN01sffRIx1nb3dXCKdFC_!!6000000005107-2-tps-1024-1024.png"
               alt="icon">
        </span>
        <span class="text">
            {{ item.name }}
         </span>
      </button>
      <button v-if="mainStore.isEditNav" class="button add-nav" @click="isAddNav()">
        <span class="img">
          <img height="26px" src="@/assets/add.svg" alt="icon">
        </span>
        <span class="text">
            添加新导航
         </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.title {
  padding-left: 16px;
  margin-top: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: normal;
}

.close {
  width: 24px;
  height: 24px;
  outline: none;
  border: none;
  position: absolute;
  right: 6px;
  top: 6px;
  background-color: rgba(255, 255, 255, 0.4);
  color: #fff;
}

.nav-center {
  display: flex;
  flex-wrap: wrap;
}

.nav-center .text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 12px 12px;
  font-size: 12px;
}


.nav-center .button {
  position: relative;
  flex: 1;
  min-width: 100px;
  text-align: center;
  outline: none;
  border: none;
  background: linear-gradient(90deg, rgba(235, 189, 146, 0.76) 0, rgba(165, 106, 169, 0.29) 58%);
  border-radius: 16px;
  color: #fff;
  backdrop-filter: blur(5px);
  cursor: pointer;
  letter-spacing: 2px;
  margin: 12px;
  box-sizing: border-box;
}

.nav-center .button.add-nav {
  background: linear-gradient(90deg, rgb(235, 189, 146) 0, rgb(165, 106, 169) 58%);
}

.nav-center .button .img {
  margin: 12px;
  display: inline-block;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.33);
  backdrop-filter: blur(5px);
}

.nav-center .button .img img {
  position: relative;
  top: 8px;
}

.nav-center .button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

.nav-center .button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}

</style>