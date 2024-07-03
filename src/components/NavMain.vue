<template>
    <div class="nav-main">
        <ul>
            <li v-for="item in 10" :key="item">
                <div>
                    <img src="@/assets/images/user.jpg" alt="icon" />
                </div>
                <span>啊哈哈哈</span>
            </li>
            <li>
                <div>
                    <img src="@/assets/icon/add.svg" alt="icon" />
                </div>
            </li>
        </ul>
    </div>
</template>
  
<script setup>
</script>
  
<style lang="less" scoped>
.nav-main::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

.nav-main::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px;
    border-radius: 2px;
    background-color: #ccc;
    box-shadow: var(--shadow);
}
.nav-main {
    width: 70vw;
    height: 50vh;
    // background-color: #fff;
    margin: 7.5vh auto;
    overflow: auto;

    ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        li {
            display: inline-block;
            margin: 12px 25px;
            text-align: center;
            flex: 1;
            div {
                cursor: pointer;
                border-radius: 17px;
                min-width: 80px;
                height: 80px;
                border: var(--border);
                background-color: var(--bgColorDefaut);
                box-shadow: var(--shadow);
                img {
                    width: 50px;
                    height: 50px;
                    margin: 13px;
                    border-radius: 15px;
                    background-color: #fff;
                }
            }
            div:hover,div:active{
                box-shadow: var(--sideShadowActive);
            }
            span {
                width: 80px;
                display: inline-block;
                margin-top: 12px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: var(--fontColor);
            }
        }
       
    }
}
</style>