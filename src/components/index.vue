<template>
  <div class="nav">
    <h1 class="title">IYUWB-NAV</h1>
    <div class="search">
      <div class="seach-engine" :style="{ top: styleTop() }">
        <div
          :style="{ visibility: item.active ? 'visible' : 'hidden' }"
          v-for="item in searchEngineList"
          :key="item.name"
          @click="selectSearchEngine(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <input type="text" v-model="searchKey"/>
      <button @click="clickSearch">Search</button>
    </div>
    <div class="content"></div>
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
    },
    selectSearchEngine(item) {
      this.searchEngineList.map((it) => (it.active = false));
      item.active = true;
    },
    styleTop() {
      let index = this.searchEngineList.findIndex((it) => it.active);
      return `-${index * 52}px`;
    },
  },
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  background: #ebbd92;
  background: linear-gradient(90deg, #ebbd9288 0, #a96aa288 58%);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
h1.title {
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
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
  position: relative;
}

.nav .search input {
  padding-left: 60px;
  padding-right: 60px;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #a96aa2;
  line-height: 52px;
  height: 52px;
  width: 80%;
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
  line-height: 52px;
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
  margin: 5vh auto;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  backdrop-filter: blur(5px);
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
}
</style>
