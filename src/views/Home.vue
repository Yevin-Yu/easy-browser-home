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
      <div class="left-content">
        <div class="title">Todo</div>
        <div class="centont-todo-list">
          <div class="left-list">
            <div @click="todoItemClick(item)" v-for="item in 20" :key="item" :class="{'left-list-item':true,active:item===todoActive}">
              ToDo List 工作任务ToDo List 工作任务
            </div>
          </div>
          <div class="right-main" tabindex="1">
            <el-input v-model="text"  maxlength="10" placeholder="Name" show-word-limit type="text" />
          </div>
        </div>
      </div>
      <div class="right-content">
        <div class="title">Memo</div>
        <div class="centont-memo">
          <div class="left-list">
            <div @click="memoItemClick(item)" v-for="item in 10" :key="item" :class="{'left-list-item':true,active:item===memoActive}">
              ToDo List 工作任务ToDo List 工作任务
            </div>
          </div>
          <div class="right-main" tabindex="1">
            <textarea class="memo-textarea" v-model="textarea"></textarea>
          </div>
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
    <div class="setting"></div>
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
  overflow: auto;
}
.nav .content::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  background-color: transparent;
}
.nav .content::-webkit-scrollbar-thumb{
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: linear-gradient(0deg, #ebbd92 0, #a96aa2 58%);
}

.nav .content .title{
  margin: 0 auto;
  width: 60%;
  background-color: #fff;
  background: linear-gradient(90deg, #ebbd9286 0, #a96aa284 58%);
  border-radius: 4px;
  color: #fff;
  padding: 4px;
  backdrop-filter: blur(5px);
  letter-spacing: 2px;
  font-size: 18px;
  margin-bottom: 10px;
}
.nav .content .left-list{
  background-color: #ffffff88;
  width: 200px;
  height: 100%;
  border-radius: 4px;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
}
.nav .content .left-list::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  background-color: transparent;
}
.nav .content .left-list::-webkit-scrollbar-thumb{
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: linear-gradient(0deg, #ebbd92 0, #a96aa2 58%);
}
.nav .content .left-list .left-list-item{
  margin: 5px 5px 10px 10px;
  color: #fff;
  font-size: 14px;
  line-height: 28px;
  border-radius: 8px;
  background: linear-gradient(90deg, #ebbd9286 0, #a96aa284 58%);
  overflow: hidden;
  padding:0 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  left: 0;
}
.nav .content .left-list .left-list-item.active{
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
  left: 15px;
  line-height: 38px;
  border-radius: 8px 0 0 8px;
}
.nav .content .right-main{
  height: 100%;
  width: 100%;
  background-color: #ffffff88;
  flex: 1;
  overflow: auto;
  border-radius: 4px;
  margin-left: 2px;
  box-sizing: border-box;
  overflow: hidden;
}
.nav .content .centont-todo-list .right-main{
  padding: 12px;
}
.nav .content .right-main:focus{
  box-shadow: 0 0px 3px 3px #a96aa2b0  inset;
}
.nav .content .right-main .memo-textarea{
  margin: 0;
  outline: none;
  border: none;
  width: 100%;
  height: 100% ;
  border-radius: 4px;
  font-size: 18px;
  background-color: transparent;
  color: #333;
  line-height: 26px;
  box-sizing: border-box;
  padding: 10px;
  resize: none;
}
.nav .content .right-main  .memo-textarea:focus
{
  box-shadow: 0 0px 3px 3px #a96aa2b0  inset;
}
.nav .content .right-main  .memo-textarea::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  background-color: transparent;
}
.nav .content .right-main  .memo-textarea::-webkit-scrollbar-thumb{
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: linear-gradient(0deg, #ebbd92 0, #a96aa2 58%);
}
.nav .content .centont-todo-list,
.nav .content .centont-memo{
  display: flex;
  height:calc(100% - 40px);
}
.nav .content .left-content {
  padding: 12px;
  width: 50%;
  height: 100%;
  /* background-color: pink; */
  flex: 1;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
}
.nav .content .right-content {
  padding: 12px;
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
