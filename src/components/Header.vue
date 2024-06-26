<template>
    <div class="header">
        <div class="title">耶温导航</div>
        <div class="setting">
            <img src="@/assets/set.svg" height="18px" alt="set">
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>
.header {
    color: #fff;
    width: 100%;
    padding: 12px;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 24px;
    display: flex;
    justify-content: space-between;

    .title {
        visibility: hidden;
        font-size: 24px;
    }

    .setting {
        img {
            cursor: pointer;
        }
    }
}
</style>
