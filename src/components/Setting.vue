<template>
    <el-dialog class="setting" style="height: calc(100% - 100px);" v-model="isShow" :close-on-click-modal="false" :modal="false"
        top="50px" title="设置" width="calc(100% - 180px)" :before-close="closeDialog">
        <div class="setting-content">
            <h1>123</h1>
            <h1>123</h1>
            <h1>123</h1>
            <h1>123</h1>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const isShow = ref(false)
onMounted(() => {
    isShow.value = true
})
// 
function closeDialog() {
    isShow.value = false
    // 跳转到首页
    router.push('/');
}
</script>

<style lang="less" scoped>
.setting {

    .setting-content {}
}
</style>