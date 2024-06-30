<template>
  <div class="content">
    <NavCenter></NavCenter>
  </div>
</template>
<script setup lang="ts">
import NavCenter from "@/components/NavCenter.vue";
</script>

<style scoped>
 .content {
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

 .content::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

 .content::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: linear-gradient(0deg, #ebbd92 0, #a96aa2 58%);
}
</style>
