<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
    <RouterView />
</template>

<style>
html,
body,
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#app {
    overflow: hidden;
    background-color: var(--bgColor);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url(/app-bg.png);
}
</style>
