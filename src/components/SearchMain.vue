<template>
    <div class="search-main">
        <img src="@/assets/icon/search.svg" alt="icon" class="icon" />
        <input type="text" />
        <button>搜索</button>
    </div>
</template>
  
<script setup>
</script>
  
<style lang="less" scoped>
.search-main {
    position: relative;
    margin: 0 auto;
    width: 50vw;
    color: var(--searchFontColor);
    input[type="text"] {
        font-size: 22px;
        padding: 0 120px 0 80px;
        height: 55px;
        outline: none;
        border: none;
        width: 50vw;
        border-radius: 55px;
        background: var(--searchInputBg);
        box-shadow: var(--searchShadow);
    }
    .icon {
        position: absolute;
        left: 24px;
        top: 18px;
    }
    button {
        font-size: 16px;
        outline: none;
        border: none;
        width: 105px;
        cursor: pointer;
        position: absolute;
        right: 1px;
        top: 1px;
        height: 53px;
        border-radius: 55px;
        color:var(--searchBtColor);
        background: var(--searchBtnBg);
        box-shadow: var(--searchShadow);
    }
}
</style>