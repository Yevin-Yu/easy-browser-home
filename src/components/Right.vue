<template>
  <div class="right">
    <div class="link-list">
      <button v-for="item in linlList" :key="item.name" @click="go(item)">
        {{ item.name }}
      </button>
    </div>
  </div>
</template>
<script setup>


</script>
<style lang="scss" scoped>
.right {
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

.right .link-list button:hover {
  background: linear-gradient(90deg, #ebbd92aa 0, #a96aa2bb 58%);
}

.right .link-list button:active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
}
</style>
