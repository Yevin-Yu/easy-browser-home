<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
#app {
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--bgColor);
  /* background-image: url('@/assets/images/banner.jpg'); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
