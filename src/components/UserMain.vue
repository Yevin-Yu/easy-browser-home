<template>
    <div class="user-main">
        <img src="@/assets/images/user.jpg" alt="user">
        <span>于文博</span>
    </div>
</template>
  
<script setup>
</script>
  
<style lang="less" scoped>
.user-main {
    cursor: pointer;
    width: 130px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    right: 24px;
    top: 24px;
    border-radius: 55px;
    background: var(--bgColorDefaut);
    box-shadow: var(--shadow);
    border: var(--border);
    color: var(--fontColor);
    img{
        width: 30px;
        height: 30px;
        position: relative;
        background-color: pink;
        border-radius: 50%;
        position: relative;
        top: -6px;
        margin-left: 12px;
    }
    span{
        text-align: center;
        font-size: 14px;
        display: inline-block;
        width: 80px;
        padding: 0 10px 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }   
}
</style>