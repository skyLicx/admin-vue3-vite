<template>
  <el-container class="layout">
    <el-aside width="200px">
      <div class="menu-wrapper">
        <Menu />
      </div>
    </el-aside>
    <el-container>
      <el-main class="layout-main">
        <PageLayout />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import Menu from '@/components/menu/index.vue'
  import PageLayout from './page-layout.vue'
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .menu-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    // :deep(.arco-menu) {
    //   ::-webkit-scrollbar {
    //     width: 12px;
    //     height: 4px;
    //   }

    //   ::-webkit-scrollbar-thumb {
    //     border: 4px solid transparent;
    //     background-clip: padding-box;
    //     border-radius: 7px;
    //     background-color: var(--color-text-4);
    //   }

    //   ::-webkit-scrollbar-thumb:hover {
    //     background-color: var(--color-text-3);
    //   }
    // }
  }
  .layout-main {
    min-height: 100vh;
    overflow-y: hidden;
    background-color: rgb(185, 240, 231);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
</style>
