<template>
  <div class="nav">
    <!-- 搜索部分 -->
    <Search></Search>
  </div>
</template>

<script setup>
import Search from '../components/Search.vue'
</script>
<!-- <script>
export default {
  name: "navIndex",
  props: {
    msg: String,
  },
  data() {
    return {
      text:"",
      textarea:"",
      searchKey: "",
      searchEngineList: [
        { name: "BaiDu", active: true },
        { name: "Google", active: false },
        { name: "Bing", active: false },
        { name: "Douyin", active: false },
        { name: "Bili", active: false },
      ],
      linlList: [
        { name: "文心一言", link: "https://yiyan.baidu.com/" },
        { name: "GITHUB", link: "https://github.com/" },
        { name: "MDN", link: "https://developer.mozilla.org/" },
        { name: "微信读书", link: "https://weread.qq.com/" },
        { name: "Bilibili", link: "https://bilibili.com/" },
        { name: "抖音", link: "https://douyin.com/" },
        { name: "怡然博客", link: "http://r.yuwb.cn/" },
        { name: "耶温博客", link: "http://yuwb.cn/" },
      ],
      tabActive:0,
      todoActive:1,
      memoActive:1,
    };
  },
  methods: {
    clickSearch() {
      let { name } = this.searchEngineList.find((it) => it.active);
      if (name === "BaiDu") {
        window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${this.searchKey}`);
      } else if (name === "Google") {
        window.open(`https://www.google.com.hk/search?q=${this.searchKey}`);
      } else if (name === "Bing") {
        window.open(`https://www.bing.com/search?q=${this.searchKey}`);
      } else if (name === "Douyin") {
        window.open(`https://www.douyin.com/search/${this.searchKey}`);
      } else if (name === "Bili") {
        window.open(
          `https://search.bilibili.com/all?keyword=${this.searchKey}`
        );
      }
      this.searchKey = "";
    },
    selectSearchEngine(item) {
      this.searchEngineList.map((it) => (it.active = false));
      item.active = true;
    },
    styleTop() {
      let index = this.searchEngineList.findIndex((it) => it.active);
      return index? `-${(index * 32) - 10}px`:'10px';
    },
    go(item) {
      window.open(item.link);
    },
    tabBtn(active){
      this.active = active
    },
    todoItemClick(item){
      this.todoActive = item
    },
    memoItemClick(item){
      this.memoActive = item
    }
  },
};
</script> -->

<style scoped>
.nav {
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url("bg.png");
  background-color: #000000;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow-x: hidden;
}

@media (max-width:1000px) {
  .nav .search {
    z-index: 99;
    width: 80vw;
  }
  .nav .content {
    width: 80vw;
  }
  .nav .search input{
    padding-right: 20px;
  }
  .nav .search button{
    display: none;
  }
}
@media (max-width:1200px) {
  .nav .content {
    display: block;
  }
  .nav .content .left-content{
    width: 100%;
    border-right: 2px solid transparent;

  }
  .nav .content .right-content{
    width: 100%;
    border-left: 2px solid transparent;
  }
}
@media (max-width:600px) {
  .nav .content .left-list{
    width: 120px;
  }
  .nav .content {
    height: 60vh;
  }
}
</style>
