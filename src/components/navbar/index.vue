<template>
  <div class="navbar">
    <div class="collapsed">
      <el-icon v-if="collapsed" @click="onExpand"><Expand /></el-icon>
      <el-icon v-else @click="onFold"><Fold /></el-icon>
    </div>
    <div class="tool">
      <el-icon
        class="refresh"
        :class="isload ? 'isload' : ''"
        @click="onRefresh"
      >
        <Refresh />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useAppStore from '@/store/modules/app'
  import { computed, nextTick, ref } from 'vue'

  const appStore = useAppStore()

  const collapsed = computed(() => appStore.getCollapsed)
  // 折叠侧边栏
  const onFold = () => {
    appStore.toggleCollapsed(true)
  }
  // 展开侧边栏
  const onExpand = () => {
    appStore.toggleCollapsed(false)
  }
  const isload = ref(false)
  // 刷新当前页
  const onRefresh = () => {
    appStore.changeRouterAlive(false)
    isload.value = true
    nextTick(() => {
      appStore.changeRouterAlive(true)
      setTimeout(() => {
        isload.value = false
      }, 500)
    })
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  .el-icon {
    cursor: pointer;
  }
  .tool {
    margin-left: auto;
    .refresh.isload {
      animation: load 0.5s linear infinite;
    }
  }
  @keyframes load {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
