<template>
  <div>
    <el-tabs
      v-model="currentRouteName"
      type="card"
      class="tabs"
      closable
      @tab-remove="removeTab"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { useTabBarStore } from '@/store'
  import { useRouter } from 'vue-router'
  import { computed, ref, watch } from 'vue'
  import type { TabsPaneContext } from 'element-plus'

  const tabBarStore = useTabBarStore()
  const tabList = computed(() => {
    return tabBarStore.getTabList
  })
  const router = useRouter()
  // 当前路由的name
  const currentRouteName = ref('')
  watch(
    // 监听当前路由
    () => router.currentRoute.value,
    (route) => {
      console.log(tabList.value, 'tabList')
      currentRouteName.value = route.name as string
      // 过滤重复标签
      if (
        !route.meta?.noAffix &&
        !tabList.value.some((tag) => tag.fullPath === route.fullPath)
      ) {
        // 更新标签栏 插入新的标签
        tabBarStore.updateTabList(route)
      }
    },
    {
      immediate: true
    }
  )

  // 路由跳转
  const handleClick = (tab: TabsPaneContext) => {
    const curTab = tabList.value.filter((item) => item.name === tab.paneName)[0]
    router.push({ ...curTab })
  }

  // 移除标签
  const removeTab = (targetName: string) => {
    if (currentRouteName.value === targetName) {
      const tabs = tabList.value
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            router.push({ ...nextTab })
          }
        }
      })
    }
    tabBarStore.deleteTab(targetName)
  }
</script>

<style lang="scss">
  .tabs {
    overflow: hidden;
    .el-tabs__header {
      margin: 0;
    }
  }
</style>
