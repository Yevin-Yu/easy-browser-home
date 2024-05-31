<template>
  <div class="nav">
    <h1 class="title"></h1>
    <div class="search">
      <div class="seach-engine" :style="{ top: styleTop() }">
        <div :style="{ visibility: item.active ? 'visible' : '' }" v-for="item in searchEngineList" :key="item.name" @click="selectSearchEngine(item)">
          {{ item.name }}
        </div>
      </div>
      <input type="search" v-model="searchKey" @keyup.enter="clickSearch" />
      <button @click="clickSearch">Search</button>
    </div>
    <div class="content">
      <div class="tab-btn">
        <button>待办列表</button>
        <button>备忘录</button>
      </div>
      <div class="left-content">
        <div class="title">Todo</div>
        <div class="centont-todo-list">
          <div class="left-list">1</div>
          <div class="right-main">2</div>
        </div>
      </div>
      <div class="right-content">
        <div class="title">Memo</div>
        <div class="centont-memo">
          <div class="left-list">1</div>
          <div class="right-main">2</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="link-list">
        <button v-for="item in linlList" :key="item.name" @click="go(item)">
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navIndex",
  props: {
    msg: String,
  },
  data() {
    return {
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
  },
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 100%;
  background-image: url("bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow-x: hidden;
  /* background: linear-gradient(90deg, #ebbd9288 0, #a96aa288 58%);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px); */
}
h1.title {
  visibility: hidden;
  padding: 0;
  margin: 0 auto;
  padding-top: 1%;
  color: rgba(255, 255, 255, 0.6);
}


.nav .search {
  z-index: 99;
  width: 38vw;
  margin: 20vh auto 0;
  height: 52px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
  position: relative;
}

.nav .search input {
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
  font-size: 22px;
}
.nav .search button {
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
.nav .search button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}
.nav .search button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}
.nav .search .seach-engine {
  position: absolute;
  transition: 0.3s;
}
.nav .search .seach-engine div {
  cursor: pointer;
  width: 80px;
  visibility: hidden;
  line-height: 32px;
  color: transparent;
  background-image: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
  background-clip: text;
}
.nav .search .seach-engine:hover div {
  visibility: visible;
}

.nav .content {
  width: 68vw;
  height: 50vh;
  background-color: #fff;
  margin: 10vh auto;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
  display: flex;
  position: relative;
}
.nav .content .tab-btn{
  position: absolute;
  left: -30px;
  top: 0px;
  display: none;
}
.nav .content .tab-btn button{
  display: block;
  width: 25px;
  height: 80px;
  background: linear-gradient(90deg, #ebbd9286 0, #a96aa284 58%);
}
.nav .content .title{
  margin: 0 auto;
  width: 80px;
  background-color: #fff;
  background: linear-gradient(90deg, #ebbd9286 0, #a96aa284 58%);
  border-radius: 4px;
  color: #fff;
  padding: 6px;
  backdrop-filter: blur(5px);
  letter-spacing: 2px;
}
.nav .content .left-list{
  background-color: pink;
  width: 200px;
}
.nav .content .right-main{
  background-color: #fff;
  flex: 1;
}
.nav .content .centont-todo-list,
.nav .content .centont-memo{
  display: flex;
}
.nav .content .left-content {
  padding: 16px;
  width: 50%;
  height: 100%;
  /* background-color: pink; */
  flex: 1;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
}
.nav .content .right-content {
  padding: 16px;
  width: 50%;
  height: 100%;
  /* background-color: red; */
  flex: 1;
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
}

.nav .right {
  z-index: 99;
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  width: 200px;
  height: 70%;
  top: 20vh;
  background-color: transparent;
  transition: 0.3s;
  right: -160px;
  cursor: pointer;
  padding-left: 50px;
  box-sizing: border-box;
}
.nav .right:hover {
  right: 0px;
}
.nav .right .link-list {
  border-radius: 12px;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: -5px 5px 5px rgba(255, 255, 255, 0.2);
  overflow: auto;
  padding-top: 12px;
}

.nav .right .link-list::-webkit-scrollbar {
  display: none;
}
.nav .right .link-list button {
  min-width: 100px;
  text-align: center;
  outline: none;
  border: none;
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
  border-radius: 4px;
  color: #fff;
  padding: 8px 12px;
  backdrop-filter: blur(5px);
  cursor: pointer;
  letter-spacing: 2px;
  margin: 6px;
}
.nav .right .link-list button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}
.nav .right .link-list button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
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
  .nav .content .tab-btn{
    display: block;
  }
  .nav .content .left-content{
    width: 100%;
    display: block;
  }
  .nav .content .right-content{
    width: 100%;
    display: none;
  }
}
</style>
