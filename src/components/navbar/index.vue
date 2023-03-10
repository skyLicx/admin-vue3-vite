<template>
  <div class="navbar">
    <div class="collapsed">
      <el-icon v-if="collapsed" @click="onExpand"><Expand /></el-icon>
      <el-icon v-else @click="onFold"><Fold /></el-icon>
    </div>
    <div class="tool">
      <el-tooltip effect="dark" content="刷新" placement="bottom">
        <el-icon class="refresh" @click="onRefresh">
          <Refresh />
        </el-icon>
      </el-tooltip>
      <el-tooltip effect="dark" content="退出" placement="bottom">
        <img
          class="icon-logout"
          src="@/assets/images/logout.png"
          alt=""
          @click="logout"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import router from '@/router'
  import { useAppStore, useUserStore } from '@/store'
  import { computed, nextTick } from 'vue'

  const appStore = useAppStore()
  const userStore = useUserStore()

  const collapsed = computed(() => appStore.getCollapsed)
  // 折叠侧边栏
  const onFold = () => {
    appStore.toggleCollapsed(true)
  }
  // 展开侧边栏
  const onExpand = () => {
    appStore.toggleCollapsed(false)
  }
  // 刷新当前页
  const onRefresh = () => {
    appStore.changeRouterAlive(false)
    nextTick(() => {
      appStore.changeRouterAlive(true)
    })
  }
  // 退出
  const logout = async () => {
    await userStore.logout()
    router.push({ name: 'login' })
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
    .icon-logout {
      width: 16px;
      margin: 0 10px;
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
